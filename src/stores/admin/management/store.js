import { create } from 'zustand';

import { apiGetUsersByDesignation } from 'src/firebase/firestore/admin';

export const useAdminManagementStore = create((set) => ({
  isLoading: false,
  clients: [],
  companies: [],
  getAllClients: async () => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await apiGetUsersByDesignation('CLIENT');
    set((state) => ({ ...state, clients: response, isLoading: false }));
  },
  getAllCompanies: async () => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await apiGetUsersByDesignation('COMPANY');
    set((state) => ({ ...state, companies: response, isLoading: false }));
  },
}));
