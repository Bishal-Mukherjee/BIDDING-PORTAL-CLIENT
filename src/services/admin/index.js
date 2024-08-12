import { apiInstance } from '../apiInstance';

export const apiGetAllTasks = async ({ status = 'created' }) => {
  try {
    const response = await apiInstance.get(`/admin/getAllTask?status=${status}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiGetTaskById = async ({ id }) => {
  try {
    const response = await apiInstance.get(`/admin/getTask/${id}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiGetRecentTasks = async () => {
  try {
    const response = await apiInstance.get('/admin/getRecentTasks');
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiPostCreateIssue = async ({
  firstName,
  lastName,
  email,
  title,
  description,
  images,
  address,
  attachments,
}) => {
  try {
    const response = await apiInstance.post('/admin/createTask', {
      firstName,
      lastName,
      email,
      title,
      description,
      images,
      address,
      attachments,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiPutConfirmBid = async ({ taskId, bidId }) => {
  try {
    const response = await apiInstance.put(`/admin/updateSelectBid/${taskId}/${bidId}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiPutActivateTask = async ({ id, suggestedBidders }) => {
  try {
    const response = await apiInstance.post(`/admin/updateActivateTask/${id}`, {
      suggestedBidders,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiUpdateTask = async ({ id, title, description, images, attachments }) => {
  try {
    const response = await apiInstance.put(`/admin/updateTask/${id}`, {
      title,
      description,
      images,
      attachments,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiUpdateTaskStatus = async ({ id, status }) => {
  try {
    const response = await apiInstance.put(`/admin/updateTaskStatus/${id}`, {
      status,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiPostCreateClient = async ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
}) => {
  try {
    const response = await apiInstance.post('/admin/createClient', {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiGetAllInterestedClients = async () => {
  try {
    const response = await apiInstance.get('/admin/getInterestedClients');
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiDeleteUserRelatedTasks = async ({ email }) => {
  try {
    const response = await apiInstance.delete(`/admin/clearUserRelatedTasks/${email}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const apiDeleteCompanyRelatedDetails= async ({ email }) => {
  try {
	const response = await apiInstance.delete(`/admin/clearCompanyRelatedDetails/${email}`);
	return response.data;
  } catch (err) {
	console.log(err.message);
	return null;
  }
}

// export const apiPostCreateIssue = async ({ title, description, images }) => {
//   try {
//     const response = await apiInstance.post('/client/createTask', {
//       title,
//       description,
//       images,
//     });
//     return response.data;
//   } catch (err) {
//     console.log(err.message);
//     return null;
//   }
// };

// export const apiDeleteTask = async ({ id }) => {
//   try {
//     const response = await apiInstance.delete(`/client/deleteTask/${id}`);
//     return response.data;
//   } catch (err) {
//     console.log(err.message);
//     return null;
//   }
// };
