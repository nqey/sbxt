// 格式化表单数据
const toFormData = (params) => {
  const ps = Object.entries(params);
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

export {
  toFormData,
  toRmEmpty,
};
