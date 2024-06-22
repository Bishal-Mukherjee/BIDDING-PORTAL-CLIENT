export const getAccessToken = (name = 'accessToken') => {
  const nameValue = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieStart = decodedCookie.indexOf(nameValue);
  if (cookieStart === -1) {
    return null;
  }
  return decodedCookie.substring(cookieStart + nameValue.length);
};

export const setAccessToken = (tokenName = 'accessToken', token) => {
  document.cookie = `${tokenName}=${token}; path=/;`;
};

export const clearCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
