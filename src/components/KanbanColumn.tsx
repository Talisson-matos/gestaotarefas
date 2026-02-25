import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Plus, ClipboardList } from 'lucide-react';
import { Task, Column } from '../types';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onAddTask: (columnId: Column['id']) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks, onAddTask, onEditTask, onDeleteTask }) => {
  return (
    <div className="column">
      <div className="column__header">
        <div className="column__title-group">
          <div className="column__indicator" style={{ background: column.color }} />
          <span className="column__title">{column.title}</span>
        </div>
        <span className="column__count">{tasks.length}</span>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={`column__body ${snapshot.isDraggingOver ? 'column__body--dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="empty-state">
                <ClipboardList size={28} className="empty-state__icon" />
                <span className="empty-state__text">Sem tarefas ainda</span>
              </div>
            )}
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="column__add">
        <button className="btn column__add-btn" onClick={() => onAddTask(column.id)}>
          <Plus size={13} />
          Adicionar tarefa
        </button>
      </div>
    </div>
  );
};

export default KanbanColumn;
