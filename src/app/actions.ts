'use server';
import { randomUUID } from 'node:crypto';
import { writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createOpportunity, opportunity, saveExtraction, reviewRequirement } from '../persistence/repository';
import { dataDir, db } from '../persistence/db';
import { parser } from '../services/parser';
const field = (f: FormData,k: string) => String(f.get(k) || '');
function errorPath(base: string, error: unknown) { return `${base}?error=${encodeURIComponent(error instanceof Error ? error.message : 'Unable to save. Please retry.')}`; }
export async function create(form: FormData) {
  let id: string;
  try { id = createOpportunity(field(form,'title'),field(form,'funder'),field(form,'due_date')); }
  catch(e) { redirect(errorPath('/opportunities',e)); }
  revalidatePath('/'); redirect(`/opportunities/${id}`);
}
export async function upload(id: string, form: FormData) {
  const base = `/opportunities/${id}`;
  try {
    if (!opportunity(id)) throw new Error('Opportunity not found.');
    const file = form.get('document');
    if (!(file instanceof File) || !file.size || file.size > 10 * 1024 * 1024) throw new Error('Choose a nonempty file up to 10 MB.');
    const extension = path.extname(file.name).toLowerCase();
    const mimeTypes: Record<string,string> = {'.pdf':'application/pdf','.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document','.txt':'text/plain'};
    if (!mimeTypes[extension]) throw new Error('Use a PDF, DOCX, or text document.');
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (extension === '.pdf' && new TextDecoder().decode(bytes.slice(0,5)) !== '%PDF-') throw new Error('Invalid PDF file.');
    if (extension === '.docx' && !(bytes[0]===80 && bytes[1]===75)) throw new Error('Invalid DOCX file.');
    const items = await parser.extract({bytes,filename:file.name,mimeType:mimeTypes[extension]});
    const documentId = randomUUID(); db();
    const destination = path.join(dataDir,'uploads',documentId);
    await writeFile(destination,bytes,{flag:'wx'});
    try { saveExtraction(id,{id:documentId,filename:path.basename(file.name).slice(0,200),mime_type:mimeTypes[extension],storage_key:documentId,parser:parser.identity},items); }
    catch(e) { await unlink(destination); throw e; }
  } catch(e) { redirect(errorPath(base,e)); }
  revalidatePath(base); revalidatePath('/'); redirect(base);
}
export async function review(opportunityId: string, id: string, form: FormData) {
  const base = `/opportunities/${opportunityId}`;
  try { reviewRequirement(opportunityId,id,field(form,'action'),form); }
  catch(e) { redirect(errorPath(base,e)); }
  revalidatePath(base); revalidatePath('/'); redirect(base);
}
