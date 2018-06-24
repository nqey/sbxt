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
          <v-multiple-upload type="local" len="1" title="寸照" @acceptData="setPortrait" uploadid="upload1"></v-multiple-upload>
          <p v-show="open" @click="open=!open;styleObj.display = 'inline'" style="color: #337ab7;">查看示例图</p>
          <p v-show="!open" @click="open=!open;styleObj.display = 'none'" style="color: #337ab7;">收起示例图</p>
          <img :style="styleObj" :src="slz"></img>
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
          <span @click="toDownload(template.sbgjzdcb, '尽职调查表.docx')" style="color: #337ab7;">
            <span class="el-icon-download bounce" style="line-height: 41px;font-size: 25px;"></span>
            <span style="position: relative;top: -4px;font-size: 12px;">下载尽职调查表</span>
          </span>
          <label for="address" class="el-form-item__label" style="width: 100px;">尽职调查表</label>
        </div>
        <el-form-item label="" prop="surveyImageUrl">
          <v-multiple-upload len="5" title="尽职调查表" @acceptData="setSurveyImageUrl" uploadid="upload4"></v-multiple-upload>
        </el-form-item>
        <!-- 只支持bmp、jpg、png、gif，大小不超过2M。 -->
        <div class="el-form-item is-required" style="margin-bottom: 0px;">
          <span @click="toDownload(template.sbgcngh, '承诺公函.docx')" style="color: #337ab7;">
            <span class="el-icon-download bounce" style="line-height: 41px;font-size: 25px;"></span>
            <span style="position: relative;top: -4px;font-size: 12px;">下载承诺公函</span>
          </span>
          <label for="address" class="el-form-item__label" style="width: 100px;">承诺公函</label>
        </div>
        <el-form-item label="" prop="letterImageUrl">
          <v-multiple-upload len="1" title="承诺公函" @acceptData="setLetterImageUrl" uploadid="upload5"></v-multiple-upload>
        </el-form-item>
        <br/>
        <el-form-item label="推荐人工号" prop="recommendId">
          <el-input v-model="form.recommendId" placeholder="请输入推荐人手机号码" disabled></el-input>
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
import { DECLARE_GET_VALIDATECODE, DECLARE_POST_UPLOAD, EXCEL_SERVER_URL, DECLARE_PUBLICS_POST_DECLARER, PUBLICS_GET_CHECK_CELLPHONE, DECLARE_GET_AREA_TREE, PUBLICS_DECLARER_CHECK_CELLPHONE, PUBLICS_DAYU_GETPHONE } from '@/config/env';
import slz from '@/assets/img/slz.jpg';
import idcar from '@/assets/img/idcar.png';
import idcar2 from '@/assets/img/idcar-2.png';
import { MessageBox } from 'element-ui';

export default {
  data() {
    return {
      open: true,
      styleObj: {
        display: 'none',
        width: '150px',
      },
      idcar,
      idcar2,
      slz,
      srvUp: DECLARE_POST_UPLOAD,
      template: {
        sbgjzdcb: `${EXCEL_SERVER_URL}template/sbgjzdcb.docx`,
        sbgcngh: `${EXCEL_SERVER_URL}template/sbgcngh.docx`,
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
        recommendId: [
          { validator: this.validateRecommendId, trigger: 'blur' },
        ],
      },
    };
  },
  components: {
    'v-multiple-upload': multipleUpload,
  },

  methods: {
    toDownload(src, name) {
      if (!this.is_weixn()) {
        this.funDownload(src, name);
        return;
      }
      const jiantou = '<img style="position: fixed;top: 10px;right: 15px;width: 62px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAABRCAYAAAByg+48AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxZWU1YmZhMi1kZmUxLTEyNDUtYmFmNy1iYTg5NmVhYjVjYTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjZGMDQwQjU3NUU3MTFFOEFDRjg5N0M1RkM4NTE4RUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjZGMDQwQjQ3NUU3MTFFOEFDRjg5N0M1RkM4NTE4RUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzI1MTgzOEQ3NUU2MTFFODk1REVGOTM3NDY3QTVBMzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzI1MTgzOEU3NUU2MTFFODk1REVGOTM3NDY3QTVBMzAiLz4gPC9yZGY6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">';
      const icon = '<span class="glyphicon glyphicon-option-horizontal"></span>';
      const text = `<span style="color: #fff">${jiantou}由于微信不提供下载功能，<br/>请点击上方 ${icon} 使用默认浏览器打开，<br/>再点击下载文件。<br/>下载后打开文件再点击右上方 ${icon} <br/>将文件发送至微信，QQ，邮箱，电脑等工具上，<br/>打印出来，填写，签字，按手印。<br/>拍照，再打开申报官注册进行填写。<br/>如果您觉得不方便，也可以用电脑打开网址 www.cpsdb.org<br/> 点击导航栏右侧‘申报官注册’用电脑填写也可。<br/>如有疑问，请来电咨询：028-85855900</span>`;
      MessageBox({
        title: '提示',
        message: text,
        showCancelButton: false,
        showConfirmButton: true,
        dangerouslyUseHTMLString: true,
        type: 'warning',
      }).then(async () => {
        // this.funDownload(src, name);
      }).catch(() => {
      });
    },
    funDownload(content, filename) {
      // 创建隐藏的可下载链接
      const eleLink = document.createElement('a');
      eleLink.download = filename;
      eleLink.style.display = 'none';
      eleLink.href = content;
      // 字符内容转变成blob地址
      window.console.log(eleLink.href);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },
    is_weixn() {
      return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
    },
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
    async validateRecommendId(rule, value, callback) {
      if (!value) callback();
      if (!ru.mPattern.pattern.test(value)) {
        callback(new Error('请输入正确的工号'));
        return;
      }
      const res = await this.$http.get(`${PUBLICS_DECLARER_CHECK_CELLPHONE}${value}`);
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
      this.getCode();
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
          me.time = 60;
          me.isDisabled = false;
          window.clearInterval(interval);
        }
      }, 1000);
      const res = await this.$http.get(`${DECLARE_GET_VALIDATECODE}addDeclarer/${this.form.cellphone}`);
      if (!res.success) {
        this.errMsg.push(res.data.message);
      }
    },
    async getCode() {
      const res = await this.$http.get(`${PUBLICS_DAYU_GETPHONE}${this.form.idNumber}`);
      if (res.success) {
        this.form.recommendId = res.data;
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
.el-message-box {
  background-color: #333;
  width: 90% !important;
  border: 1px solid #333;
}

@keyframes drop {
  0%   { opacity: 0;}
  30%  { opacity: 1;}
  100% { opacity: 0;}
}
.an {
  animation-name: drop;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-play-state: running;
}
</style>

