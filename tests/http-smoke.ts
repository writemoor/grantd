// Run against a fresh local server: GRANTD_DATA_DIR=/tmp/grantd-smoke npm run dev
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const base = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000';
const decode = (s: string) => s.replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&#x27;',"'");
function actionForm(html: string, match: string) {
  const form = html.match(/<form\b[^>]*>[\s\S]*?<\/form>/g)?.find(f=>f.includes(match));
  assert.ok(form,`Form ${match} exists`);
  const data = new FormData();
  for (const input of form.match(/<input\b[^>]*>/g) || []) {
    const name = input.match(/name="([^"]*)"/)?.[1], value = input.match(/value="([^"]*)"/)?.[1] || '';
    if(name?.startsWith('$ACTION')) data.append(decode(name),decode(value));
  }
  assert.ok([...data.keys()].length,'Server action fields exist'); return data;
}
async function post(url: string,data:FormData) { const r=await fetch(url,{method:'POST',body:data}); assert.equal(r.status,200); return {url:r.url,html:(await r.text()).replace(/<!--.*?-->/g,'')}; }
let html = await (await fetch(base+'/opportunities')).text();
const create = actionForm(html,'Create opportunity'); create.set('title','HTTP smoke opportunity');create.set('funder','Smoke Foundation');create.set('due_date','2027-04-01');
let result = await post(base+'/opportunities',create); assert.match(result.url,/opportunities\/[a-f0-9-]+$/); const detailUrl=result.url;
const bytes=await readFile('fixtures/sample-guidelines.txt');
const upload=actionForm(result.html,'Upload &amp; create sample suggestions'); upload.set('document',new File([bytes],'sample-guidelines.txt',{type:'text/plain'}));
result=await post(detailUrl,upload);assert.match(result.html,/3 awaiting review/);assert.match(result.html,/synthetic example/);
const download=result.html.match(/href="(\/documents\/[^\"]+)"/)?.[1]; assert.ok(download); assert.equal(await (await fetch(base+download)).text(),bytes.toString());
const accept=actionForm(result.html,'Accept current requirement');accept.set('action','accept');result=await post(detailUrl,accept);assert.match(result.html,/1 human-confirmed/);
const edit=actionForm(result.html,'Save edits &amp; confirm');for(const [k,v] of Object.entries({action:'edit',text:'Human corrected budget request',category:'Organizational budget',department:'Programs',owner:'program-user',due_date:'2027-03-01',status:'Waiting',notes:'Reviewed in smoke test'})) edit.set(k,v);
result=await post(detailUrl,edit);assert.match(result.html,/Human corrected budget request/);assert.match(result.html,/Edited/);assert.match(result.html,/Sam Rivera/);assert.match(result.html,/Attach the current organizational budget/);
const reject=actionForm(result.html,'Accept current requirement');reject.set('action','reject');result=await post(detailUrl,reject);assert.match(result.html,/1 rejected/);
const missing=await fetch(base+'/documents/not-a-document');assert.equal(missing.status,404);
console.log('HTTP smoke passed: create, upload, three proposed items, download bytes, accept, edit/assign, reject, and missing document.');
