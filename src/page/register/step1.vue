<template>
  <div>
    <v-registerhead :step="1"></v-registerhead>
    <v-errinfo :errMsg="errMsg"></v-errinfo>
    <div>
      <div class="col-sm-12 container">
        <div class="col-sm-12 bs-example">
          <div class="col-sm-12 txc">
            <h2>注册帐号</h2>
            <p>* 每一个手机号码仅能生成一个帐号</p>
          </div>
          <div class="col-sm-12" style="position: relative;height: 370px;">
            <div style="position: relative;width: 400px;margin: 0 auto;">
              <div class="jg">
                <small class="sfts">作为登录帐号，请填写未被其他人或企业注册的手机号码</small>
                <span class="fts">手机号码　</span>
                <input type="text" class="loginI" v-model="cellphone" @blur="validate"></input>
              </div>
              <div class="jg">
                <small class="sfts">密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间</small>
                <span class="fts">输入密码　</span> <input type="password" class="loginI" v-model="password" @blur="validate"></input>
              </div>
              <div class="jg">
                <small class="sfts">请再次输入密码</small>
                <span class="fts">确认密码　</span> <input type="password" class="loginI" v-model="repassword"  @blur="validate"></input>
              </div>
              <div class="jg">
                <span class="fts">验 证 码　</span> <input type="text" class="loginI" v-model="code"></input>
                <button v-show="show" class="btn hqyzm"  @click="getCode">获取验证码</button>
                <button v-show="!show" class="btn hqyzm">{{count}} s</button>
              </div>
  `          </div>
          </div>
          <div class="col-sm-12 txc">
            <div class="checkbox">
              <label>
                <input type="checkbox" id="blankCheckbox" value="option1" aria-label="..." v-model="agree">
                <span style="line-height: 20px">我同意并遵守<a>《CPS申报机构公共业务平台服务协议》</a></span>
              </label>
            </div>
            <br/>
            <button class="btn js-ajax-submit" @click="submit">注册</button>
            <br/>
            <br/>
            <p>已有申报机构公共业务平台帐号? <router-link to="/login">立即登录</router-link></p>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import registerHead from '@/components/registerHead';
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
    };
  },
  components: {
    'v-registerhead': registerHead,
    'v-errinfo': errInfo,
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
        const res = await this.$xhr('post', DECLARE_POST_ORGANIZ, param);
        if (res.data.code === 0) {
          setCookie('sb_token', res.data.data, 1000 * 60);
          setCookie('username', param.username, 1000 * 60);
          this.$router.push('/step11');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.txc {
  text-align: center;
}
.container {
  padding: 0px 55px;
}
.bs-example {
    background-color: #fff;
    border: 1px solid #ddd;
    -webkit-border-top-left-radius: 4px;
    -webkit-border-top-right-radius: 4px;
    -moz-border-radius-topleft: 4px;
    -moz-border-radius-topright: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin: 15px 0;
    padding: 60px 30px;
    position: relative;
}
.loginI {
  outline: none;
  width: 250px;
  border: none;
} 
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 25px;
    color: #fff;
    width: 180px;
    background-color: rgba(73,43,253,0);
    border-color: rgba(255,255,255,0.7);
}
.js-ajax-submit {
    width: 350px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
}
.hqyzm {
    position: absolute;
    right: 0px;
    top: -5px;
    width: 150px;
    margin: auto;
    color:#4585ff;
    background: #dbe7ff;
}
.fts {
  font-size: 15px;
}
.sfts {
  position: absolute;top: 35px;left: 88px;color: #888888;
}
.jg {
  position: relative;height: 100px;
}

</style>