import CryptoJS from "crypto-js";

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, process.env.NEXT_PUBLIC_COOKIE_ENCRYPT_KEY.toString()).toString();
}

export const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.NEXT_PUBLIC_COOKIE_ENCRYPT_KEY.toString());
  return bytes.toString(CryptoJS.enc.Utf8);
}