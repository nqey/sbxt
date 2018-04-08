// 使用方法
// fetchData: async function () {
//   let params = {
//   }
//   const res = await http.get(api.right, params)
//   if (res.data.success) {
//     alert('请求成功')
//   }
// }

import axios from 'axios';
// import { Message } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import { toFormData, toRmEmpty } from '@/config/utils';
import Message from '@/components/info/alert';

// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  const con = config;
  // 在发送请求之前做些什么
  if (
    config.method === 'post' ||
    config.method === 'put' ||
    config.method === 'patch'
  ) {
    // 序列化
    con.data = toFormData(toRmEmpty(con.data));
    con.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  }
  if (config.method === 'upload') {
    config.method = 'post';
    // con.headers['Content-Type'] = 'multipart/form-data';
  }
  if (config.method === 'get') {
    con.params = toRmEmpty(config.params);
  }
  return con;
}, (error) => { Promise.reject(error); });

// 添加响应拦截器
// axios.interceptors.response.use(() => { 'abc'; },
// (error) => { Promise.resolve(error.response); });

const checkStatus = (res) => {
  // 如果http状态码正常，则直接返回数据
  if (res && (res.status === 200 || res.status === 304 || res.status === 400)) {
    if (res.data && res.data.success && res.data.message) {
      Message.success(res.data.message);
    }
    return res;
  }
  // 异常状态下，把错误信息返回去
  const r = res;
  r.status = -404;
  r.message = '网络异常';
  return r;
};

const checkCode = (res) => {
  if (res.data && res.data.message && (!res.data.success || res.status === -404)) {
    // 对请求错误做些什么
    const errMsg = [];
    errMsg.push(res.data.message);
    Message.error({ errMsg });
  }
  return res;
};

export default {
  async xhr(method, url, data = {}) {
    const config = { method, url };
    if (method === 'get') {
      config.params = data;
    } else {
      config.data = data;
    }
    const res = await axios(config);
    return checkCode(checkStatus(res));
  },
};
