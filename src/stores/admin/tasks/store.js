/* eslint-disable import/no-extraneous-dependencies */

import { create } from 'zustand';
import { isEmpty } from 'lodash';

import { apiGetAllTasks, apiGetTaskById, apiGetRecentTasks } from 'src/services/admin';

export const useTaskStore = create((set) => ({
  isLoading: false,
  tasks: [],
  recentTasks: [],
  getAllTasks: async ({ status = 'created' }) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await apiGetAllTasks({ status });
    set((state) => ({
      ...state,
      tasks: isEmpty(response?.tasks) ? [] : response.tasks,
      isLoading: false,
    }));
  },
  getTaskById: async ({ id }) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await apiGetTaskById({ id });
    if (response)
      set((state) => ({
        ...state,
        selectedTask: response.task,
        selectedTaskBids: response.bids,
        isLoading: false,
      }));
  },
  getRecentTasks: async () => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await apiGetRecentTasks();
    set((state) => ({
      ...state,
      recentTasks: isEmpty(response?.tasks) ? [] : response.tasks,
      isLoading: false,
    }));
  },
  selectedTask: {},
  selectedTaskBids: [],
  clearSelectedTask: () => set((state) => ({ ...state, selectedTask: {} })),
}));
