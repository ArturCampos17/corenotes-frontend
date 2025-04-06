import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import FilterBar from "./components/FilterBar/FilterBar";
import { useTasks } from "./hooks/useTasks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global.scss";

const App: React.FC = () => {
  const {
    tasks,
    loading,
    addTask,
    updateTaskStats,
    removeTask,
    finalizedTask,
    canceledTask,
  } = useTasks();

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  if (loading) return <div className="loading">Carregando...</div>;

  const handleAddTask = (taskData: any) => {
    addTask(taskData);
    toast.success("Tarefa adicionada com sucesso!");
  };

  const handleUpdateTask = (id: number, updates: any) => {
    updateTaskStats(id, updates);
    toast.info("Tarefa atualizada!");
  };

  const handleRemoveTask = (id: number) => {
    removeTask(id);
    toast.error("Tarefa removida!");
  };

  const handleFinalizedTask = (id: number) => {
    finalizedTask(id);
    toast.success("Tarefa finalizada!");
  };

  const handleCanceledTask = (id: number) => {
    canceledTask(id);
    toast.success("Tarefa cancelada!");
  };

  const applyFilter = (filter: string) => {
    let filtered = tasks;

    switch (filter) {
      case "favorite":
        filtered = tasks.filter((task) => task.is_favorite);
        break;
      case "pending":
        filtered = tasks.filter((task) => task.stats === "pending");
        break;
      case "completed":
        filtered = tasks.filter((task) => task.stats === "completed");
        break;
      case "canceled":
        filtered = tasks.filter((task) => task.stats === "canceled");
        break;
      case "all":
        filtered = tasks;
        break;
      default:
        filtered = tasks;
    }

    console.log("Tarefas filtradas:", filtered);
    setFilteredTasks(filtered);
  };

  const applySearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerCaseQuery) ||
        (task.description &&
          task.description.toLowerCase().includes(lowerCaseQuery))
    );

    setFilteredTasks(filtered);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-container">
          <h1 className="title">Core Notes</h1>
          <FilterBar
            onFilterChange={applyFilter}
            onSearchChange={applySearch}
          />
        </div>
      </header>
      <main className="app-main">
        <div className="container">
          <TaskForm onAdd={handleAddTask} />
          <TaskList
            tasks={filteredTasks}
            onUpdate={handleUpdateTask}
            onCanceled={handleCanceledTask}
            onDelete={handleRemoveTask}
            onFinalized={handleFinalizedTask}
          />
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default App;