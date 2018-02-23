const test = (() => {
  if (/lh-xm.com/.test(window.location.hostname) || /test.com/.test(window.location.hostname)) {
    return 'test';
  } else if (/cpsdb.com/.test(window.location.hostname)) {
    return 'online';
  }
  return 'local';
})();
const LOCAL_URL = '.test.com';
const ENTERPRISE_BASE_URL = (() => {
  switch (test) {
    case 'test':
      return '//ep.lh-xm.com/';
    case 'online':
      return '//ep.cpsdb.com/';
    default :
      return location.hostname.indexOf(LOCAL_URL) >= 0
        ? `//cps${LOCAL_URL}/enterprise/`
        : `//${location.hostname}:8080/enterprise/`;
  }
})();
const DECLARE_BASE_URL = (() => {
  switch (test) {
    case 'test':
      return '//dec.lh-xm.com/';
    case 'online':
      return '//dec.cpsdb.com/';
    default :
      return location.hostname.indexOf(LOCAL_URL) >= 0
        ? `//cps${LOCAL_URL}/declare/`
        : `//${location.hostname}:8080/declare/`;
  }
})();
const IMAGE_SERVER_URL = (() => {
  switch (test) {
    case 'test':
      return '//pic.lh-xm.com/';
    case 'online':
      return '//pic.cpsdb.com/';
    default :
      return '//192.168.1.47:9000/';
  }
})();
const DOMAIN = (() => {
  switch (test) {
    case 'test':
      return 'lh-xm.com';
    case 'online':
      return 'cpsdb.com';
    default :
      return location.hostname.indexOf(LOCAL_URL) >= 0 ? LOCAL_URL : location.hostname;
  }
})();
const ENTERPRISE_TYPE = {
  wait: '待支付',
  pending: '待初审',
  collectting: '待认证官上门采集',
  confirmFailed: '初审未通过',

  pending2: '待复审',
  confirm2Failed: '复审未通过',

  passed: '通过审核',
};

// api
// 验证码
const CHECKNUMBER = `${DECLARE_BASE_URL}publics/checknumber.jpg?t=`;
// 申报机构登录接口地址
const DECLARE_LOGIN_DO_ADDRESS = `${DECLARE_BASE_URL}publics/login/do`;
// 绑定申报机构接口地址
const ENTERPRISE_BIND_DECLAREORG_ADDRESS = `${ENTERPRISE_BASE_URL}sbxt/declare/enterprise`;
// 查询申报机构接口地址
const ENTERPRISE_QUERY_DECLAREORG_ADDRESS = `${ENTERPRISE_BASE_URL}sbxt/query/declareorg`;

export {
  test,
  ENTERPRISE_BASE_URL,
  DECLARE_BASE_URL,
  IMAGE_SERVER_URL,
  DOMAIN,
  DECLARE_LOGIN_DO_ADDRESS,
  ENTERPRISE_BIND_DECLAREORG_ADDRESS,
  ENTERPRISE_QUERY_DECLAREORG_ADDRESS,
  CHECKNUMBER,
  ENTERPRISE_TYPE,
};
