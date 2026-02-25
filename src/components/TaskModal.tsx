import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import  {  Task,  ColumnId, COLUMNS, Checklist, CHECKLIST_LABELS, DEFAULT_CHECKLIST } from '../types';

interface TaskModalProps {
  task?: Task | null;
  defaultColumnId?: ColumnId;
  onSave: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, defaultColumnId = 'todo', onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [columnId, setColumnId] = useState<ColumnId>(defaultColumnId);
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [checklist, setChecklist] = useState<Checklist>({ ...DEFAULT_CHECKLIST });

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setColumnId(task.columnId);
      setPriority(task.priority);
      setChecklist({ ...task.checklist });
    }
  }, [task]);

  const toggleChecklistItem = (key: keyof Checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title: title.trim(), description: description.trim(), columnId, priority, checklist });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">{task ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
          <button className="btn btn--ghost btn--icon" onClick={onClose}><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal__body">
            <div className="form-group">
              <label className="form-label">Título *</label>
              <input
                className="form-input"
                type="text"
                placeholder="Descreva a tarefa..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Descrição</label>
              <textarea
                className="form-textarea"
                placeholder="Detalhes adicionais..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Coluna</label>
                <select className="form-select" value={columnId} onChange={e => setColumnId(e.target.value as ColumnId)}>
                  {COLUMNS.map(col => (
                    <option key={col.id} value={col.id}>{col.title}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Prioridade</label>
                <select className="form-select" value={priority} onChange={e => setPriority(e.target.value as Task['priority'])}>
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Checklist de Documentos</label>
              <div className="checklist-grid">
                {(Object.keys(CHECKLIST_LABELS) as (keyof Checklist)[]).map(key => (
                  <div
                    key={key}
                    className={`checklist-item ${checklist[key] ? 'checklist-item--checked' : ''}`}
                    onClick={() => toggleChecklistItem(key)}
                  >
                    <div className="checklist-item__checkbox">
                      {checklist[key] && <Check size={10} color="#fff" strokeWidth={3} />}
                    </div>
                    <span className="checklist-item__label">{CHECKLIST_LABELS[key]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="modal__footer">
            <button type="button" className="btn btn--ghost" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn--primary">
              {task ? 'Salvar Alterações' : 'Criar Tarefa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
