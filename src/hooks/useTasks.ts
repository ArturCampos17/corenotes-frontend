import { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api';

interface Task {
  id: number;
  title: string;
  description?: string;
  stats: "pending" | "completed" | "canceled";
  is_favorite: boolean;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const data = await fetchTasks();
        console.log('Fetched tasks:', data);
        if (!Array.isArray(data)) {
          throw new Error('Dados recebidos não são uma lista válida de tarefas.');
        }
        setTasks(data);
      } catch (error) {

      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = async (taskData: Omit<Task, 'id'>) => {
    const newTask = await createTask(taskData);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };


  const updateTaskStats = async (id: number, updates: Partial<Task>) => {
    setLoading(true);
    try {
      console.log(`Atualizando tarefa com ID ${id}:`, updates);
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        )
      );
  
      await updateTask(id, updates);
  
      console.log(`Status atualizado para tarefa com ID ${id}.`);
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (id: number) => {
    await deleteTask(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const canceledTask = async (id: number) => {
    await updateTaskStats(id, { stats: 'canceled' })
  }

  const finalizedTask = async (id: number) => {
    await updateTaskStats(id, { stats: 'completed' })
  }

  const reopenTask = async (id: number) => {
    await updateTaskStats(id, { stats: 'pending' })
  }

  return {
    tasks,
    loading,
    addTask,
    finalizedTask,
    updateTaskStats,
    canceledTask,
    reopenTask,
    removeTask,
  };
};