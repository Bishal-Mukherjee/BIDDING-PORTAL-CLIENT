import { create } from 'zustand';

export const useBidsStore = create((set) => ({
  isLoading: false,
  bids: [],
  selectedBid: {},
}));
