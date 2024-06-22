import { create } from 'zustand';
import { isEmpty } from 'lodash';

import { apiGetTasks, apiGetTaskById, apiGetRecentTaskAcceptances } from 'src/services/company';

export const useTaskStore = create((set) => ({
  isLoading: false,
  tasks: [],
  taskAcceptances: [], // recent task acceptances ( last 72hrs ) ( accepted tasks )
  getAllTasks: async ({ status = 'created' }) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await apiGetTasks({ status });

    set((state) => ({
      ...state,
      tasks: isEmpty(response?.tasks) ? [] : response.tasks,
      isLoading: false,
    }));
  },
  getRecentAcceptances: async () => {
    set((state) => ({ ...state, isLoading: true }));
    const taskAcceptanceResponse = await apiGetRecentTaskAcceptances();

    set((state) => ({
      ...state,
      taskAcceptances: isEmpty(taskAcceptanceResponse?.results)
        ? []
        : taskAcceptanceResponse?.results,
      isLoading: false,
    }));
  },
  getTaskById: async ({ id }) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await apiGetTaskById({ id });

    const combinedTaskData = {
      ...(isEmpty(response.task) ? {} : { task: response.task }),
      ...(isEmpty(response.taskAcceptance) ? {} : { taskAcceptance: response.taskAcceptance }),
      ...(isEmpty(response.bid) ? {} : { bid: response.bid }),
    };

    if (response) set((state) => ({ ...state, selectedTask: combinedTaskData, isLoading: false }));
  },
  selectedTask: {},
  clearSelectedTask: () => set((state) => ({ ...state, selectedTask: {} })),
}));
