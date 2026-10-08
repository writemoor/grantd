import { randomUUID } from 'node:crypto';
import { db } from './db';
import { dateValue, requiredText, categories, departments, statuses, reviewState } from '../domain/requirements';
import type { ExtractedRequirement } from '../services/parser';
export interface Opportunity { id: string; title: string; funder_name: string; due_date: string | null; status: string }
export interface Requirement { id: string; text: string; category: string; suggested_department: string; department: string; owner_id: string | null; due_date: string | null; status: string; review_state: string; source_document_id: string; source_page: number | null; source_section: string | null; source_excerpt: string; confidence: number | null; original_suggestion: string; notes: string; reviewed_at: string | null }
export interface SourceDocument { id: string; filename: string; parser: string; mime_type: string; storage_key: string }
export function opportunities() { return db().prepare('SELECT o.*,f.name funder_name FROM opportunity o JOIN funder f ON f.id=o.funder_id WHERE o.organization_id=? ORDER BY o.created_at DESC').all('demo-org') as unknown as Opportunity[]; }
export function opportunity(id: string) { return opportunities().find(o => o.id === id); }
export function users() { return db().prepare('SELECT id,name,department FROM users WHERE organization_id=?').all('demo-org') as unknown as {id:string;name:string;department:string}[]; }
export function requirements(id: string) { return db().prepare('SELECT * FROM application_requirement WHERE opportunity_id=? ORDER BY rowid').all(id) as unknown as Requirement[]; }
export function documents(id: string) { return db().prepare('SELECT * FROM source_document WHERE opportunity_id=? ORDER BY rowid').all(id) as unknown as SourceDocument[]; }
export function createOpportunity(title: string, funder: string, due: string) {
  const name = requiredText(title,200), funderName = requiredText(funder,200), dueDate = dateValue(due);
  const id = randomUUID(), funderId = randomUUID(), conn = db();
  conn.exec('BEGIN');
  try {
    conn.prepare('INSERT INTO funder VALUES (?,?,?)').run(funderId,'demo-org',funderName);
    conn.prepare('INSERT INTO opportunity(id,organization_id,funder_id,title,due_date) VALUES (?,?,?,?,?)').run(id,'demo-org',funderId,name,dueDate);
    conn.exec('COMMIT'); return id;
  } catch(e) { conn.exec('ROLLBACK'); throw e; }
}
export function saveExtraction(id: string, document: SourceDocument, extracted: ExtractedRequirement[]) {
  if (!opportunity(id)) throw new Error('Opportunity not found.');
  const conn = db(); conn.exec('BEGIN');
  try {
    conn.prepare('INSERT INTO source_document(id,opportunity_id,filename,mime_type,storage_key,parser) VALUES (?,?,?,?,?,?)').run(document.id,id,document.filename,document.mime_type,document.storage_key,document.parser);
    const insert = conn.prepare("INSERT INTO application_requirement(id,opportunity_id,source_document_id,text,category,suggested_department,department,status,review_state,source_page,source_section,source_excerpt,confidence,original_suggestion) VALUES (?,?,?,?,?,?,?,'Not started','Proposed',?,?,?,?,?)");
    for (const item of extracted) insert.run(randomUUID(),id,document.id,item.text,item.category,item.suggestedDepartment,item.suggestedDepartment,item.provenance.page,item.provenance.section,item.provenance.excerpt,item.provenance.confidence,JSON.stringify(item));
    conn.prepare("UPDATE opportunity SET status='application' WHERE id=? AND status='draft'").run(id);
    conn.exec('COMMIT');
  } catch(e) { conn.exec('ROLLBACK'); throw e; }
}
export function reviewRequirement(opportunityId: string, id: string, action: string, form: FormData) {
  const current = requirements(opportunityId).find(r => r.id === id);
  if (!current || !opportunity(opportunityId)) throw new Error('Requirement not found.');
  let next = {...current, review_state: reviewState(action)};
  if (action === 'edit') {
    const value = (key: string) => String(form.get(key) ?? '');
    const category = value('category'), department = value('department'), status = value('status'), owner = value('owner');
    if (!categories.some(c=>c===category) || !departments.some(d=>d===department) || !statuses.some(s=>s===status)) throw new Error('Invalid checklist selection.');
    if (owner && !users().some(u=>u.id===owner)) throw new Error('Owner must belong to this organization.');
    next = {...next,text:requiredText(value('text')),category,department,status,owner_id:owner || null,due_date:dateValue(value('due_date')),notes:value('notes').slice(0,4000)};
  }
  const conn = db(); conn.exec('BEGIN');
  try {
    conn.prepare('UPDATE application_requirement SET text=?,category=?,department=?,status=?,owner_id=?,due_date=?,notes=?,review_state=?,reviewed_by=?,reviewed_at=? WHERE id=?').run(next.text,next.category,next.department,next.status,next.owner_id,next.due_date,next.notes,next.review_state,'demo-user',new Date().toISOString(),id);
    conn.prepare('INSERT INTO review_event(id,requirement_id,user_id,before_json,after_json) VALUES (?,?,?,?,?)').run(randomUUID(),id,'demo-user',JSON.stringify(current),JSON.stringify(next));
    conn.exec('COMMIT');
  } catch(e) { conn.exec('ROLLBACK'); throw e; }
}
