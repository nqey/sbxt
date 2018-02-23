import { DOMAIN } from '@/config/env';

const setCookie = (cName, value, expire) => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + expire);
  document.cookie = `${cName} = ${escape(value)}; expires=${date.toGMTString()}; domain=${DOMAIN}; path=/`;
};

const getCookie = (cName) => {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(`${cName}=`);
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1;
      let cEnd = document.cookie.indexOf(';', cStart);
      if (cEnd === -1) {
        cEnd = document.cookie.length;
      }
      return unescape(document.cookie.substring(cStart, cEnd));
    }
  }
  return '';
};

const delCookie = (cName) => {
  setCookie(cName, '', -1);
};

export {
  setCookie,
  getCookie,
  delCookie,
};
