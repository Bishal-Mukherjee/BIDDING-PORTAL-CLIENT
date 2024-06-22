/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

import { getAccessToken } from 'src/utils';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/api`;

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-type': 'application/json' },
});

apiInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getAccessToken('accessToken');
    return config;
  },
  (error) => Promise.reject(error)
);
