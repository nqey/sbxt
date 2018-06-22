export const env = (() => {
  if (/cpsdb61.com/.test(window.location.hostname)) {
    return 'test';
  } else if (/cpsdb.com/.test(window.location.hostname)) {
    return 'online';
  }
  return 'local';
})();
export const LOCAL_URL = '.test.com';

export const ENTERPRISE_BASE_URL = {
  test: '//ep.cpsdb61.com/',
  online: '//ep.cpsdb.com/',
  local: location.hostname,
}[env];

export const BASE_URL = {
  test: '//base.cpsdb61.com/',
  online: '//base.cpsdb.com/',
  local: location.hostname,
}[env];

export const EXAM_BASE_URL = {
  test: '//exam.cpsdb61.com/',
  online: '//exam.cpsdb.com/',
  local: location.hostname,
}[env];

export const DECLARE_BASE_URL = {
  test: '//dec.cpsdb61.com/',
  online: '//dec.cpsdb.com/',
  local: location.hostname,
}[env];

export const IMAGE_SERVER_URL = {
  test: '//pic.cpsdb61.com/',
  online: '//pic.cpsdb.com/',
  local: location.hostname,
}[env];

export const DOMAIN = {
  test: 'cpsdb61.com',
  online: 'cpsdb.com',
  local: location.hostname.indexOf(LOCAL_URL) >= 0 ? LOCAL_URL : location.hostname,
}[env];

export const GOODS_BASE_URL = {
  test: '//g.cpsdb61.com/',
  online: '//g.cpsdb.com/',
  local: location.hostname.indexOf(LOCAL_URL) >= 0 ? LOCAL_URL : location.hostname,
}[env];

export const FANS_BASE_URL = {
  test: '//fans.cpsdb61.com/',
  online: '//fans.cpsdb.com/',
  local: location.hostname.indexOf(LOCAL_URL) >= 0 ? LOCAL_URL : location.hostname,
}[env];

export const EXCEL_SERVER_URL = {
  test: '//adm.cpsdb61.com/',
  online: '//adm.cpsdb.com/',
  local: location.hostname,
}[env];

// api
// 获取二维码
export const DECLARE_QCODE = `${DECLARE_BASE_URL}publics/qcode.jpg`;
// 获取图片验证码
export const CHECKNUMBER = `${BASE_URL}publics/checknumber.jpg?t=`;
// 申报机构登录接口地址
export const DECLARE_LOGIN_DO_ADDRESS = `${DECLARE_BASE_URL}publics/login/do`;
// 绑定申报机构接口地址
export const ENTERPRISE_BIND_DECLAREORG_ADDRESS = `${ENTERPRISE_BASE_URL}sbxt/declare/enterprise`;
// 查询申报机构接口地址
export const ENTERPRISE_QUERY_DECLAREORG_ADDRESS = `${ENTERPRISE_BASE_URL}sbxt/query/declareorg`;
// 查询申报机构数接口地址
export const ENTERPRISE_QUERY_COUNT_ADDRESS = `${ENTERPRISE_BASE_URL}sbxt/query/count`;
// 申报机构注册
export const DECLARE_POST_ORGANIZ = `${DECLARE_BASE_URL}publics/organiz`;
// 登录
export const DECLARE_LOGIN = `${DECLARE_BASE_URL}publics/login`;
// 获取注册验证码 + {type}/{cellphone}
export const DECLARE_GET_VALIDATECODE = `${DECLARE_BASE_URL}publics/validatecode/`;
// 通用图片上传
export const DECLARE_POST_UPLOAD = `${BASE_URL}publics/file/upload`;
// 获取地区树
export const DECLARE_GET_AREA_TREE = `${BASE_URL}publics/area/tree`;
// 选择推荐机构 + {name}
export const DECLARE_GET_RECOMMEND_ORGANIZ = `${DECLARE_BASE_URL}publics/recommend/organiz/`;
// 选择推荐申报官 + {name} 申报官单独申请使用
export const DECLARE_GET_RECOMMEND_OFFICER = `${DECLARE_BASE_URL}publics/recommend/declarer/`;
// 选择推荐申报官 + {ID} 申报官单独申请使用
export const DECLARE_GET_RECOMMEND_OFFICER_ID = `${DECLARE_BASE_URL}publics/declarer/`;
// 获取负责区域名额 + {areaCode}
export const DECLARE_AREALIMIT_AREACODE = `${DECLARE_BASE_URL}publics/areaLimit/`;
// 查询未通过的机构信息
export const DECLARE_UNPASS = `${DECLARE_BASE_URL}organiz/unpass`;
// 完善基本信息
export const DECLARE_PUT_BASEINFO = `${DECLARE_BASE_URL}organiz/baseInfo`;
// 查询申报机构基本信息
export const DECLARE_GET_BASEINFO = `${DECLARE_BASE_URL}organiz/baseInfo`;
// 填表登记
export const DECLARE_PUT_REGISTINFO = `${DECLARE_BASE_URL}organiz/registInfo`;
// 修改密码
export const DECLARE_PUT_PASSWORD = `${DECLARE_BASE_URL}publics/user/password`;
// 添加申报官
export const DECLARE_POST_DECLARER = `${DECLARE_BASE_URL}organiz/declarer/info`;
// 公共申报官注册接口，申报自行注册；
// 2018年5月22日 14:39:23需求；
export const DECLARE_PUBLICS_POST_DECLARER = `${DECLARE_BASE_URL}publics/declarer/info`;
// 更新申报官 + {id}
export const DECLARE_PUT_DECLARER = `${DECLARE_BASE_URL}organiz/declarer/`;
// 申报官验证唯一性 + {type}/{value}
export const DECLARE_GET_DECLARER_VALIDATE = `${DECLARE_BASE_URL}organiz/declarer/validate/`;
// 查询申报官列表
export const DECLARE_GET_DECLARER_LIST = `${DECLARE_BASE_URL}organiz/declarer/list`;
// 申报机构系统发起操作申报官状态 + {id}
export const DECLARE_DELETE_DECLARER = `${DECLARE_BASE_URL}organiz/declarer/delete/`;
// 查询具体申报官 + {id}
export const DECLARE_GET_DECLARER_DETAILS = `${DECLARE_BASE_URL}organiz/declarer/details/`;
// 添加申报企业 + {id}
export const DECLARE_POST_ENTERPRISE = `${DECLARE_BASE_URL}organiz/enterprise/info`;
// 更新申报企业 + {id}
export const DECLARE_PUT_ENTERPRISE = `${DECLARE_BASE_URL}organiz/enterprise/`;
// 自动填充营业执照
export const DECLARE_POST_RECOGNIZE = `${DECLARE_BASE_URL}organiz/license/recognize`;
// 查询企业列表
export const DECLARE_GET_ENTERPRISE_LIST = `${DECLARE_BASE_URL}organiz/enterprise/list`;
// 查询企业总条数
export const DECLARE_GET_ENTERPRISE_COUNT = `${DECLARE_BASE_URL}organiz/enterprise/count`;
// 查询申报企业详情 + id
export const DECLARE_GET_ENTERPRISE_ID = `${DECLARE_BASE_URL}organiz/enterprise/`;
// 添加账户
export const DECLARE_POST_USER_ACOUNT = `${DECLARE_BASE_URL}organiz/user/acount`;
// 修改账户 + {id}
export const DECLARE_PUT_USER_ACOUNT = `${DECLARE_BASE_URL}organiz/user/acount/`;
// 查询账号下的申报官
export const DECLARE_GET_DECLARER_SIMPLE = `${DECLARE_BASE_URL}organiz/declarer/simple`;
// 查询账号列表
export const DECLARE_GET_USER_ACOUNT = `${DECLARE_BASE_URL}organiz/user/acount`;
// 查询账号列表总数
export const DECLARE_GET_USER_ACOUNT_COUNT = `${DECLARE_BASE_URL}organiz/user/acount/count`;
// 查询账号详情 + {id}
export const DECLARE_GET_USER_ACOUNT_ID = `${DECLARE_BASE_URL}organiz/user/acount/`;
// 删除账号 + {id}
export const DECLARE_DELETE_USER_ACOUNT_ID = `${DECLARE_BASE_URL}organiz/user/delete/`;
// 查询申报机构列表
export const DECLARE_GET_DECLARE_ORGANIZ = `${DECLARE_BASE_URL}publics/declare/organiz`;
// 查询账号列表总数
export const DECLARE_GET_DECLARE_ORGANIZ_COUNT = `${DECLARE_BASE_URL}publics/declare/organiz/count`;
// 查询服务中心列表
export const DECLARE_GET_DECLARE_FWZX = `${BASE_URL}publics/user/`;
// 查询服务中心列表总数
export const DECLARE_GET_DECLARE_FWZX_COUNT = `${BASE_URL}publics/user/count/`;
// ================================服务中心管理后台===================================================
// 申报机构查询
export const PLATFORM_GET_ORGANIZ_QUERY = `${DECLARE_BASE_URL}platform/organiz/query`;
// 申报机构分页总条数
export const PLATFORM_GET_ORGANIZ_COUNT = `${DECLARE_BASE_URL}platform/organiz/count`;
// 申报机构删除 + {id}
export const PLATFORM_DELETE_ORGANIZ = `${DECLARE_BASE_URL}platform/organiz/delete/`;
// 申报机构详情 + {id}
export const PLATFORM_GET_ORGANIZ = `${DECLARE_BASE_URL}platform/organiz/`;
// 申报机构基本信息审核 + {id}
export const PLATFORM_PUT_ORGANIZ_BASEAUDIT = `${DECLARE_BASE_URL}platform/organiz/baseAudit/`;
// 申报机构登记信息审核 + {id}
export const PLATFORM_PUT_ORGANIZ_REGISTAUDIT = `${DECLARE_BASE_URL}platform/organiz/registAudit/`;
// 申报官列表
export const PLATFORM_GET_DECLARER_QUERY = `${DECLARE_BASE_URL}platform/declarer/query`;
// 申报官列表总数
export const PLATFORM_GET_DECLARER_COUNT = `${DECLARE_BASE_URL}platform/declarer/count`;
// 申报官删除 + {id}
export const PLATFORM_DELETE_DECLARER = `${DECLARE_BASE_URL}platform/declarer/delete/`;
// 申报官详情 + {id}
export const PLATFORM_GET_DECLARER = `${DECLARE_BASE_URL}platform/declarer/`;
// 申报官审核 + {id}
export const PLATFORM_PUT_DECLARER_AUDIT = `${DECLARE_BASE_URL}platform/declarer/audit/`;
// 申报官二维码被扫 + {id}
export const PLATFORM_POST_DECLARER_CODE = `${DECLARE_BASE_URL}publics/declarer/code/`;
// 查看申报官二维码详情 + {id}
export const PLATFORM_GET_DECLARER_CODE = `${DECLARE_BASE_URL}platform/declarer/code/`;
// 申报官企业列表 + {id}
export const PLATFORM_GET_DECLARER_ENTERPRISE_QUERY = `${DECLARE_BASE_URL}platform/declare/enterprise/query`;
// 申报官企业列表总数 + {id}
export const PLATFORM_GET_DECLARER_ENTERPRISE_COUNT = `${DECLARE_BASE_URL}platform/declare/enterprise/count`;
// 查看申报企业详情 + {id}
export const PLATFORM_GET_DECLARER_ENTERPRISE_ID = `${DECLARE_BASE_URL}platform/declare/enterprise/`;
// 申报企业审核
export const PLATFORM_PUT_DECLARER_ENTERPRISE_AUDIT = `${DECLARE_BASE_URL}platform/declare/enterprise/audit/{id}`;
// ================================考试系统外部接口===================================================
// 根据考生的name、certificate和phone返回具体的考生对象，如果无则返回null;
export const PLATFORM_GET_DECLARER_EXAMINATION = `${DECLARE_BASE_URL}publics/declarer/examination`;
// 根据考生的id更新考生的总分数;
export const PLATFORM_POST_DECLARER_SCORE = `${DECLARE_BASE_URL}platform/declarer/score`;
// ================================公告===================================================
// 最新显示在页面上的信息
export const PUBLICS_GET_NOTICES_NEWEST = `${DECLARE_BASE_URL}publics/notices/newest`;
// 系统公告的详情 + {id}
export const PUBLICS_GET_NOTICES_DETAILS = `${DECLARE_BASE_URL}publics/notices/details/`;
// 动态条件查询下的系统公告的分页内容列表
export const PUBLICS_GET_NOTICES_LISTING = `${DECLARE_BASE_URL}publics/notices/listing`;
// 动态条件查询下的系统公告的分页内容列表
export const PUBLICS_GET_NOTICES_COUNTS = `${DECLARE_BASE_URL}publics/notices/counts`;
// 手机号验证 + {cellphone}
export const PUBLICS_GET_CHECK_CELLPHONE = `${DECLARE_BASE_URL}publics/get/`;
// ------------------------补贴公共---------------------------------
// 下拉获取银行列表
export const PUBLICS_BANK_LIST = `${ENTERPRISE_BASE_URL}publics/bank/list`;
// 点击申请提现
export const ORGANIZ_SUBSIDY_WITHDRAW = `${ENTERPRISE_BASE_URL}organiz/subsidy/withdraw`;
// 企业入库补贴申请提现信息确认
export const ORGANIZ_SUBSIDY_WITHDRAW_RUKU = `${ENTERPRISE_BASE_URL}organiz/subsidy/withdraw/ruku`;
// 总后台补贴审核列表、分页
export const ORGANIZ_SUBSIDY_QUERY = `${ENTERPRISE_BASE_URL}organiz/subsidy/query`;
// 总后台补贴审核列表、分页
export const ORGANIZ_SUBSIDY_COUNT = `${ENTERPRISE_BASE_URL}organiz/subsidy/count`;
// 总后台补贴审核 审核接口(通过审核) + {subsidyId}
export const ORGANIZ_SUBSIDY_PASS = `${ENTERPRISE_BASE_URL}organiz/subsidy/pass/`;
// 总后台补贴审核 审核接口(不通过审核) + {subsidyId}
export const SUBSIDY_REJECTED = `${ENTERPRISE_BASE_URL}organiz/subsidy/rejected/`;
// 总后台补贴审核 审核接口(延后审核) + {subsidyId}
export const ORGANIZ_SUBSIDY_DELAYED = `${ENTERPRISE_BASE_URL}organiz/subsidy/delayed/`;
// 补贴审核中的补贴金额统计数据
export const ORGANIZ_SUBSIDY_STATISTICAL_AMOUNT = `${ENTERPRISE_BASE_URL}organiz/subsidy/statistical/amount`;
// ----------------------------------推荐管理-----------------------------------
// 我的补贴金额
export const ORGANIZ_DECLARER_RECOMMEND_AMOUNT = `${DECLARE_BASE_URL}organiz/declarer/recommend/amount`;
// 申报官、申报机构补贴明细
export const ORGANIZ_DECLARER_RECOMMEND_AMOUNT_DETAIL = `${DECLARE_BASE_URL}organiz/declarer/recommend/amount/detail`;
// 查询推荐列表
export const DECLARE_GET_RECOMMEND = `${DECLARE_BASE_URL}organiz/declarer/recommend`;
// 查询推荐列表总条数
export const DECLARE_GET_RECOMMEND_COUNT = `${DECLARE_BASE_URL}organiz/declarer/recommend/count`;
// 查询他的推荐列表
export const ORGANIZ_DECLARER_RECOMMEND_PARENT = `${DECLARE_BASE_URL}organiz/declarer/recommend/parent`;
// 查询他的推荐列表总条数
export const ORGANIZ_DECLARER_RECOMMEND_PARENT_COUNT = `${DECLARE_BASE_URL}organiz/declarer/recommend/parent/count`;
// 企业申报管理
// 我的申请记录列表、分页信息
export const ORGANIZ_SUBSIDY_RECORD_QUERY = `${ENTERPRISE_BASE_URL}organiz/subsidy/record/query`;
// 我的申请记录列表、分页信息
export const ORGANIZ_SUBSIDY_RECORD_COUNT = `${ENTERPRISE_BASE_URL}organiz/subsidy/record/count`;
// 我的申请记录列表、分页信息
export const ORGANIZ_SUBSIDY_RECOMMEND_RECORD_QUERY = `${ENTERPRISE_BASE_URL}organiz/subsidy/recommend/record/query`;
// 我的申请记录列表、分页信息
export const ORGANIZ_SUBSIDY_RECOMMEND_RECORD_COUNT = `${ENTERPRISE_BASE_URL}organiz/subsidy/recommend/record/count`;
// 我的申请记录列表、分页信息
export const ORGANIZ_SUBSIDY_WITHDRAW_RECOMMEND = `${ENTERPRISE_BASE_URL}organiz/subsidy/withdraw/recommend`;
// 申报官、申报机构我的补贴金额
export const ORGANIZ_SUBSIDY_AMOUNT = `${ENTERPRISE_BASE_URL}organiz/subsidy/amount`;
// 申报官、申报机构补贴明细
export const ORGANIZ_SUBSIDY_DETAIL_QUERY = `${ENTERPRISE_BASE_URL}organiz/subsidy/detail/query`;
// 申报官、申报机构补贴明细
export const ORGANIZ_SUBSIDY_DETAIL_COUNT = `${ENTERPRISE_BASE_URL}organiz/subsidy/detail/count`;
// 工号验证 + {cellphone}
export const PUBLICS_DECLARER_CHECK_CELLPHONE = `${DECLARE_BASE_URL}publics/declarer/`;
//  申报官列表
export const PUBLICS_DECLARER_LIST = `${DECLARE_BASE_URL}/publics/declarer/list`;
