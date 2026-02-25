import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Pencil, Trash2 } from 'lucide-react';
import  { type Task, type Checklist, CHECKLIST_LABELS } from '../types';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const getChecklistProgress = (checklist: Checklist) => {
  const keys = Object.keys(checklist) as (keyof Checklist)[];
  const done = keys.filter(k => checklist[k]).length;
  return { done, total: keys.length };
};

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit, onDelete }) => {
  const { done, total } = getChecklistProgress(task.checklist);
  const percent = Math.round((done / total) * 100);
  const checkedKeys = (Object.keys(task.checklist) as (keyof Checklist)[]).filter(k => task.checklist[k]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-card ${snapshot.isDragging ? 'task-card--dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-card__header">
            <span className="task-card__title">{task.title}</span>
            <div className="task-card__actions">
              <button
                className="task-card__action"
                onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                title="Editar"
              >
                <Pencil size={13} />
              </button>
              <button
                className="task-card__action task-card__action--delete"
                onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                title="Deletar"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          {task.description && (
            <p className="task-card__description">{task.description}</p>
          )}

          {checkedKeys.length > 0 && (
            <div className="task-card__checklist-badges">
              {checkedKeys.map(key => (
                <span key={key} className="task-card__badge task-card__badge--done">
                  {CHECKLIST_LABELS[key]}
                </span>
              ))}
            </div>
          )}

          <div className="task-card__footer" style={{ marginTop: '12px' }}>
            <span className={`task-card__priority task-card__priority--${task.priority}`}>
              {task.priority === 'low' ? 'Baixa' : task.priority === 'medium' ? 'Média' : 'Alta'}
            </span>
            <div className="task-card__checklist-progress">
              <div className="task-card__progress-bar">
                <div className="task-card__progress-fill" style={{ width: `${percent}%` }} />
              </div>
              <span>{done}/{total}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
