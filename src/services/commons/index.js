import { apiInstance } from '../apiInstance';

export const apiPostSendEmail = async ({ emails, action, context }) => {
  try {
    const response = await apiInstance.post(`/admin/email/${action}`, { context, emails });
    return response.data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
