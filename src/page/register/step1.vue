<template>
  <div>
    <v-register-head :step="1"></v-register-head>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div>
      <div class="col-sm-12 container">
        <div class="col-sm-12 bs-example">
          <div class="col-sm-12 txc">
            <h2>注册帐号</h2>
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
            <div class="checkbox">
              <label>
                <input type="checkbox" id="blankCheckbox" value="option1" aria-label="..." v-model="agree">
                <label style="line-height: 20px">我同意并遵守<a>《CPS申报机构公共业务平台服务协议》</a></label>
              </label>
            </div>
            <br/>
            <button v-show="isShowSubmit" type="button" class="btn btn-success" @click="submit">注册</button>
            <button v-show="!isShowSubmit" type="button" class="btn btn-success" disabled>注册</button>
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
import registerHead from '@/components/header/registerHead';
import errInfo from '@/components/info/error';
import rules from '@/config/rules';
import { DECLARE_GET_VALIDATECODE, DECLARE_POST_ORGANIZ } from '@/config/env';
import { setCookie } from '@/config/cookie';

export default {
  name: 'step1',
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
      agree: false,
      isShowSubmit: true,
    };
  },
  components: {
    'v-register-head': registerHead,
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
      if (!this.cellphone) {
        this.errMsg.push(`${rules.nonEmpty}${rules.phone}`);
      }
      // 密码强度验证
      if (!this.password) {
        this.errMsg.push(`${rules.nonEmpty}${rules.password}`);
      }
      // 验证码验证
      if (!this.code) {
        this.errMsg.push(`${rules.nonEmpty}${rules.validatecode}`);
      }
      // 同意验证
      if (!this.agree) {
        this.errMsg.push(`${rules.agreeMsg}`);
      }
    },
    async getCode() {
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
      await this.$xhr('get', `${DECLARE_GET_VALIDATECODE}regist/${this.cellphone}`);
    },
    async submit() {
      this.validate2();
      if (this.errMsg.length === 0) {
        const param = {};
        param.username = this.cellphone;
        param.password = this.password;
        param.repassword = this.repassword;
        param.code = this.code;
        this.isShowSubmit = !this.isShowSubmit;
        const res = await this.$xhr('post', DECLARE_POST_ORGANIZ, param);
        if (res.data.code === 0) {
          setCookie('sb_token', res.data.data, 1000 * 60);
          setCookie('username', param.username, 1000 * 60);
          this.$router.push('/step11');
        } else {
          this.isShowSubmit = !this.isShowSubmit;
        }
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