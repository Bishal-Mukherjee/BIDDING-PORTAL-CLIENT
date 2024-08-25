import { create } from 'zustand';
import { isEmpty } from 'lodash';

import { apiGetAllInterestedClients } from 'src/services/admin';
import { apiGetUsersByDesignation } from 'src/firebase/firestore/admin';

export const useAdminManagementStore = create((set) => ({
  isLoading: false,
  clients: [],
  companies: [],
  getAllClients: async () => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await apiGetUsersByDesignation('CLIENT');
      set((state) => ({ ...state, clients: isEmpty(response) ? [] : response, isLoading: false }));
    } catch (err) {
      set((state) => ({ ...state, clients: [], isLoading: false }));
    }
  },
  getAllInterestedClients: async () => {
    set((state) => ({ ...state, clients: [], isLoading: true }));
    const response = await apiGetAllInterestedClients();
    set((state) => ({ ...state, clients: isEmpty(response) ? [] : response, isLoading: false }));
  },
  getAllCompanies: async () => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await apiGetUsersByDesignation('COMPANY');
      set((state) => ({
        ...state,
        companies: isEmpty(response) ? [] : response,
        isLoading: false,
      }));
    } catch (err) {
      set((state) => ({ ...state, companies: [], isLoading: false }));
    }
  },
}));
