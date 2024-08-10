import { apiInstance } from '../apiInstance';

export const apiGetTasks = async ({ status = 'created' }) => {
  try {
    const response = await apiInstance.get(`/company/getTasks?status=${status}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiGetTaskById = async ({ id }) => {
  try {
    const response = await apiInstance.get(`/company/getTask/${id}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiUpdateAcceptOrRejectTask = async ({ taskId, status }) => {
  try {
    const response = await apiInstance.put(`/company/acceptOrRejectTask/${taskId}`, {
      status,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiPostCreateBid = async ({
  taskId,
  amount,
  attachment,
  estimatedCompletionDays,
  quality,
  logo,
}) => {
  try {
    const response = await apiInstance.post(`/company/createBid/${taskId}`, {
      amount,
      attachment,
      estimatedCompletionDays,
      quality,
      logo,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiGetRecentTaskAcceptances = async () => {
  try {
    const response = await apiInstance.get(`/company/getRecentTaskAcceptances`);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiUpdateTaskStatus = async ({ id, status }) => {
  try {
    const response = await apiInstance.put(`/company/updateTaskStatus/${id}`, {
      status,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
