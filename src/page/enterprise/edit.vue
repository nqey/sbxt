<template>
  <div>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div class="index_more">
      <div class="index_chunk">
       
        <div class="t_nav">&#12288;申报企业</div>
      <hr>
      <div v-if="reason" style="text-align: center;color: red;">
        <span class="glyphicon glyphicon-exclamation-sign"></span> <span style="position: relative;top:-1px;">{{reason}}</span>
      </div> 
      <div class="form-inline clearfix">
        <div class="form-group col-sm-2 txr">
          <label class="label_height"><span class="info">*</span> 企业全称：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <input type="text" class="form-control iw600" placeholder="请输入企业全称" v-model="name">
          <br/>
          <br/>
          &#12288;<small class="areafc">例如：四川中新华搜信息技术有限公司</small>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 企业法人：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <input type="text" class="form-control iw600" placeholder="请输入真实姓名" v-model="charger">
          <br/>
          <br/>
          &#12288;<small class="areafc">企业法人必须是真是姓名，与营业执照上相同</small>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 手机号码：</label>
        </div>
        <div class="form-group col-sm-10 imb ">
          <input type="text" class="form-control iw600" placeholder="请输入手机号码" v-model="cellphone" @blur="validate">
          <br/>
          <br/>
          &#12288;<small class="areafc">该号码必须是企业法人本人手机号码</small>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 身份证号码：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <input type="text" class="form-control iw600" placeholder="请输入身份证号码" v-model="idNumber" @blur="validate">
          <br/>
          <br/>
          &#12288;<small class="areafc">申报官真实有效的身份证号码，一张身份证只能注册一名申报官。</small>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height">身份证照片：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <small class="info2 label_height">请按照示例上传证件照片；支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
          <br/>
          <small class="info label_height">请上传企业法人真实身份证，否则审核不通过。</small>
          <div class="clearfix"></div>
          <div class="pull-left" style="width: 200px;margin-right: 30px;">
            <v-multiple-upload len="1" :imgSrc="initIdFrontUrl" uploadid="upload1" title="上传正面" @acceptData="frontUrl"></v-multiple-upload>
          </div>
          <div class="pull-left" style="width: 200px;">
            <v-multiple-upload len="1" :imgSrc="initIdBackUrl" uploadid="upload2" title="上传背面" @acceptData="backUrl"></v-multiple-upload>
          </div>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 营业执照：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <p class="label_height">请上次营业执照影印件。支持格式：bmp、jpg、png、gif。照片大小不超过2M。</p>
          <br/>
          <v-multiple-upload len="1" :imgSrc="initLicenseImageUrl" title="上传营业执照" @acceptData="setLicenseImageUrl" uploadid="upload3"></v-multiple-upload>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 生产许可证：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <p class="label_height">请上传生产许可证影印件。支持格式：bmp、jpg、png、gif。照片大小不超过2M。</p>
          <br/>
          <v-multiple-upload len="1" :imgSrc="initProductionImageUrl" title="上传生产许可证" @acceptData="setProductionImageUrl" uploadid="upload4"></v-multiple-upload>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 资金补贴申报表：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <p class="label_height"><b>下载</b> <a download :href="template.zxbtzjsbb" class="fc">申报表</a><img :src="xiazaiIcon"></img></p>
          <small class="info2 label_height">文件要求：上传加盖手印的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
          <br/>
          <small class="info label_height">请认真填写每一必填项，再上传完整的尽职调查表</small>
          <br/>
          <br/>
          <v-multiple-upload len="5" :imgSrc="initCapitalImageUrl" title="上传申报表" @acceptData="setCapitalImageUrl" uploadid="upload5"></v-multiple-upload>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 企业尽职调查表：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <p class="label_height"><b>下载</b> <a download :href="template.sbqyjzdcb" class="fc">尽职调查表</a><img :src="xiazaiIcon"></img></p>
          <small class="info2 label_height">文件要求：上传加盖手印的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
          <br/>
          <small class="info label_height">请认真填写每一必填项，再上传完整的尽职调查表</small>
          <br/>
          <br/>
          <v-multiple-upload len="5" :imgSrc="initEnterpriseSurveyImageUrl" title="上传调查表" @acceptData="setEnterpriseSurveyImageUrl" uploadid="upload6"></v-multiple-upload>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 企业负责人尽职调查表：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <p class="label_height"><b>下载</b> <a download :href="template.sbqyfzrjzdcb" class="fc">尽职调查表</a><img :src="xiazaiIcon"></img></p>
          <small class="info2 label_height">文件要求：上传加盖手印的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
          <br/>
          <small class="info label_height">请认真填写每一必填项，再上传完整的尽职调查表</small>
          <br/>
          <br/>
          <v-multiple-upload len="5" :imgSrc="initEnterpriseChargerSurveyImageUrl" title="上传调查表" @acceptData="setEnterpriseChargerSurveyImageUrl" uploadid="upload7"></v-multiple-upload>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 企业入库申请函：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <p class="label_height"><b>下载</b> <a download :href="template.qysqrkh" class="fc">申请函</a><img :src="xiazaiIcon"></img></p>
          <small class="info2 label_height">文件要求：上传加盖手印的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
          <br/>
          <small class="info label_height">请上传完整的申请函</small>
          <br/>
          <br/>
          <v-multiple-upload len="1" :imgSrc="initEnterpriseShindImageUrl" title="上传申请函" uploadid="upload8" text="上传申请函" @acceptData="setEnterpriseShindImageUrl"></v-multiple-upload>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height">授权委托书：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <p class="label_height"><b>下载</b> <a download :href="template.zddbhzgtwtdlrsqwts" class="fc">委托书</a><img :src="xiazaiIcon"></img></p>
          <small class="info2 label_height">指定代表或者共同委托代理人授权委托书；如企业法人不能亲自办理入库事宜，法人可签订此授权书委托书给指定负责人进行办理。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
          <br/>
          <br/>
          <v-multiple-upload len="1" :imgSrc="initAuthorizationImageUrl" uploadid="upload9" title="上传委托书" @acceptData="setAuthorizationImageUrl"></v-multiple-upload>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"> 其他补充材料：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <small class="info2 label_height">企业如有其他补充材料，可上传至此，最多5张，可增加通过率;例如发明专利、商标等知识产权；各项奖励证书，等级证书，认证证书等；如企业有全国工业生产许可证，安全生产许可证也需上传至此。 </small>
          <br/>
          <br/>
          <v-multiple-upload len="5" :imgSrc="initOtherImageUrl" title="上传补充材料" @acceptData="setOtherImageUrl" uploadid="upload10"></v-multiple-upload>
        </div>
        <div class="form-group col-sm-1 txr clearfix"></div>
        <div class="form-group col-sm-11 imb">
          <button v-show="isShowSubmit" type="button" class="btn btn-success" @click="submit" style="height: 35px;">确认</button>
          <button v-show="!isShowSubmit" type="button" class="btn btn-success" disabled style="height: 35px;">确认</button>
          <br/>
          <br/>
          <p class="areafc">&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#32;申报企业需审核</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import multipleUpload from '@/components/upload/multipleUpload';
import errInfo from '@/components/info/error';
import rules from '@/config/rules';
import { DECLARE_GET_ENTERPRISE_ID, DECLARE_PUT_ENTERPRISE, EXCEL_SERVER_URL } from '@/config/env';
import xiazaiIcon from '@/assets/img/xiazaiIcon.gif';

export default {
  name: 'edit',
  data() {
    return {
      showImg: false,
      isShowSubmit: true,
      name: '',
      charger: '',
      cellphone: '',
      idNumber: '',
      idFrontUrl: '',
      idBackUrl: '',
      licenseImageUrl: '',
      productionImageUrl: '',
      capitalImageUrl: '',
      enterpriseSurveyImageUrl: '',
      enterpriseChargerSurveyImageUrl: '',
      enterpriseShindImageUrl: '',
      authorizationImageUrl: '',
      otherImageUrl: '',
      initIdFrontUrl: '',
      initIdBackUrl: '',
      initLicenseImageUrl: '',
      initProductionImageUrl: '',
      initEnterpriseShindImageUrl: '',
      initAuthorizationImageUrl: '',
      initCapitalImageUrl: '',
      initEnterpriseSurveyImageUrl: '',
      initEnterpriseChargerSurveyImageUrl: '',
      initOtherImageUrl: '',
      errMsg: [],
      xiazaiIcon,
      timer: '',
      template: {
        zxbtzjsbb: `${EXCEL_SERVER_URL}/template/zxbtzjsbb.docx`,
        qysqrkh: `${EXCEL_SERVER_URL}/template/qysqrkh.docx`,
        zddbhzgtwtdlrsqwts: `${EXCEL_SERVER_URL}/template/zddbhzgtwtdlrsqwts.docx`,
        sbqyjzdcb: `${EXCEL_SERVER_URL}/template/sbqyjzdcb.docx`,
        sbqyfzrjzdcb: `${EXCEL_SERVER_URL}/template/sbqyfzrjzdcb.docx`,
        sbjgjzdcb: `${EXCEL_SERVER_URL}/template/sbjgjzdcb.docx`,
        sbjgcngh: `${EXCEL_SERVER_URL}/template/sbjgcngh.docx`,
        sbjgfzrjzdcb: `${EXCEL_SERVER_URL}/template/sbjgfzrjzdcb.docx`,
      },
    };
  },
  methods: {
    async init() {
      const id = this.$route.params.id;
      const res = await this.$http.get(`${DECLARE_GET_ENTERPRISE_ID}${id}`);
      if (res.success) {
        this.name = res.data.name;
        this.charger = res.data.charger;
        this.cellphone = res.data.cellphone;
        this.idNumber = res.data.idNumber;
        this.capitalImageUrl = res.data.capitalImageUrl;
        this.enterpriseSurveyImageUrl = res.data.enterpriseSurveyImageUrl;
        this.enterpriseChargerSurveyImageUrl = res.data.enterpriseChargerSurveyImageUrl;
        this.otherImageUrl = res.data.otherImageUrl;
        this.idFrontUrl = res.data.idFrontUrl;
        this.idBackUrl = res.data.idBackUrl;
        this.licenseImageUrl = res.data.licenseImageUrl;
        this.productionImageUrl = res.data.productionImageUrl;
        this.enterpriseShindImageUrl = res.data.enterpriseShindImageUrl;
        this.authorizationImageUrl = res.data.authorizationImageUrl;
        this.initIdFrontUrl = res.data.idFrontUrl;
        this.initIdBackUrl = res.data.idBackUrl;
        this.initLicenseImageUrl = res.data.licenseImageUrl;
        this.initProductionImageUrl = res.data.productionImageUrl;
        this.initEnterpriseShindImageUrl = res.data.enterpriseShindImageUrl;
        this.initAuthorizationImageUrl = res.data.authorizationImageUrl;
        this.initCapitalImageUrl = res.data.capitalImageUrl;
        this.initEnterpriseSurveyImageUrl = res.data.enterpriseSurveyImageUrl;
        this.initEnterpriseChargerSurveyImageUrl = res.data.enterpriseChargerSurveyImageUrl;
        this.initOtherImageUrl = res.data.otherImageUrl;
        this.state = res.data.state;
        this.reason = res.data.reason;
        // if (this.reason) {
        //   this.errMsg.push(this.reason);
        // }
      }
    },
    validate() {
      const errMsg = [];
      // 手机号码验证
      if (this.cellphone !== '' && !rules.mPattern.pattern.test(this.cellphone)) {
        errMsg.push(rules.mPattern.message);
      }
      // 生份证号码验证
      if (this.idNumber !== '' && !rules.cP.pattern.test(this.idNumber)) {
        errMsg.push(rules.cP.message);
      }
      this.errMsg = [...errMsg];
    },
    validate2() {
      this.validate();
      const errMsg = [];
      // 企业全称
      if (!this.name) {
        errMsg.push(`${rules.nonEmpty}${rules.enterpriseName}`);
      }
      // 企业负责人
      if (!this.charger) {
        errMsg.push(`${rules.nonEmpty}${rules.charger}`);
      }
      // 常住地址
      if (this.liveAddress === '') {
        this.errMsg.push(`${rules.select}${rules.liveAddress}`);
      }
      // 手机号码
      if (!this.cellphone) {
        errMsg.push(`${rules.nonEmpty}${rules.phone}`);
      }
      // 身份证号码
      if (!this.idNumber) {
        errMsg.push(`${rules.nonEmpty}${rules.idNumber}`);
      }
      // 身份证照片正面
      if (!this.idFrontUrl) {
        this.errMsg.push(`${rules.upload}${rules.idFrontUrl}`);
      }
      // 身份证照片背面
      if (!this.idBackUrl) {
        this.errMsg.push(`${rules.upload}${rules.idBackUrl}`);
      }
      // 营业执照
      if (!this.licenseImageUrl) {
        errMsg.push(`${rules.nonEmpty}${rules.licenseImageUrl}`);
      }
      // 生产许可证
      if (!this.productionImageUrl) {
        errMsg.push(`${rules.nonEmpty}${rules.productionImageUrl}`);
      }
      // 资金补贴申报表
      if (!this.capitalImageUrl) {
        errMsg.push(`${rules.nonEmpty}${rules.capitalImageUrl}`);
      }
      // 企业尽职调查表
      if (!this.enterpriseSurveyImageUrl) {
        errMsg.push(`${rules.nonEmpty}${rules.enterpriseSurveyImageUrl}`);
      }
      // 企业负责人尽职调查表
      if (!this.enterpriseChargerSurveyImageUrl) {
        errMsg.push(`${rules.nonEmpty}${rules.enterpriseChargerSurveyImageUrl}`);
      }
      // 企业入库申请函
      if (!this.enterpriseShindImageUrl) {
        errMsg.push(`${rules.nonEmpty}${rules.enterpriseShindImageUrl}`);
      }
      this.errMsg = [...this.errMsg, ...errMsg];
    },
    frontUrl(d) {
      this.idFrontUrl = d;
    },
    backUrl(d) {
      this.idBackUrl = d;
    },
    setLicenseImageUrl(d) {
      this.licenseImageUrl = d;
    },
    setProductionImageUrl(d) {
      this.productionImageUrl = d;
    },
    setCapitalImageUrl(d) {
      this.capitalImageUrl = d;
    },
    setEnterpriseSurveyImageUrl(d) {
      this.enterpriseSurveyImageUrl = d;
    },
    setEnterpriseChargerSurveyImageUrl(d) {
      this.enterpriseChargerSurveyImageUrl = d;
    },
    setEnterpriseShindImageUrl(d) {
      this.enterpriseShindImageUrl = d;
    },
    setAuthorizationImageUrl(d) {
      this.authorizationImageUrl = d;
    },
    setOtherImageUrl(d) {
      this.otherImageUrl = d;
    },
    async submit() {
      this.validate2();
      if (this.errMsg.length !== 0) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => { this.errMsg = []; }, 3000);
        return;
      }
      const id = this.$route.params.id;
      const param = {};
      param.name = this.name;
      param.charger = this.charger;
      param.cellphone = this.cellphone;
      param.idNumber = this.idNumber;
      param.idFrontUrl = this.idFrontUrl;
      param.idBackUrl = this.idBackUrl;
      param.licenseImageUrl = this.licenseImageUrl;
      param.productionImageUrl = this.productionImageUrl;
      param.capitalImageUrl = this.capitalImageUrl;
      param.enterpriseSurveyImageUrl = this.enterpriseSurveyImageUrl;
      param.enterpriseChargerSurveyImageUrl = this.enterpriseChargerSurveyImageUrl;
      param.enterpriseShindImageUrl = this.enterpriseShindImageUrl;
      param.authorizationImageUrl = this.authorizationImageUrl;
      param.otherImageUrl = this.otherImageUrl;
      param.state = this.state;
      this.isShowSubmit = !this.isShowSubmit;
      const res = await this.$http.post(`${DECLARE_PUT_ENTERPRISE}${id}`, param);
      if (res.success) {
        sessionStorage.setItem('title', '更新申报企业');
        sessionStorage.setItem('content', '更新申报企业成功');
        sessionStorage.setItem('content2', '');
        sessionStorage.setItem('content3', '');
        sessionStorage.setItem('alink', '');
        sessionStorage.setItem('blink', '/ent/list');
        sessionStorage.setItem('clink', '');
        this.$router.push('/message');
      } else {
        this.isShowSubmit = !this.isShowSubmit;
      }
    },
  },
  components: {
    'v-multiple-upload': multipleUpload,
    'v-error-info': errInfo,
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>

.index_more{background: #f6f7fb;
  height: 100%;
  padding-bottom: 200px;
    width: 100%;}
.index_chunk{ 
position: relative;
top:120px;
left: 19%;
margin: 0;
width: 78%;background:#fff; padding: 40px 70px 55px;border-radius: 4px; box-shadow: 0px 20px 20px -20px #ddd;}

.t_nav {
  border-left: #4786ff solid 3px;
  font-size: 18px;
}
.form-inline{ margin-top: 60px; }
.fc{color: #4786ff; border-bottom: 1px solid #4786ff; margin-right: 10px;}
a {
  text-decoration: none;
}
.txr {
  text-align: right;
}
.txc {
  text-align: center;
}
.iw {
  width: 300px;
}
.iw600 {
  width: 600px;
}
.label_height {
  line-height: 35px;
}
.imb {
  margin-bottom: 30px;
}
.info {
  color: #ac2925;
}
.areafc {
  color: #999;
}
.js-ajax-submit {
    width: 350px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
}
</style>
