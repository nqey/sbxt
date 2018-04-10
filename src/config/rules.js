/* eslint-disable */
export default {
  // 用户名正则
  uPattern: {
  	pattern: /^[a-zA-Z0-9_-]{4,16}$/,
    message: '用户名错误',
  },
  // 密码强度正则
  pPattern: {
  	pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/,
  	message: '密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间',
  },
  // // 正整数正则
  // posPattern: /^\d+$/,
  // // 负整数正则
  // negPattern: /^-\d+$/,
  // // 整数正则
  // intPattern: /^-?\d+$/,
  // // 正数正则
  // posPattern: /^\d*\.?\d+$/,
  // // 负数正则
  // negPattern: /^-\d*\.?\d+$/,
  // // 数字正则
  // numPattern: /^-?\d*\.?\d+$/,
  // // Email正则
  // ePattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  // 手机号正则
  mPattern: { 
  	pattern: /^1[34578]\d{9}$/,
  	message: '请输入正确的手机号码',
  },
  // 身份证号（18位）正则
  cP: { 
  	pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  	message: '请输入正确的身份证号码',
  },
  iPwMsg: '确认密码不一致',
  agreeMsg: '请同意并遵守《CPS申报机构公共业务平台服务协议》',
  nonEmpty: '请输入',
  phone: '手机号码',
  password: '密码',
  confirmpw: '确认密码',
  validatecode: '验证码',
  idNumber: '身份证号码',
  name: '姓名',
  upload: '请上传',
  idFrontUrl: '身份证照片正面',
  idBackUrl: '身份证照片背面',
  select: '请选择',
  liveAddress: '常住地址区域',
  applyAddress: '申请区域',
  address: '详细地址',
  ecommendOrgniz: '推荐机构',
  enterpriseName: '企业全称',
  surveyImageUrl: '申报机构尽职调查表',
  letterImageUrl: '申报机构承诺公函',
  chargerSurveyImageUrl: '负责人尽职调查表',
  chargerImageUrl: '负责人承诺公函',
  commerceImageUrl: '企业工商营业执照',
  otherImageUrl: '其他补充材料',
  portrait: '寸照',
  surveyImageUrl: '尽职调查表',
  letterImageUrl: '承诺公函',
  charger: '企业负责人',
  licenseImageUrl: '营业执照',
  productionImageUrl: '生产许可证',
  capitalImageUrl: '资金补贴申报表',
  enterpriseSurveyImageUrl: '企业尽职调查表',
  enterpriseChargerSurveyImageUrl: '企业负责人尽职调查表',
  enterpriseShindImageUrl: '企业入库申请函',
  authorizationImageUrl: '授权委托书',
  // URL正则
  // urlP: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  // IPv4地址正则
  // ipP: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  // RGB Hex颜色正则
  // cPattern: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
  // 日期正则，简单判定,未做月份及日期的判定
  // dP1: /^\d{4}(\-)\d{1,2}\1\d{1,2}$/,
  // 日期正则，复杂判定
  // dP2: /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,
  // QQ号正则，5至11位
  // qqPattern: /^[1-9][0-9]{4,10}$/,
  // // 微信号正则，6至20位，以字母开头，字母，数字，减号，下划线
  // wxPattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
  // // 车牌号正则
  // cPattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
  // // 包含中文正则
  // cnPattern: /[\u4E00-\u9FA5]/,
};
