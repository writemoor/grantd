export const categories = ['Narrative response','Financial data','Organizational data','Program data','Outcome metrics','Workforce / HR data','Policy or compliance information','Board / governance information','Existing document','Required attachment','Signature / approval','Certification','Program budget','Organizational budget','Audit or financial statement','Supporting material'] as const;
export const departments = ['Development','Finance','HR / People','Programs','Executive Leadership','Governance / Board Relations','Communications / Marketing','Operations','Legal / Compliance','IT / Security','Other'] as const;
export const statuses = ['Not started','In progress','Waiting','Already available','Ready','Complete','Not applicable'] as const;
export type ReviewState = 'Proposed' | 'Accepted' | 'Rejected' | 'Edited';
export function reviewState(action: string): ReviewState {
  if (action === 'accept') return 'Accepted';
  if (action === 'reject') return 'Rejected';
  if (action === 'edit') return 'Edited';
  throw new Error('Unknown review action.');
}
export function dateValue(value: string) {
  if (!value) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || new Date(value).toISOString().slice(0,10) !== value) throw new Error('Enter a valid date.');
  return value;
}
export function requiredText(value: string, max = 2000) {
  const result = value.trim();
  if (!result || result.length > max) throw new Error(`Enter text between 1 and ${max} characters.`);
  return result;
}
