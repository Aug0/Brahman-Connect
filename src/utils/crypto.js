// utils/crypto.js
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'b-connect-ananatha'; // Use a strong secret key

// Encrypts the given text
export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

// Decrypts the given ciphertext
export const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
