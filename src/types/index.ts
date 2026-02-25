export type ColumnId = 'todo' | 'in-progress' | 'review' | 'done';

export interface Checklist {
  cte: boolean;
  mdfe: boolean;
  ctrb: boolean;
  guia: boolean;
  adiantamento: boolean;
  redundancia: boolean;
  bloqueioSaldo: boolean;
  checklist: boolean;
  tagInativa: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: ColumnId;
  priority: 'low' | 'medium' | 'high';
  checklist: Checklist;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: ColumnId;
  title: string;
  color: string;
}

export const COLUMNS: Column[] = [
  { id: 'todo', title: 'A Fazer', color: '#6c757d' },
  { id: 'in-progress', title: 'Em Progresso', color: '#0d6efd' },
  { id: 'review', title: 'Em Revisão', color: '#fd7e14' },
  { id: 'done', title: 'Concluído', color: '#198754' },
];

export const CHECKLIST_LABELS: Record<keyof Checklist, string> = {
  cte: 'CTE',
  mdfe: 'MDFE',
  ctrb: 'CTRB',
  guia: 'GUIA',
  adiantamento: 'Adiantamento',
  redundancia: 'Redundância',
  bloqueioSaldo: 'Bloqueio de Saldo',
  checklist: 'Checklist',
  tagInativa: 'Tag Inativa',
};

export const DEFAULT_CHECKLIST: Checklist = {
  cte: false,
  mdfe: false,
  ctrb: false,
  guia: false,
  adiantamento: false,
  redundancia: false,
  bloqueioSaldo: false,
  checklist: false,
  tagInativa: false,
};
