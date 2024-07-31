import Cookies from 'universal-cookie';
// import CryptoJS from 'crypto-js';

const cookies = new Cookies();
// const secretKey = process.env.REACT_APP_SECRET_KEY;
// eslint-disable-next-line no-extend-native
Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

// const encryptData = (data) => {
//   return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
// };

// const decryptData = (encryptedData) => {
//   const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
//   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// };

const setCookie = (key, value, minutes) => {
  var dt = new Date();
  var expireOn = new Date();
  expireOn.setMinutes(dt.getMinutes() + minutes);
  //const encryptedData = encryptData(value);
  cookies.set(key, value, { path: '/', expires: expireOn });
};

const removeCookie = (name) => {
  cookies.set(name, '', { path: '/', expires: new Date(Date.now()) });
};

const getCookie = (key) => {
  const cookieValue = cookies.get(key);
  let decryptCookieData = {};
  if (cookieValue) {
    decryptCookieData =cookieValue;
  }
  return decryptCookieData;
};

const getAllCookies = () => {
  return cookies.getAll();
};

export { setCookie, getCookie, removeCookie, getAllCookies };
