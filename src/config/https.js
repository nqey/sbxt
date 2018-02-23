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
import { Message } from 'element-ui';
import qs from 'qs';

// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
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
    con.data = qs.stringify(config.data);
  }
  return con;
}, (error) => { Promise.reject(error); });

// 添加响应拦截器
// axios.interceptors.response.use(() => { 'abc'; },
// (error) => { Promise.resolve(error.response); });

const checkStatus = (res) => {
  // 如果http状态码正常，则直接返回数据
  if (res && (res.status === 200 || res.status === 304 || res.status === 400)) {
    return res;
  }
  // 异常状态下，把错误信息返回去
  const r = res;
  r.status = -404;
  r.message = '网络异常';
  return r;
};

const checkCode = (res) => {
  if (res.data && (!res.data.success || res.status === -404)) {
    // 对请求错误做些什么
    Message.error(res.data.message);
  }
  return res;
};

export default {
  async post(url, data) {
    const res = await axios({
      method: 'post',
      url,
      data,
    });
    return checkCode(checkStatus(res));
  },
  async get(url, params) {
    const res = await axios({
      method: 'get',
      url,
      params, // get 请求时带的参数
    });
    return checkCode(checkStatus(res));
  },
};
