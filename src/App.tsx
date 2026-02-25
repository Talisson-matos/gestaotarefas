import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import { Plus, LayoutDashboard } from 'lucide-react';
import { Task, ColumnId, COLUMNS } from './types';
import { loadTasks, saveTasks } from './utils/storage';
import KanbanColumn from './components/KanbanColumn';
import TaskModal from './components/TaskModal';
import ConfirmModal from './components/ConfirmModal';
import './styles/globals.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultColumnId, setDefaultColumnId] = useState<ColumnId>('todo');
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const persistTasks = useCallback((updated: Task[]) => {
    setTasks(updated);
    saveTasks(updated);
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const task = tasks.find(t => t.id === draggableId);
    if (!task) return;

    const updated = tasks.filter(t => t.id !== draggableId);
    const newTask = { ...task, columnId: destination.droppableId as ColumnId, updatedAt: new Date().toISOString() };
    const colTasks = updated.filter(t => t.columnId === destination.droppableId);
    const otherTasks = updated.filter(t => t.columnId !== destination.droppableId);

    colTasks.splice(destination.index, 0, newTask);
    persistTasks([...otherTasks, ...colTasks]);
  };

  const handleAddTask = (columnId: ColumnId) => {
    setDefaultColumnId(columnId);
    setEditingTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleSaveTask = (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      persistTasks(tasks.map(t =>
        t.id === editingTask.id
          ? { ...t, ...data, updatedAt: new Date().toISOString() }
          : t
      ));
    } else {
      const now = new Date().toISOString();
      const newTask: Task = { id: uuidv4(), ...data, createdAt: now, updatedAt: now };
      persistTasks([...tasks, newTask]);
    }
    setShowModal(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setDeletingTaskId(taskId);
  };

  const confirmDelete = () => {
    if (!deletingTaskId) return;
    persistTasks(tasks.filter(t => t.id !== deletingTaskId));
    setDeletingTaskId(null);
  };

  const totalDone = tasks.filter(t => t.columnId === 'done').length;
  const totalTasks = tasks.length;

  return (
    <div className="app">
      <header className="header">
        <div className="header__logo">
          <div className="header__logo-icon">
            <LayoutDashboard size={17} color="#fff" />
          </div>
          Kanban Board
        </div>

        <div className="header__stats">
          {COLUMNS.map(col => {
            const count = tasks.filter(t => t.columnId === col.id).length;
            return (
              <div key={col.id} className="header__stat">
                <div className="header__stat-dot" style={{ background: col.color }} />
                <span>{col.title}: {count}</span>
              </div>
            );
          })}
        </div>

        <div className="header__actions">
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {totalDone}/{totalTasks} concluídas
          </span>
          <button className="btn btn--primary" onClick={() => handleAddTask('todo')}>
            <Plus size={14} />
            Nova Tarefa
          </button>
        </div>
      </header>

      <DragDropContext onDragEnd={handleDragEnd}>
        <main className="board-container">
          <div className="board">
            {COLUMNS.map(column => (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={tasks.filter(t => t.columnId === column.id)}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        </main>
      </DragDropContext>

      {showModal && (
        <TaskModal
          task={editingTask}
          defaultColumnId={defaultColumnId}
          onSave={handleSaveTask}
          onClose={() => { setShowModal(false); setEditingTask(null); }}
        />
      )}

      {deletingTaskId && (
        <ConfirmModal
          title="Deletar Tarefa"
          message="Tem certeza que deseja deletar esta tarefa? Esta ação não pode ser desfeita."
          onConfirm={confirmDelete}
          onClose={() => setDeletingTaskId(null)}
        />
      )}
    </div>
  );
}

export default App;
