<template>
  <div>
    <v-password-head></v-password-head>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div>
      <div class="col-sm-12 container">
        <div class="col-sm-12 bs-example">
          <div class="col-sm-12 txc">
            <h2>修改密码</h2>
            <br/>
            <p>* 每一个手机号码仅能生成一个帐号</p>
          </div>
          <div class="col-sm-12" style="position: relative;height: 370px;">
            <div style="position: relative;width: 400px;margin: 0 auto;">
              <div class="jg">
                <small>作为登录帐号，请填写未被其他人或企业注册的手机号码</small>
                <label>手机号码：&#12288;&#12288;</label>
                <input type="text" class="form-control input-w-250" v-model="cellphone" @blur="validate"></input>
              </div>
              <div class="jg">
                <small>密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间</small>
                <label>输入密码：&#12288;&#12288;</label>
                <input type="password" class="form-control input-w-250" v-model="password" @blur="validate"></input>
              </div>
              <div class="jg">
                <small>请再次输入密码</small>
                <label>确认密码：&#12288;&#12288;</label>
                <input type="password" class="form-control input-w-250" v-model="repassword"  @blur="validate"></input>
              </div>
              <div class="jg">
                <label>验 证 码：&#12288;&#12288;</label>
                <input type="text" class="form-control input-w-175 " style="margin-left: 6px;" v-model="code"></input>
                <button v-show="show" class="btn btn-verification-code"  @click="getCode">获取验证码</button>
                <button v-show="!show" class="btn btn-verification-code">{{count}} s</button>
              </div>
  `          </div>
          </div>
          <div class="col-sm-12 txc">
            <button v-show="isShowSubmit" type="button" class="btn btn-success" @click="submit">提交</button>
            <button v-show="!isShowSubmit" type="button" class="btn btn-success" disabled>提交</button>
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
      // 密码再输入验证
      if (this.password !== this.repassword) {
        this.errMsg.push(rules.iPwMsg);
      }
    },
    validate2() {
      this.validate();
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
      const res = await this.$xhr('get', `${DECLARE_GET_VALIDATECODE}find/${this.cellphone}`);
      if (!res.data.code === 0) {
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
      const res = await this.$xhr('post', DECLARE_PUT_PASSWORD, param);
      if (res.data.code === 0) {
        this.$router.push('/password/reset/msg');
      } else {
        this.isShowSubmit = !this.isShowSubmit;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
small {
  position: absolute;top: 35px;left: 88px;color: #888888;
}
.jg {
  position: relative;height: 100px;
}
.input-w-250 {
  width: 250px;
  height: 27px;
  display: inline;
}
.input-w-175 {
  width: 160px;
  height: 27px;
  display: inline;
}
</style>