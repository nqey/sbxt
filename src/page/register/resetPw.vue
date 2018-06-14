<template>
  <div>
    <v-password-head></v-password-head>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div>
      <div class="step_more">
       <div class="step_chunk">
          <div class="txc">
            <h2>忘记密码</h2>
            <p style="color: #666666; margin-bottom: 20px;">* 每一个手机号码仅能生成一个帐号</p>
            <br/>
          </div>
          <div style="position: relative;">
            <div style="position: relative;width: 440px;margin: 0 auto;">
              <div class="jg">
                <small>作为登录帐号，请填写未被其他人或企业注册的手机号码</small>
                <label>手机号码：&#12288;&#12288;</label>
                <input type="text" class="form-control input-w-250" v-model="cellphone" @blur="validate"></input>
              </div>
              <div class="jg">
                <small>不能使用特殊字符，长度在8-10之间</small>
                <label>输入密码：&#12288;&#12288;</label>
                <input type="password" class="form-control input-w-250" v-model="password" @blur="validate"></input>
              </div>
              <div class="jg">
                <small>请再次输入密码</small>
                <label>确认密码：&#12288;&#12288;</label>
                <input type="password" class="form-control input-w-250" v-model="repassword"></input>
              </div>
              <div class="jg">
                <label>验 证 码：&#12288;&#12288;</label>
                <input type="text" class="form-control input-w-175 " style="margin-left: 6px;" v-model="code"></input>
                <button v-show="show" class="btn btn-verification-code" style="height: 35px;" @click="getCode">获取验证码</button>
                <button v-show="!show" class="btn btn-verification-code" style="height: 35px;">{{count}} s</button>
              </div>
         </div>
          </div>
          <div class="txc">
            <button v-show="isShowSubmit" type="button" class="btn btn-success" style="height: 35px;" @click="submit">提交</button>
            <button v-show="!isShowSubmit" type="button" class="btn btn-success" style="height: 35px;" disabled>提交</button>
            <br/>
            <br/>
            <label>已有申报机构公共业务平台帐号? <router-link to="/login">立即登录</router-link></label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vPasswordHead from '@/components/header/passwordHead';
import errInfo from '@/components/info/error';
import rules from '@/config/rules';
import { DECLARE_GET_VALIDATECODE, DECLARE_PUT_PASSWORD } from '@/config/env';

export default {
  name: 'resetPw',
  data() {
    return {
      cellphone: '',
      password: '',
      repassword: '',
      code: '',
      errMsg: [],
      show: true,
      count: '',
      timer: null,
      infoTimer: null,
      isShowSubmit: true,
    };
  },
  components: {
    'v-password-head': vPasswordHead,
    'v-error-info': errInfo,
  },
  methods: {
    validate() {
      this.errMsg = [];
      // 手机号码验证
      if (this.cellphone !== '' && !rules.mPattern.pattern.test(this.cellphone)) {
        this.errMsg.push(rules.mPattern.message);
      }
      // 密码强度验证
      if (this.password !== '' && !rules.pPattern.pattern.test(this.password)) {
        this.errMsg.push(rules.pPattern.message);
      }
    },
    validate2() {
      this.validate();
      // 密码再输入验证
      if (this.password !== this.repassword) {
        this.errMsg.push(rules.iPwMsg);
      }
      // 手机号码验证
      if (this.cellphone === '') {
        this.errMsg.push(`${rules.nonEmpty}${rules.phone}`);
      }
      // 密码强度验证
      if (this.password === '') {
        this.errMsg.push(`${rules.nonEmpty}${rules.password}`);
      }
      // 验证码验证
      if (this.code === '') {
        this.errMsg.push(`${rules.nonEmpty}${rules.validatecode}`);
      }
    },
    async getCode() {
      this.errMsg = [];
      // 手机号码验证
      if (!rules.mPattern.pattern.test(this.cellphone)) {
        this.errMsg.push(rules.mPattern.message);
        return;
      }
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count -= 1;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
      const res = await this.$http.get(`${DECLARE_GET_VALIDATECODE}find/${this.cellphone}`);
      if (!res.success) {
        this.errMsg.push(res.data.message);
      }
    },
    async submit() {
      this.validate2();
      if (this.errMsg.length !== 0) {
        clearTimeout(this.infoTimer);
        this.infoTimer = setTimeout(() => { this.errMsg = []; }, 3000);
        return;
      }
      const param = {};
      param.cellphone = this.cellphone;
      param.newPassword = this.password;
      param.confirmPassword = this.repassword;
      param.code = this.code;
      this.isShowSubmit = !this.isShowSubmit;
      const res = await this.$http.post(DECLARE_PUT_PASSWORD, param);
      if (res.success) {
        this.$router.push('/password/reset/msg');
      } else {
        this.isShowSubmit = !this.isShowSubmit;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.step_more{    padding: 120px 60px 50px;background: #f6f7fb;}
.step_chunk{ background:#fff; padding: 40px 40px 55px;border-radius: 4px; box-shadow: 0px 20px 20px -20px #ddd;}
small {
  position: absolute;    top: 40px;
    left: 105px;color: #999999;
}
.jg {
  position: relative;height: 90px;
}
.input-w-250 {
  width: 320px;
  height: 35px;
  line-height: 35px;
  border-radius: 20px;
  background: #f7f7f7; border:none;
  display: inline;
}
.input-w-175 {
  width: 180px;
  height: 27px;
  height: 35px;
  line-height: 35px;
  border-radius: 20px;
  background: #f7f7f7; border:none;
  display: inline;
}
</style>