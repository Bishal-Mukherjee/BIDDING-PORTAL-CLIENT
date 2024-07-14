import { apiInstance } from '../apiInstance';

export const apiGetAllTasks = async ({ status = 'created' }) => {
  try {
    const response = await apiInstance.get(`/client/getAllTask?status=${status}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiGetTaskById = async ({ id }) => {
  try {
    const response = await apiInstance.get(`/client/getTask/${id}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiPostCreateIssue = async ({ title, description, images, address }) => {
  try {
    const response = await apiInstance.post('/client/createTask', {
      title,
      description,
      images,
      address,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiDeleteTask = async ({ id }) => {
  try {
    const response = await apiInstance.delete(`/client/deleteTask/${id}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiUpdateTask = async ({ id, title, description, images }) => {
  try {
    const response = await apiInstance.put(`/client/updateTask/${id}`, {
      title,
      description,
      images,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiPostInterestedClient = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  message,
  postalCode,
}) => {
  try {
    const response = await apiInstance.post(`/client/postInterestedClient`, {
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
      postalCode,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
