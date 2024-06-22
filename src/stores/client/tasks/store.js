/* eslint-disable import/no-extraneous-dependencies */

import { create } from 'zustand';
import { isEmpty } from 'lodash';

import { apiGetAllTasks, apiGetTaskById } from 'src/services/client';

export const useTaskStore = create((set) => ({
  isLoading: false,
  tasks: [],
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
    if (response) set((state) => ({ ...state, selectedTask: response, isLoading: false }));
  },
  selectedTask: {},
  clearSelectedTask: () => set((state) => ({ ...state, selectedTask: {} })),
}));
