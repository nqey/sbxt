<template>
  <div style="background-color: rgb(0, 106, 236);">
      <div class="wrap">
        <div style="text-align:center;"><img :src="logo" style="width:90%;margin-top: 5%;"> </div>
        <div class="js-ajax-form" id="login-form" style="margin-top: 10%;">
          <div style="background: #fff;height: 280px;width: 84%;border-radius: 12px; margin:auto;">
            <div class="login">
              <ul>
                <li>
                  <input class="input valid" name="username" type="text"  placeholder="用户名" title="用户名" v-model="username">
                </li>
                <li>
                  <input class="input valid" name="password" type="password" placeholder="密码" title="密码" v-model="password">
                </li>
                <li>
                  <ul class="logo_yzm">
                    <li>
                      <input class="input" type="text" v-model="checknumber" name="checknumber" placeholder="请输入验证码">
                    </li>
                    <li class="verifycode-wrapper"> <img :src="yzx" alt="点击更换验证码" width="112" height="45" @click="yzm"> </li>
                  </ul>
                </li>
              </ul>
              <div id="login_btn_wraper">
                <button class="btn js-ajax-submit" @click="login">{{lo}}</button>
                <span style="color: red" v-show="showTishi">{{tishi}}</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import cookie from '@/components/tool/cookie';
import utils from '@/components/tool/utils';
import logo from '@/assets/img/ZHS-logo.png';
import axios from 'axios';
import Global from '@/components/tool/Global';

export default {
  name: 'login',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      username: '',
      password: '',
      checknumber: '',
      showTishi: false,
      tishi: '',
      lo: '登录',
      logo,
      yzx: `${Global.CHECKNUMBER}${new Date().getTime()}&domain=${Global.DOMAIN}`,
    };
  },
  methods: {
    login() {
      if (this.username === '' || this.password === '') {
        this.tishi = '请输入用户名和密码';
        this.showTishi = true;
      } else if (this.checknumber === '') {
        this.tishi = '请输入验证码';
        this.showTishi = true;
      } else {
        const params = {
          username: this.username,
          password: this.password,
          checknumber: this.checknumber,
        };
        axios.post(Global.DECLARE_LOGIN_DO_ADDRESS,
         utils.toFormData(params),
        ).then((res) => {
          this.lo = '正在登录...';
          if (res.data.code === 0) {
            this.showTishi = false;
            cookie.setCookie('username', this.username, 1000 * 60);
            cookie.setCookie('sb_token', res.data.data.token, 1000 * 60);
            setTimeout(() => { this.$router.push('/search'); }, 1000);
          } else {
            this.lo = '登录';
            this.tishi = res.data.message;
            this.showTishi = true;
          }
        });
      }
    },
    yzm() {
      this.yzx = `${Global.CHECKNUMBER}${new Date().getTime()}&domain=${Global.DOMAIN}`;
    },
  },
};
</script>

<style scoped>
/*登录相关*/
/*-----------------------------------------------------------------------*/
#login_btn_wraper .tips_error {
  display: block;
}
#login_btn_wraper .tips_success {
  display: block;
  color: #4fc1ad;
}
#login_btn_wraper {
  text-align: center;
}
.wrap {
  width: 550px;
  height: 974px;
  overflow: hidden;
  margin: 0 auto;
  padding-top: 130px;
  -webkit-animation: bounceIn 600ms linear;
  -moz-animation: bounceIn 600ms linear;
  -o-animation: bounceIn 600ms linear;
  animation: bounceIn 600ms linear;
}
h1 a {
  display: block;
  height: 50px;
  /* width: 398px; */
  margin: auto;
  overflow: hidden;
  color: #fff;
  font-size: 30px;
  /* font-weight: normal; */
  text-align: center;
  text-decoration: none; /* line-height: 50px; */
}
.login ul, .login li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.login ul {
  background: #fff;
  /*box-shadow:1px 1px 1px #ccc;*/
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 15px;
  width: 350px;
  margin: auto;
  overflow: hidden;
  padding: 25px 0;
}
.logo_yzm li {
  width: 50%;
  float: left;
  border: none !important;
}
.logo_yzm {
  border-bottom: 1px solid #d3d4d4;
  padding: 0 !important;
}
.login li {
  border-bottom: 1px solid #d3d4d4;
  height: 50px;
  line-height: 50px;
}
.login .verifycode-wrapper {
  padding: 0px;
}
.login li img {
  vertical-align: top;
  padding-top: 4px;
}
.login .input {
  width: 100%;
  padding: 7px;
  vertical-align: middle;
  border: 0 none;
  color: #000000;
  background: transparent;
  font-size: 17px; /* font-family: Arial,"Microsoft Yahei";*/
}
.login .input:focus {
  outline: 0 none;
}
.placeholder {
  color: #999;
}

/*登录框动画*/
@-webkit-keyframes bounceIn {
 0% {
 opacity: 0;
 -webkit-transform: scale(.3);
}
 50% {
 opacity: 1;
 -webkit-transform: scale(1.05);
}
 70% {
 -webkit-transform: scale(.9);
}
 100% {
 -webkit-transform: scale(1);
}
}
 @-moz-keyframes bounceIn {
 0% {
 opacity: 0;
 -moz-transform: scale(.3);
}
 50% {
 opacity: 1;
 -moz-transform: scale(1.05);
}
 70% {
 -moz-transform: scale(.9);
}
 100% {
 -moz-transform: scale(1);
}
}
 @-o-keyframes bounceIn {
 0% {
 opacity: 0;
 -o-transform: scale(.3);
}
 50% {
 opacity: 1;
 -o-transform: scale(1.05);
}
 70% {
 -o-transform: scale(.9);
}
 100% {
 -o-transform: scale(1);
}
}
 @keyframes bounceIn {
 0% {
 opacity: 0;
 transform: scale(.3);
}
 50% {
 opacity: 1;
 transform: scale(1.05);
}
 70% {
 transform: scale(.9);
}
 100% {
 transform: scale(1);
}
}
.vt {
  vertical-align: top !important;
}
a:hover {
  color: #33a8ff;
}
</style>