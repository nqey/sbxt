<template>
  <el-container>
    <el-header>
      <h2 class="demo-color-box">申报官注册</h2>
    </el-header>
    <el-main>
      <div style="height: 20px;"></div>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-dynamic" label-position="left">
        <el-form-item label="姓　　名" prop="name">
          <el-input v-model="form.name" placeholder="请输入申报官真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="cellphone">
          <el-input v-model="form.cellphone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
            <el-input v-model="form.code" placeholder="请输入验证码" class="r-el-input"></el-input>
            <el-button @click="sendMsg" type="primary" :disabled="isDisabled">{{buttonName}}</el-button>  
        </el-form-item>
        <el-form :model="areaform" :rules="rules" ref="areaform" label-width="100px" class="demo-dynamic" label-position="left">
          <el-form-item label="常住省份" prop="province" class="is-required">
            <el-select
              v-model="areaform.province"
              placeholder="省份"
              @change="queryCity">
              <el-option
                v-for="item in provinces"
                :key="item.code"
                :label="item.text"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="常住市" prop="city" class="is-required">
            <el-select
              v-model="areaform.city"
              placeholder="市"
              @change="queryTown">
              <el-option
                v-for="item in citys"
                :key="item.code"
                :label="item.text"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="常住区/县" prop="town" class="is-required">
            <el-select
              v-model="areaform.town"
              placeholder="区/县"
              @change="setareaCode">
              <el-option
                v-for="item in towns"
                :key="item.code"
                :label="item.text"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="寸照" prop="portrait">
          <v-multiple-upload  :imgSrc="slz" type="local" len="1" title="寸照" @acceptData="setPortrait" uploadid="upload1"></v-multiple-upload>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="证件正面" prop="idFrontUrl">
          <v-multiple-upload :imgSrc="idcar" len="1" uploadid="upload2" title="身份证正面" @acceptData="setFrontUrl"></v-multiple-upload>
        </el-form-item>
        <el-form-item  label="证件背面" prop="idBackUrl">
          <v-multiple-upload :imgSrc="idcar2" len="1" uploadid="upload3" title="身份证背面" @acceptData="setBackUrl"></v-multiple-upload>
        </el-form-item>
        <div class="el-form-item is-required" style="margin-bottom: 0px;">
          <a download :href="template.sbgjzdcb">
            <span class="el-icon-download" style="line-height: 41px;font-size: 25px;"></span>
            <span style="position: relative;top: -4px;font-size: 12px;">下载、填写、签证、盖章、上传</span>
          </a>
          <label for="address" class="el-form-item__label" style="width: 100px;">尽职调查表</label>
        </div>
        <el-form-item label="" prop="surveyImageUrl">
          <v-multiple-upload len="5" title="尽职调查表" @acceptData="setSurveyImageUrl" uploadid="upload4"></v-multiple-upload>
        </el-form-item>
        <!-- 只支持bmp、jpg、png、gif，大小不超过2M。 -->
        <div class="el-form-item is-required" style="margin-bottom: 0px;">
          <a download :href="template.sbgcngh">
            <span class="el-icon-download" style="line-height: 41px;font-size: 25px;"></span>
            <span style="position: relative;top: -4px;font-size: 12px;">下载、填写、签证、盖章、上传</span>
          </a>
          <label for="address" class="el-form-item__label" style="width: 100px;">承诺公函</label>
        </div>
        <el-form-item label="" prop="letterImageUrl">
          <v-multiple-upload len="1" title="承诺公函" @acceptData="setLetterImageUrl" uploadid="upload5"></v-multiple-upload>
        </el-form-item>
        <br/>
        <el-form-item label="推荐码">
          <el-input v-model="form.recommendId" placeholder="请输入推荐码"></el-input>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import multipleUpload from '@/components/upload/multipleUploadMol';
import ru from '@/config/rules';
import { DECLARE_GET_VALIDATECODE, DECLARE_POST_UPLOAD, EXCEL_SERVER_URL, DECLARE_PUBLICS_POST_DECLARER, PUBLICS_GET_CHECK_CELLPHONE, DECLARE_GET_AREA_TREE } from '@/config/env';
import slz from '@/assets/img/slz.jpg';
import idcar from '@/assets/img/idcar.png';
import idcar2 from '@/assets/img/idcar-2.png';

export default {
  data() {
    return {
      idcar,
      idcar2,
      slz,
      srvUp: DECLARE_POST_UPLOAD,
      template: {
        sbgjzdcb: `${EXCEL_SERVER_URL}/template/sbgjzdcb.docx`,
        sbgcngh: `${EXCEL_SERVER_URL}/template/sbgcngh.docx`,
      },
      errMsg: [],
      buttonName: '验证码',
      isDisabled: false,
      time: 60,
      formInline: {
      },
      provinces: [],
      citys: [],
      towns: [],
      areaform: {
        province: '',
        city: '',
        town: '',
      },
      form: {
        name: '',
        cellphone: '',
        code: '',
        areaCode: '',
        address: '',
        portrait: '',
        idNumber: '',
        idFrontUrl: '',
        idBackUrl: '',
        surveyImageUrl: '',
        letterImageUrl: '',
        recommendId: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' },
        ],
        cellphone: [
          { validator: this.validatePhone, trigger: 'blur' },
          { required: true, message: '请输入手机号码', trigger: 'blur' },
        ],
        province: [
          { validator: this.validateArea, trigger: 'change' },
        ],
        city: [
          { validator: this.validateArea, trigger: 'change' },
        ],
        town: [
          { validator: this.validateArea, trigger: 'change' },
        ],
        areaCode: [
          { required: true, message: '请输入常住区域', trigger: 'change' },
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
        portrait: [
          { required: true, message: '请上传寸照', trigger: 'change' },
        ],
        idNumber: [
          { validator: this.validateIdCard, trigger: 'blur' },
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ],
        idFrontUrl: [
          { required: true, message: '请上传身份证正面', trigger: 'change' },
        ],
        idBackUrl: [
          { required: true, message: '请上传身份证背面', trigger: 'change' },
        ],
        surveyImageUrl: [
          { required: true, message: '请上传尽职调查表', trigger: 'change' },
        ],
        letterImageUrl: [
          { required: true, message: '请上传承诺公函', trigger: 'change' },
        ],
      },
    };
  },
  components: {
    'v-multiple-upload': multipleUpload,
  },
  methods: {
    async getAreaTree() {
      const res = await this.$http.get(DECLARE_GET_AREA_TREE);
      if (res.success) {
        this.provinces = res.data;
      }
    },
    queryCity() {
      this.citys = [];
      this.towns = [];
      this.areaform.city = '';
      this.areaform.town = '';
      this.provinces.forEach((item) => {
        if (item.code === this.areaform.province) {
          this.citys = item.nodes;
        }
      });
      this.setareaCode();
      this.valiArea();
    },
    queryTown() {
      this.towns = [];
      this.areaform.town = '';
      this.citys.forEach((item) => {
        if (item.code === this.areaform.city) {
          this.towns = item.nodes;
        }
      });
      this.setareaCode();
      this.valiArea();
    },
    async validatePhone(rule, value, callback) {
      if (!ru.mPattern.pattern.test(value)) {
        callback(new Error(ru.mPattern.message));
        return;
      }
      const res = await this.$http.get(`${PUBLICS_GET_CHECK_CELLPHONE}${this.form.cellphone}`);
      if (!res.success) {
        callback(new Error(res.data.message));
        return;
      }
      callback();
    },
    validateIdCard(rule, value, callback) {
      if (!ru.cP.pattern.test(value)) {
        callback(new Error(ru.cP.message));
        return;
      }
      callback();
    },
    validateArea(rule, value, callback) {
      if (!this.form.areaCode) {
        callback(new Error('请输入常住区域'));
        return;
      }
      callback();
    },
    valiArea() {
      this.$refs.areaform.validate((valid) => {
        if (valid) {
          return true;
        }
        return false;
      });
    },
    setFrontUrl(d) {
      this.form.idFrontUrl = d;
    },
    setBackUrl(d) {
      this.form.idBackUrl = d;
    },
    setareaCode() {
      this.form.areaCode = this.areaform.town || this.areaform.city || this.areaform.province;
    },
    setPortrait(d) {
      this.form.portrait = d;
    },
    setSurveyImageUrl(d) {
      this.form.surveyImageUrl = d;
    },
    setLetterImageUrl(d) {
      this.form.letterImageUrl = d;
    },
    async onSubmit(formName) {
      this.valiArea();
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post(DECLARE_PUBLICS_POST_DECLARER, this.form);
          if (res.success) {
            this.$router.push('/officer/registerSuccess');
          } else {
            this.isShowSubmit = !this.isShowSubmit;
          }
          return true;
        }
        return false;
      });
    },
    areaHandler(d) {
      this.form.areaCode = d;
    },
    async sendMsg() {
      if (!this.form.cellphone) return;
      const me = this;
      me.isDisabled = true;
      const interval = window.setInterval(() => {
        me.buttonName = me.time;
        me.time -= 1;
        if (me.time < 0) {
          me.buttonName = '重新发送';
          me.time = 10;
          me.isDisabled = false;
          window.clearInterval(interval);
        }
      }, 1000);
      const res = await this.$http.get(`${DECLARE_GET_VALIDATECODE}addDeclarer/${this.form.cellphone}`);
      if (!res.success) {
        this.errMsg.push(res.data.message);
      }
    },
  },
  mounted() {
    this.getAreaTree();
  },
};

</script>
<style lang="scss" scoped>

.bg-blue {
    /*background-color: #409eff;*/
}
.demo-color-box {
    padding: 20px;
    margin: 5px 0;
    height: 74px;
    /*color: #fff;*/
    text-align: center;
    border-bottom: 1px solid #dcdfe6;
}
.r-el-input {
    margin-right: 10px;
    width: 120px;
    vertical-align: top;
}
</style>
<style>
.upload-image > .el-form-item__content {
  margin-left: 0px !important;
}

.submit > .el-form-item__content {
  margin-left: 0px !important;
  text-align: center;
}
.submit .el-form-item__content .el-button--primary {
  width: 80% !important;
}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409EFF;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>
