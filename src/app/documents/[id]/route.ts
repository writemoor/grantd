import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { db, dataDir } from '../../../persistence/db';
export const runtime = 'nodejs';
export async function GET(_: Request, {params}: {params:Promise<{id:string}>}) {
  const {id} = await params;
  const document = db().prepare('SELECT d.* FROM source_document d JOIN opportunity o ON o.id=d.opportunity_id WHERE d.id=? AND o.organization_id=?').get(id,'demo-org') as {storage_key:string;filename:string;mime_type:string} | undefined;
  if (!document) return new Response('Not found',{status:404});
  try {
    const bytes = await readFile(path.join(dataDir,'uploads',document.storage_key));
    return new Response(bytes,{headers:{'Content-Type':document.mime_type,'Content-Disposition':`attachment; filename*=UTF-8''${encodeURIComponent(document.filename)}`,'X-Content-Type-Options':'nosniff','Cache-Control':'private, no-store'}});
  } catch { return new Response('Stored document unavailable',{status:404}); }
}
