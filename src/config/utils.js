/* eslint-disable */
// 格式化表单数据
const toFormData = (params) => {
  const ps = Object.entries(params);
  if (ps.length === 0) {
    return '';
  }
  if (ps.length === 1) {
    return `${encodeURIComponent(ps[0][0])}=${encodeURIComponent(ps[0][1])}`;
  }
  return ps.reduce((p, c, i) => {
    if (i === 1) {
      return `${encodeURIComponent(p[0])}=${encodeURIComponent(p[1])}&${encodeURIComponent(c[0])}=${encodeURIComponent(c[1])}`;
    }
    return `${p}&${encodeURIComponent(c[0])}=${encodeURIComponent(c[1])}`;
  });
};

// 删除对象-属性值为空的属性
const toRmEmpty = (params) => {
  const localParams = {};
  Object.keys(params).forEach((v) => {
    if (params[v]) {
      localParams[v] = params[v];
    }
  });
  return localParams;
};

const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

const padLeftZero = (str) => {
  return ('00' + str).substr(str.length)
}

export {
  toFormData,
  toRmEmpty,
  formatDate,
};
