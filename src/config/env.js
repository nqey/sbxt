const test = (() => {
  if (/lh-xm.com/.test(window.location.hostname) || /test.com/.test(window.location.hostname)) {
    return 'online';
  } else if (/cpsdb.com/.test(window.location.hostname)) {
    return 'online';
  }
  return 'online';
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
      return '//dec.cpsdb77.com/';
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
      return 'cpsdb77.com';
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
// 获取图片验证码
const CHECKNUMBER = `${DECLARE_BASE_URL}publics/checknumber.jpg?t=`;
// 申报机构登录接口地址
const DECLARE_LOGIN_DO_ADDRESS = `${DECLARE_BASE_URL}publics/login/do`;
// 绑定申报机构接口地址
const ENTERPRISE_BIND_DECLAREORG_ADDRESS = `${ENTERPRISE_BASE_URL}sbxt/declare/enterprise`;
// 查询申报机构接口地址
const ENTERPRISE_QUERY_DECLAREORG_ADDRESS = `${ENTERPRISE_BASE_URL}sbxt/query/declareorg`;
// 查询申报机构数接口地址
const ENTERPRISE_QUERY_COUNT_ADDRESS = `${ENTERPRISE_BASE_URL}sbxt/query/count`;
// 申报机构注册
const DECLARE_POST_ORGANIZ = `${DECLARE_BASE_URL}publics/organiz`;
// 登录
const DECLARE_LOGIN = `${DECLARE_BASE_URL}publics/login`;
// 获取注册验证码 + {type}/{cellphone}
const DECLARE_GET_VALIDATECODE = `${DECLARE_BASE_URL}publics/validatecode/`;
// 通用图片上传
const DECLARE_POST_UPLOAD = `${ENTERPRISE_BASE_URL}publics/file/upload`;
// 获取地区树
const DECLARE_GET_AREA_TREE = `${DECLARE_BASE_URL}publics/area/tree`;
// 选择推荐机构 + {name}
const DECLARE_RECOMMEND_ORGANIZ = `${DECLARE_BASE_URL}publics/recommend/organiz/`;
// 获取负责区域名额 + {areaCode}
const DECLARE_AREALIMIT_AREACODE = `${DECLARE_BASE_URL}publics/areaLimit/`;
// 查询未通过的机构信息
const DECLARE_UNPASS = `${DECLARE_BASE_URL}organiz/unpass`;
// 完善基本信息
const DECLARE_PUT_BASEINFO = `${DECLARE_BASE_URL}organiz/baseInfo`;
// 查询申报机构基本信息
const DECLARE_GET_BASEINFO = `${DECLARE_BASE_URL}organiz/baseInfo`;
// 填表登记
const DECLARE_PUT_REGISTINFO = `${DECLARE_BASE_URL}organiz/registInfo`;
// 修改密码
const DECLARE_PUT_PASSWORD = `${DECLARE_BASE_URL}organiz/password`;
// 添加申报官
const DECLARE_POST_DECLARER = `${DECLARE_BASE_URL}organiz/declarer/info`;
// 更新申报官 + {id}
const DECLARE_PUT_DECLARER = `${DECLARE_BASE_URL}organiz/declarer`;
// 申报官验证唯一性 + {type}/{value}
const DECLARE_GET_DECLARER_VALIDATE = `${DECLARE_BASE_URL}organiz/declarer/validate/`;
// 查询申报官列表
const DECLARE_GET_DECLARER_LIST = `${DECLARE_BASE_URL}organiz/declarer/list`;
// 申报机构系统发起操作申报官状态 + {id}
const DECLARE_DELETE_DECLARER = `${DECLARE_BASE_URL}organiz/declarer/delete/`;
// 查询具体申报官 + {id}
const DECLARE_GET_DECLARER_DETAILS = `${DECLARE_BASE_URL}organiz/declarer/details/`;
// 添加申报企业 + {id}
const DECLARE_POST_ENTERPRISE = `${DECLARE_BASE_URL}organiz/enterprise/info`;
// 更新申报企业 + {id}
const DECLARE_PUT_ENTERPRISE = `${DECLARE_BASE_URL}organiz/enterprise/`;
// 自动填充营业执照
const DECLARE_POST_RECOGNIZE = `${DECLARE_BASE_URL}organiz/license/recognize`;
// 查询企业列表
const DECLARE_GET_ENTERPRISE_LIST = `${DECLARE_BASE_URL}organiz/enterprise/list`;
// 查询企业总条数
const DECLARE_GET_ENTERPRISE_COUNT = `${DECLARE_BASE_URL}organiz/enterprise/count`;
// 查询申报企业详情 + id
const DECLARE_GET_ENTERPRISE_ID = `${DECLARE_BASE_URL}organiz/enterprise/{id}`;
// 查询推荐列表
const DECLARE_GET_RECOMMEND = `${DECLARE_BASE_URL}organiz/recommend`;
// 查询推荐列表总条数
const DECLARE_GET_RECOMMEND_COUNT = `${DECLARE_BASE_URL}organiz/recommend/count`;
// 添加账户
const DECLARE_POST_USER_ACOUNT = `${DECLARE_BASE_URL}organiz/user/acount`;
// 修改账户 + {id}
const DECLARE_PUT_USER_ACOUNT = `${DECLARE_BASE_URL}organiz/user/acount/`;
// 查询账号下的申报官
const DECLARE_GET_DECLARER_SIMPLE = `${DECLARE_BASE_URL}organiz/declarer/simple`;
// 查询账号列表
const DECLARE_GET_USER_ACOUNT = `${DECLARE_BASE_URL}organiz/user/acount`;
// 查询账号列表总数
const DECLARE_GET_USER_ACOUNT_COUNT = `${DECLARE_BASE_URL}organiz/user/acount/count`;
// 查询账号详情 + {id}
const DECLARE_GET_USER_ACOUNT_ID = `${DECLARE_BASE_URL}organiz/user/acount/`;
// 删除账号 + {id}
const DECLARE_DELETE_USER_ACOUNT_ID = `${DECLARE_BASE_URL}organiz/user/acount/`;
// 查询申报机构列表
const DECLARE_GET_DECLARE_ORGANIZ = `${DECLARE_BASE_URL}publics/declare/organiz`;
// 查询账号列表总数
const DECLARE_GET_DECLARE_ORGANIZ_COUNT = `${DECLARE_BASE_URL}publics/declare/organiz/count`;
// 查询服务中心列表
const DECLARE_GET_DECLARE_FWZX = `${DECLARE_BASE_URL}publics/declare/fwzx`;
// 查询服务中心列表总数
const DECLARE_GET_DECLARE_FWZX_COUNT = `${DECLARE_BASE_URL}publics/declare/fwzx/count`;
// ================================服务中心管理后台===================================================
// 申报机构查询
const PLATFORM_GET_ORGANIZ_QUERY = `${DECLARE_BASE_URL}platform/organiz/query`;
// 申报机构分页总条数
const PLATFORM_GET_ORGANIZ_COUNT = `${DECLARE_BASE_URL}platform/organiz/count`;
// 申报机构删除 + {id}
const PLATFORM_DELETE_ORGANIZ = `${DECLARE_BASE_URL}platform/organiz/`;
// 申报机构详情 + {id}
const PLATFORM_GET_ORGANIZ = `${DECLARE_BASE_URL}platform/organiz/`;
// 申报机构基本信息审核 + {id}
const PLATFORM_PUT_ORGANIZ_BASEAUDIT = `${DECLARE_BASE_URL}platform/organiz/baseAudit/`;
// 申报机构登记信息审核 + {id}
const PLATFORM_PUT_ORGANIZ_REGISTAUDIT = `${DECLARE_BASE_URL}platform/organiz/registAudit/`;
// 申报官列表
const PLATFORM_GET_DECLARER_QUERY = `${DECLARE_BASE_URL}platform/declarer/query`;
// 申报官列表总数
const PLATFORM_GET_DECLARER_COUNT = `${DECLARE_BASE_URL}platform/declarer/count`;
// 申报官删除 + {id}
const PLATFORM_DELETE_DECLARER = `${DECLARE_BASE_URL}platform/declarer/`;
// 申报官详情 + {id}
const PLATFORM_GET_DECLARER = `${DECLARE_BASE_URL}platform/declarer/`;
// 申报官审核 + {id}
const PLATFORM_PUT_DECLARER_AUDIT = `${DECLARE_BASE_URL}platform/declarer/audit/`;
// 申报官二维码被扫 + {id}
const PLATFORM_POST_DECLARER_CODE = `${DECLARE_BASE_URL}publics/declarer/code/`;
// 查看申报官二维码详情 + {id}
const PLATFORM_GET_DECLARER_CODE = `${DECLARE_BASE_URL}platform/declarer/code/`;
// 申报官企业列表 + {id}
const PLATFORM_GET_DECLARER_ENTERPRISE_QUERY = `${DECLARE_BASE_URL}platform/declare/enterprise/query`;
// 申报官企业列表总数 + {id}
const PLATFORM_GET_DECLARER_ENTERPRISE_COUNT = `${DECLARE_BASE_URL}platform/declare/enterprise/count`;
// 查看申报企业详情 + {id}
const PLATFORM_GET_DECLARER_ENTERPRISE_ID = `${DECLARE_BASE_URL}platform/declare/enterprise/`;
// 申报企业审核
const PLATFORM_PUT_DECLARER_ENTERPRISE_AUDIT = `${DECLARE_BASE_URL}platform/declare/enterprise/audit/{id}`;
// ================================考试系统外部接口===================================================
// 根据考生的name、certificate和phone返回具体的考生对象，如果无则返回null;
const PLATFORM_GET_DECLARER_EXAMINATION = `${DECLARE_BASE_URL}publics/declarer/examination`;
// 根据考生的id更新考生的总分数;
const PLATFORM_POST_DECLARER_SCORE = `${DECLARE_BASE_URL}platform/declarer/score`;

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
  ENTERPRISE_QUERY_COUNT_ADDRESS,
  DECLARE_POST_ORGANIZ,
  DECLARE_LOGIN,
  DECLARE_GET_VALIDATECODE,
  DECLARE_POST_UPLOAD,
  DECLARE_GET_AREA_TREE,
  DECLARE_RECOMMEND_ORGANIZ,
  DECLARE_AREALIMIT_AREACODE,
  DECLARE_UNPASS,
  DECLARE_PUT_BASEINFO,
  DECLARE_GET_BASEINFO,
  DECLARE_PUT_REGISTINFO,
  DECLARE_PUT_PASSWORD,
  DECLARE_POST_DECLARER,
  DECLARE_PUT_DECLARER,
  DECLARE_GET_DECLARER_VALIDATE,
  DECLARE_GET_DECLARER_LIST,
  DECLARE_DELETE_DECLARER,
  DECLARE_GET_DECLARER_DETAILS,
  DECLARE_POST_ENTERPRISE,
  DECLARE_PUT_ENTERPRISE,
  DECLARE_POST_RECOGNIZE,
  DECLARE_GET_ENTERPRISE_LIST,
  DECLARE_GET_ENTERPRISE_COUNT,
  DECLARE_GET_RECOMMEND,
  DECLARE_GET_RECOMMEND_COUNT,
  DECLARE_GET_ENTERPRISE_ID,
  DECLARE_POST_USER_ACOUNT,
  DECLARE_PUT_USER_ACOUNT,
  DECLARE_GET_DECLARER_SIMPLE,
  DECLARE_GET_USER_ACOUNT,
  DECLARE_GET_USER_ACOUNT_COUNT,
  DECLARE_GET_USER_ACOUNT_ID,
  DECLARE_DELETE_USER_ACOUNT_ID,
  DECLARE_GET_DECLARE_ORGANIZ,
  DECLARE_GET_DECLARE_ORGANIZ_COUNT,
  DECLARE_GET_DECLARE_FWZX,
  DECLARE_GET_DECLARE_FWZX_COUNT,
  PLATFORM_GET_ORGANIZ_QUERY,
  PLATFORM_GET_ORGANIZ_COUNT,
  PLATFORM_DELETE_ORGANIZ,
  PLATFORM_GET_ORGANIZ,
  PLATFORM_GET_DECLARER_QUERY,
  PLATFORM_PUT_ORGANIZ_BASEAUDIT,
  PLATFORM_PUT_ORGANIZ_REGISTAUDIT,
  PLATFORM_GET_DECLARER_COUNT,
  PLATFORM_DELETE_DECLARER,
  PLATFORM_GET_DECLARER,
  PLATFORM_PUT_DECLARER_AUDIT,
  PLATFORM_POST_DECLARER_CODE,
  PLATFORM_GET_DECLARER_CODE,
  PLATFORM_GET_DECLARER_ENTERPRISE_QUERY,
  PLATFORM_GET_DECLARER_ENTERPRISE_COUNT,
  PLATFORM_GET_DECLARER_ENTERPRISE_ID,
  PLATFORM_PUT_DECLARER_ENTERPRISE_AUDIT,
  PLATFORM_GET_DECLARER_EXAMINATION,
  PLATFORM_POST_DECLARER_SCORE,
};
