// utils/storage.js
import { encrypt, decrypt } from './crypto';

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const storeToken = (token) => {
  const encryptedToken = encrypt(token);
  localStorage.setItem(TOKEN_KEY, encryptedToken);
};

export const retrieveToken = () => {
  const encryptedToken = localStorage.getItem(TOKEN_KEY);
  if (encryptedToken) {
    return decrypt(encryptedToken);
  }
  return null;
};

export const storeRefreshToken = (refreshToken) => {
  const encryptedToken = encrypt(refreshToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, encryptedToken);
};

export const retrieveRefreshToken = () => {
  const encryptedToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (encryptedToken) {
    return decrypt(encryptedToken);
  }
  return null;
};

export const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
