import type { categories, departments } from '../domain/requirements';
export interface ExtractedRequirement {
  text: string; category: typeof categories[number]; suggestedDepartment: typeof departments[number];
  provenance: { page: number | null; section: string | null; excerpt: string; confidence: number | null };
}
export interface DocumentParser {
  readonly identity: string;
  extract(document: { bytes: Uint8Array; filename: string; mimeType: string }): Promise<ExtractedRequirement[]>;
}
export const parser: DocumentParser = {
  identity: 'mock-v1 (synthetic examples; upload not analyzed)',
  async extract() {
    return [
      { text: 'Provide the current organizational budget and prior-year actuals.', category: 'Organizational budget', suggestedDepartment: 'Finance', provenance: { page: null, section: 'Sample: Financial attachments', excerpt: 'Attach the current organizational budget and prior-year actuals.', confidence: null } },
      { text: 'Describe the proposed program and intended participant outcomes.', category: 'Narrative response', suggestedDepartment: 'Programs', provenance: { page: null, section: 'Sample: Program narrative', excerpt: 'Describe your program, the participants it will serve, and the outcomes you will measure.', confidence: null } },
      { text: 'Include a current board roster with affiliations.', category: 'Board / governance information', suggestedDepartment: 'Governance / Board Relations', provenance: { page: null, section: 'Sample: Governance', excerpt: 'Provide a current board roster including each member’s affiliation.', confidence: null } },
    ];
  },
};
