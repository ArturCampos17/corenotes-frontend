import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import styles from "./TaskForm.module.scss";

interface TaskData {
  title: string;
  description: string;
  is_favorite: boolean;
}

interface TaskFormProps {
  onAdd: (taskData: TaskData) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("O título é obrigatório!");
      return;
    }

    onAdd({ title, description, is_favorite : isFavorite});

    setTitle("");
    setDescription("");
    setIsFavorite(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["task-form"]}>
      <div className={styles.header}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <button
          type="button"
          onClick={() => setIsFavorite(!isFavorite)}
          className={styles.favoriteButton}
        >
          <FaRegStar color={isFavorite ? "gold" : "gray"}  />
        </button>
      </div>

      <textarea
        placeholder="Criar nota..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
      />

      <div className={styles.actions}>
        <button type="submit" className={styles.saveButton}>
          Salvar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
