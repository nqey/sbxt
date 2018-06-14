/* eslint-disable */
/**
 * 持久化到localstorage
 * @param key
 * @param data
 * @param expire - 过期时间，精确到秒
 * @returns {boolean}
 */
export const presist = (key, data, expire) => {
  try {
    if (expire) {
      expire = new Date().getTime() + expire * 1000;
    }
    window.localStorage.setItem(key, JSON.stringify(
      {
        expire,
        data,
      },
    ));
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * 从localstorage读取
 * @param key
 * @returns {*}
 */
export const read = (key) => {
  try {
    const dataString = window.localStorage.getItem(key);

    const cached = JSON.parse(dataString);
    if (cached == null || cached.expire < new Date().getTime()) {
      window.localStorage.removeItem(key);
      return null;
    }
    return cached.data;
  } catch (e) {
    return null;
  }
};

export const del = (key) => {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * 把数据设置到sessionStorage
 * @param key
 * @param data
 * @param expire 过期时间, 单位:秒
 * @returns {boolean}
 */
export const set = (key, data, expire) => {
  try {
    if (expire) {
      expire = new Date().getTime() + expire * 1000;
    }
    window.sessionStorage.setItem(key, JSON.stringify(
      {
        expire,
        data,
      },
    ));
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * 从sessionStorage读取
 * @param key
 * @returns {*}
 */
export const get = (key) => {
  try {
    const dataString = window.sessionStorage.getItem(key);

    const cached = JSON.parse(dataString);
    if (cached == null || cached.expire < new Date().getTime()) {
      window.sessionStorage.removeItem(key);
      return null;
    }
    return cached.data;
  } catch (e) {
    return null;
  }
};

/**
 * 从sessionStorage清除
 * @param key
 * @returns {boolean}
 */
export const clear = (key) => {
  try {
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};
