export interface Task {
    id: number;
    title: string;
    description?: string;
    is_favorite: boolean; 
    color: string; 
    stats: "pending" | "completed" | "canceled"; 
  }