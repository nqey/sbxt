import { IMAGE_SERVER_URL } from '@/config/env';

/**
 * @param data
 * @returns {array|object|null|undefined|function|error|regexp|number|string}
 */
export const type = (data) => {
  const t = typeof data;

  switch (typeof data) {
    case 'object':
      if (data === null) {
        return 'null';
      } else if (data instanceof Array) {
        return 'array';
      } else if (data instanceof RegExp) {
        return 'regexp';
      } else if (data instanceof Error) {
        return 'error';
      }
      return t;
    default:
      return t;
  }
};

/**
 * 示例：
 * {a:1,b:[1,2,3]}  => a=1&b=1&b=2&b=3
 * {a:{b:1,c:[1,2]}} => a.b=1&a.c=1&a.c=2
 * {a:{b:1,c:[{d:1},{d:2},{e:3}]}} => a.b=1&a.c.d=1&a.c.d=2&a.c.e=3
 * {a:{b:{d:{e:[{f:{g:1}},{f:{g:2}}]}},c:[1,2]}} => a.b.d.e.f.g=1&a.b.d.e.f.g=2&a.c=1&a.c=2
 * toQueryString([1,2,3,4], 'c') => c=1&c=2&c=3&c=4
 *
 * 将忽略值是null|undefined|function|error|regexp类型的数据
 * @param data
 * @param prefix 参数名前缀
 * @returns {*}
 */
export const toQueryString = (data, prefix) => {
  prefix = prefix || '';
  const queryString = [];
  switch (type(data)) {
    // []类型
    case 'array':
      if (prefix === '') {
        return '';
      }
      data.forEach((s) => {
        const d = toQueryString(s, prefix);
        if (d !== null && d !== undefined) {
          queryString.push(d);
        }
      });
      break;
    // {}类型
    case 'object':
      Object.entries(data)
        .forEach((s) => {
          let key = s[0];
          const value = s[1];
          if (prefix !== '') {
            key = `${prefix}.${key}`;
          }
          const d = toQueryString(value, key);
          if (d !== null && d !== undefined) {
            queryString.push(d);
          }
        });
      break;
    case 'string':
    case 'number':
      if (prefix === '') {
        return '';
      }
      return `${prefix}=${data}`;
    // 其他类型忽略
    default:
      return '';
  }
  return queryString.join('&');
};

/**
 * 删除对象-属性值是null|undefined|function|error|regexp类型的数据
 * 只删除第一层数据，不递归删除；
 *
 * @param params {array|object|string}
 * @returns {Array|Object|String} 返回一个新的和params类型一致的数据
 */
export const removeIllegalParams = (params) => {
  const illegalType = ['null', 'undefined', 'function', 'error', 'regexp'];
  const t = type(params);
  if (t === 'object') {
    const localParams = {};
    Object.keys(params || ({})).forEach((v) => {
      if (illegalType.indexOf(type(params[v])) === -1 && params[v] !== '') {
        localParams[v] = params[v];
      }
    });
    return localParams;
  } else if (t === 'array') {
    return params.filter(s => illegalType.indexOf(type(s)) === -1);
  }
  return params;
};

export const padLeftZero = str => `00${str}`.substr(str.length);

/**
 * 将时间格式化为字符串。
 * @param date ： 可以是Date对象也可以是timestamp
 * @param fmt ： 格式化之后的样式，默认： yyyy-MM-dd hh:mm:ss
 * @returns {string}
 */
export const formatDate = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (typeof date === 'number') {
    date = new Date(date);
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  Object.keys(o)
    .forEach((k) => {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = `${o[k]}`;
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
      }
    });
  return fmt;
};

/**
 * 获取图片的全路径
 * 详见官网： http://zimg.buaa.us/documents/
 * @param url ： 图片地址
 * @param params : { w ： 宽度, h ： 高度, q ： 质量的百分比(0-100整数), f : png/jpg（图片格式）, r : 旋转度数(0-360整数) }
 * @return [] | String : 传入的url是一个数组，则返回数组，传入一个string则返回单个url
 */
export const getPictureUrl = (url, params = {}) => {
  const p = Object.entries(params)
    .map(s => `${s[0]}=${s[1]}`)
    .reduce((a, b) => `${a}&${b}`);

  if (typeof url === 'string') {
    return IMAGE_SERVER_URL + url + (url.indexOf('?') >= 0 ? '&' : '?') + p;
  }
  return url.map(v => IMAGE_SERVER_URL + v + (v.indexOf('?') >= 0 ? '&' : '?') + p);
};
