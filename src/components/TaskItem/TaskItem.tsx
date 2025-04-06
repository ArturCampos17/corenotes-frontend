import React, { useState, useEffect } from "react";
import { FaRegStar, FaPen, FaTrash } from "react-icons/fa";
import { PiPaintBucketBold } from "react-icons/pi";
import styles from "./TaskItem.module.scss";
import { BsCheck2Circle } from "react-icons/bs";
import { TiCancel } from "react-icons/ti";
import { GoIssueReopened } from "react-icons/go";

interface Task {
  id: number;
  title: string;
  description?: string;
  is_favorite: boolean;
  color: string;
  stats: string;
}

interface TaskItemProps {
  task: Task;
  onToggleFavorite: (id: number) => void;
  onUpdate: (id: number, updates: Partial<Task>) => void;
  onFinalized: (id: number) => void;
  onDelete: (id: number) => void;
  onCanceled: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleFavorite,
  onDelete,
  onUpdate,
  onFinalized,
  onCanceled,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  useEffect(() => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
  }, [task]);

  const handleSave = () => {
    onUpdate(task.id, { title: editedTitle, description: editedDescription });
    setIsEditing(false);
  };

  const handleCloseColorPicker = () => {
    setIsColorPickerOpen(false);
  };

  const handleOpenColorPicker = () => {
    setIsColorPickerOpen(true);
  };

  const handleSelectColor = (color: string) => {
    onUpdate(task.id, { color });
    handleCloseColorPicker();
  };

  return (
    <div className={styles.taskCard} style={{ backgroundColor: task.color }}>
      <div className={styles.header}>
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className={styles.editInput}
          />
        ) : (
          <h3 className={styles.title}>{task.title}</h3>
        )}
        <button title="Adicionar aos Favoritos"
            className={`${styles.starButton} ${
              task.stats === "completed" || task.stats === "canceled" ? styles.disabled : ""
            }`}
            onClick={
              task.stats === "pending"
                ? () => onToggleFavorite(task.id)
                : undefined
            }
          >
          <FaRegStar color={task.is_favorite ? "gold" : "gray"} />
        </button>
      </div>

      <div className={styles.body}>
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className={styles.editTextarea}
          />
        ) : (
          <p>{task.description || "Sem descrição"}</p>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.leftActions}>
          {isEditing ? (
            <button onClick={handleSave} className={styles.saveButton}>
              Salvar
            </button>
          ) : (
            <>
              <span
                title="Editar tarefa"
                className={`${styles.editIcon} ${
                  task.stats === "completed" || task.stats === "canceled"
                    ? styles.disabled
                    : ""
                }`}
                onClick={
                  task.stats === "pending"
                    ? () => setIsEditing(true)
                    : undefined
                }
              >
                <FaPen />
              </span>
              <span
                title="Colorir tarefa"
                className={`${styles.editIcon} ${
                  task.stats === "completed" || task.stats === "canceled"
                    ? styles.disabled
                    : ""
                }`}
                onClick={
                  task.stats === "pending" ? handleOpenColorPicker : undefined
                }
              >
                <PiPaintBucketBold />
              </span>
            </>
          )}
        </div>

        <div className={styles.rightActions}>
          {task.stats === "completed" || task.stats === "canceled" ? (
            <button
              title="Reabrir tarefa"
              onClick={() => onUpdate(task.id, { stats: "pending" })}
              className={styles.reopenButton}
            >
              <GoIssueReopened />
            </button>
          ) : (
            <>
              <button
                title="Finalizar tarefa"
                onClick={() => onFinalized(task.id)}
                className={styles.finalizedButton}
              >
                <BsCheck2Circle />
              </button>

              <button
                title="Cancelar tarefa"
                onClick={() => onCanceled(task.id)}
                className={styles.canceledButton}
              >
                <TiCancel />
              </button>
            </>
          )}

          <button
            title="Excluir tarefa"
            onClick={() => onDelete(task.id)}
            className={styles.deleteButton}
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {isColorPickerOpen && (
        <div className={styles.colorPicker}>
          <div className={styles.colors}>
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className={styles.color}
                style={{ backgroundColor: colors[index] }}
                onClick={() => handleSelectColor(colors[index])}
              />
            ))}
            <div
              className={styles.closeButton}
              onClick={handleCloseColorPicker}
            >
              ×
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const colors = [
  "#BAE2FF",
  "#B9FFDD",
  "#FFE8AC",
  "#FFCAB9",
  "#F99494",
  "#9DD6FF",
  "#ECA1FF",
  "#DAFF8B",
  "#FFA285",
  "#CDCDCD",
];

export default TaskItem;
