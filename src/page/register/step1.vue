<template>
  <div>
    <v-register-head :step="1"></v-register-head>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div>
      <div class="step_more">
       <div class="step_chunk">
          <div class="txc">
            <h2>注册帐号</h2>
            
            <p style="color: #666666; margin-bottom: 20px;">* 每一个手机号码仅能生成一个帐号</p>
            <br/>
          </div>
          <div class="" style="position: relative;">
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
              <div>
                <label>验 证 码：&#12288;&#12288;</label>
                <input type="text" class="form-control input-w-175 " style="margin-left: 6px; margin-right: 15px;" v-model="code"></input>
                <button v-show="show" class="btn btn-verification-code" style="height: 35px;"  @click="getCode">获取验证码</button>
                <button v-show="!show" class="btn btn-verification-code" style="height: 35px;">{{count}} s</button>
              </div>
           </div>
          </div>
          <div class="txc">
            <div class="checkbox">
              <label>
                <input type="checkbox" id="blankCheckbox" value="option1" aria-label="..." v-model="agree">
                <label style="line-height: 20px">我同意并遵守<a>《CPS申报机构公共业务平台服务协议》</a></label>
              </label>
            </div>
            <br/>
            <button v-show="isShowSubmit" type="button" class="btn btn-success" style="height: 35px;" @click="submit">注册</button>
            <button v-show="!isShowSubmit" type="button" class="btn btn-success" style="height: 35px;" disabled>注册</button>
            <br/>
            <br/>
            <label style="letter-spacing: 1px;">已有申报机构公共业务平台帐号? <router-link to="/login">立即登录</router-link></label>
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
    },
    validate2() {
      this.validate();
      // 密码再输入验证
      if (this.password !== this.repassword) {
        this.errMsg.push(rules.iPwMsg);
      }
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
      await this.$http.get(`${DECLARE_GET_VALIDATECODE}regist/${this.cellphone}`);
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
        const res = await this.$http.post(DECLARE_POST_ORGANIZ, param);
        if (res.success) {
          setCookie('sb_token', res.data, 1000 * 60);
          window.sessionStorage.setItem('username', param.username);
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
.step_more{    padding: 250px 60px 50px;background: #f6f7fb;}
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