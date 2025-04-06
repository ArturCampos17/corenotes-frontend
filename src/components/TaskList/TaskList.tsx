import React from 'react';
import TaskItem from '../TaskItem/TaskItem';

interface TaskListProps {
  tasks: any[];
  onUpdate: (id: number, updates: any) => void;
  onDelete: (id: number) => void;
  onFinalized: (id: number) => void;
  onCanceled: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete, onFinalized, onCanceled }) => {

  const favoriteTasks = tasks.filter((task) => task.is_favorite && task.stats === "pending"); 
  const otherTasks = tasks.filter((task) => !task.is_favorite && task.stats === "pending"); 
  const favoriteFinalizedTasks = tasks.filter((task) => task.is_favorite && task.stats === "completed"); 
  const otherFinalizedTasks = tasks.filter((task) => !task.is_favorite && task.stats === "completed"); 
  const canceledTasks = tasks.filter((task) => task.stats === "canceled"); 

  return (
    <div className="task-list">
      {favoriteTasks.length > 0 && (
        <div>
          <h2>Favoritas</h2>
          <div className="task-grid">
            {favoriteTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleFavorite={(id) => onUpdate(id, { is_favorite: !task.is_favorite })}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onFinalized={onFinalized}
                onCanceled={onCanceled}
              />
            ))}
          </div>
        </div>
      )}
  
      {otherTasks.length > 0 && (
        <div>
          <h2>Outras</h2>
          <div className="task-grid">
            {otherTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleFavorite={(id) => onUpdate(id, { is_favorite: !task.is_favorite })}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onFinalized={onFinalized}
                onCanceled={onCanceled}
              />
            ))}
          </div>
        </div>
      )}
  
      {(favoriteFinalizedTasks.length > 0 || otherFinalizedTasks.length > 0) && (
        <div>
          <h2>Finalizadas</h2>
          <div className="task-grid">
            {favoriteFinalizedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleFavorite={(id) => onUpdate(id, { is_favorite: !task.is_favorite })}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onFinalized={onFinalized}
                onCanceled={onCanceled}
              />
            ))}
            {otherFinalizedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleFavorite={(id) => onUpdate(id, { is_favorite: !task.is_favorite })}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onFinalized={onFinalized}
                onCanceled={onCanceled}
              />
            ))}
          </div>
        </div>
      )}
  
      {canceledTasks.length > 0 && (
        <div>
          <h2>Canceladas</h2>
          <div className="task-grid">
            {canceledTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleFavorite={(id) => onUpdate(id, { is_favorite: !task.is_favorite })}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onFinalized={onFinalized}
                onCanceled={onCanceled}
              />
            ))}
          </div>
        </div>
      )}

      {favoriteTasks.length === 0 &&
       otherTasks.length === 0 &&
       favoriteFinalizedTasks.length === 0 &&
       otherFinalizedTasks.length === 0 &&
       canceledTasks.length === 0 && (
         <p>Nenhuma tarefa encontrada.</p>
       )}
    </div>
  );
};

export default TaskList;