import axios from "axios";
import { Task } from "../types/task";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
});

export const getTasks = async (): Promise<Task[]> => {
  const res = await API.get("/tasks");
  return res.data;
};

export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const res = await API.post("/tasks", task);
  return res.data;
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
  const res = await API.patch(`/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await API.delete(`/tasks/${id}`);
};