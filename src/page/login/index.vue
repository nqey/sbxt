<template>
  <div>
    <!-- 波浪特效开始 -->
    <div class="waveWrapper waveAnimation">
      <div class="waveWrapperInner bgTop">
        <div class="wave waveTop" :style="waveTopd"></div>
      </div>
      <div class="waveWrapperInner bgMiddle">
        <div class="wave waveMiddle" :style="waveMiddled"></div>
      </div>
      <div class="waveWrapperInner bgBottom">
        <div class="wave waveBottom" :style="waveBottomd"></div>
      </div>
    </div>
    <!-- 波浪特效结束 -->
    <!-- 登录内容开始 -->
   
    <div class="content">
      <div class="container">
        <div class="row clearfix">
      <!-- 申报机构logo和说明 开始 -->
      <div class="col-sm-6 caption">
        <img :src="logo"></img>
        <h2>CPS 申报机构</h2>
        <p style="line-height: 25px; margin-top: 20px;">
          申报机构是依法筛选和推荐符合标准的生产企业，使其获<br />
          得中国商品诚信数据库项目扶持资金补贴，隶属于中国商<br />品诚信数据库服务中心，须忠实执行中国商品诚信数据库<br />的筛选标准、全心全意为消费者服务。</p>
        <br/>
        <br/>
        <router-link to="/step1"><button class="btn">立即申请</button></router-link>
      </div>
      <!-- 申报机构logo和说明 结束 -->
      <!-- 登录框 开始 -->
      <div class="col-sm-6" style="position: relative;text-align: center;">
        <div  class="loginContent pull-right">
          <div class="login">
            <h3 class="loginTitle">CPS申报机构自主管理平台登录</h3>
            <ul>
              <li>
                <input class="input valid" name="username" type="text" placeholder="请输入帐号" title="用户名"  v-model="username">
              </li>
              <li>
                <input class="input valid" name="password" type="password" placeholder="请输入密码" title="密码" v-model="password">
              </li>
              <li>
                <ul class="logo_yzm">
                  <li>
                    <input class="input" type="text" name="checknumber" placeholder="请输入验证码"  v-model="checknumber">
                  </li>
                  <li class="verifycode-wrapper"> 
                    <img id="imgVerify" :src="yzx" alt="点击更换验证码" width="112" height="45" @click="yzm">
                  </li>
                </ul>
              </li>
            </ul>
            <div class="row">
              <div class="col-sm-6">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" value="" @click="jzzh">记住帐号
                  </label>
                </div>
              </div>
              <div class="col-sm-6">
                <router-link to="/password/reset"><span style="line-height:40px;font-size:12px;">忘记密码？</span></router-link>
              </div>
            </div>
            <div id="login_btn_wraper">
              <button id="submit-login" class="btn js-ajax-submit" @click="login">{{lo}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
      <!-- 登录框 结束 -->
      <!-- 公告 开始 -->
     <div class="container announcement">
      <div class="announcement_bj">
      <div class="row clearfix">
        <div class="col-sm-2 clearfix">
          <span class="glyphicon glyphicon-volume-up pull-left" style="color: #4e99ff; font-size: 14px; margin-right: 10px; margin-top: 2px;"></span> 系统公告
        </div>
        <div class="col-sm-8">
          <router-link :to="'/sys/msg/detail/'+sysMsgId" style="color:#464646;">{{sysMsgTitle}}</router-link>
        </div>
        <div class="col-sm-2 text-right">
          <router-link to="/sys/msg/list" style="color: #01c853;">更多<span class="glyphicon glyphicon-menu-right" style="font-size: 12px;"></span></router-link>
        </div>
      </div>
    </div>
    </div>
      <!-- 公告 结束 -->
      <!-- 查看详情 开始 -->
      <div class="container">
      <div class="col-sm-4 seeDetails">
        <div class="seeDetailsLogo1">
          <img :src="sbxt"></img>
        </div>
        
        <h4>申报机构</h4>
        <p>邀约并协助生产型企业完成申报工作，对 企业讲解中国商品诚信数据库，让企业充 分了解入库的必要性。</p>
        
        <router-link to="/agency/1"><button class="btn ckxq">查看详情</button></router-link>
      </div>
      <div class="col-sm-4 seeDetails">
        <div class="seeDetailsLogo2">
          <img :src="sjglzx"></img>
        </div>
       
        <h4>市级管理中心</h4>
        <p>邀约并协助生产型企业完成申报工作，对 企业讲解中国商品诚信数据库，让企业充 分了解入库的必要性，并管理当市企业。</p>
       
        <router-link to="/agency/2"><button class="btn ckxq">查看详情</button></router-link>
      </div>
      <div class="col-sm-4 seeDetails">
        <div class="seeDetailsLogo3">
          <img :src="ssjglzx"></img>
        </div>
        
        <h4>省级服务中心</h4>
        <p>邀约并协助生产型企业完成申报工作，对 企业讲解中国商品诚信数据库，让企业充 分了解入库的必要性，并管理当省企业。</p>
        
        <router-link to="/agency/3"><button class="btn ckxq">查看详情</button></router-link>
      </div>
      </div>
      <!-- 查看详情 结束 -->
      <!-- 页脚 开始 -->
      <div class="lFooter">
      <div class="container">
        <div class="col-sm-6">
          <a>关于我们</a>
          <a>服务协议</a>
          <a>联系我们</a>
          <a>官网网站</a>
          <a>企业入库</a>
        </div>
        <div class="col-sm-6 text-right">
          <small>版权所有 @中国商品诚信数据库技术服务中心 ALL Rights Reserved 蜀ICP备16015082号-2 </small>
        </div>
      </div>
    </div>
      <!-- 页脚 结束-->
    </div>
     <!-- 登录内容结束 -->
  </div>
</template>

<script>
import { setCookie, getCookie } from '@/config/cookie';
import logo from '@/assets/img/logo.png';
import zhs from '@/assets/img/ZHS.png';
import sbxt from '@/assets/img/sbxt.png';
import sjglzx from '@/assets/img/sjglzx.png';
import ssjglzx from '@/assets/img/ssjglzx.png';
import waveTop from '@/assets/img/wave-top.png';
import waveMiddle from '@/assets/img/wave-mid.png';
import waveBottom from '@/assets/img/wave-bot.png';
import { CHECKNUMBER, DOMAIN, DECLARE_LOGIN, PUBLICS_GET_NOTICES_NEWEST } from '@/config/env';

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      checknumber: '',
      showTishi: false,
      tishi: '',
      lo: '登录',
      logo,
      sbxt,
      sjglzx,
      ssjglzx,
      yzx: `${CHECKNUMBER}${new Date().getTime()}&domain=${DOMAIN}`,
      note: {
        backgroundImage: `url(${zhs})`,
      },
      waveTopd: {
        backgroundImage: `url(${waveTop})`,
      },
      waveMiddled: {
        backgroundImage: `url(${waveMiddle})`,
      },
      waveBottomd: {
        backgroundImage: `url(${waveBottom})`,
      },
      sysMsgTitle: '',
      sysMsgId: '',
    };
  },
  methods: {
    async init() {
      this.username = getCookie('username');
      const res = await this.$xhr('get', PUBLICS_GET_NOTICES_NEWEST);
      if (res.data.code === 0) {
        this.sysMsgId = res.data.data.id;
        this.sysMsgTitle = res.data.data.title;
      }
    },
    async login() {
      const data = {
        username: this.username,
        password: this.password,
        checknumber: this.checknumber,
      };
      this.lo = '正在登录...';
      const res = await this.$xhr('post', DECLARE_LOGIN, data);
      if (res.data.code === 0) {
        setCookie('username', this.username, 1000 * 60);
        setCookie('sb_token', res.data.data.token, 1000 * 60);
        setCookie('rule', res.data.data.rule, 1000 * 60);
        setCookie('state', res.data.data.state, 1000 * 60);
        if (res.data.data.state === 'baseWaitSubmit') {
          this.$router.push('/step2/1');
        } else if (res.data.data.state === 'baseWaitPending' || res.data.data.state === 'baseWaitAudit' || res.data.data.state === 'baseWaitPended') {
          this.$router.push('/step3');
        } else if (res.data.data.state === 'baseWaitUnPending' || res.data.data.state === 'baseUnPass') {
          this.$router.push('/step2/2');
        } else if (res.data.data.state === 'registWaitSubmit') {
          this.$router.push('/step4/1');
        } else if (res.data.data.state === 'registWaitAudit' || res.data.data.state === 'registWaitPended' || res.data.data.state === 'registWaitPending') {
          this.$router.push('/step5');
        } else if (res.data.data.state === 'registUnPass' || res.data.data.state === 'registWaitUnPending') {
          this.$router.push('/step4/2');
        } else {
          this.$router.push('/index');
        }
      } else {
        this.lo = '登录';
      }
    },
    yzm() {
      this.yzx = `${CHECKNUMBER}${new Date().getTime()}&domain=${DOMAIN}`;
    },
    jzzh() {
      setCookie('username', this.username, 1000 * 60);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

@keyframes move_wave {
    0% {
        transform: translateX(0) translateZ(0) scaleY(1)
    }
    50% {
        transform: translateX(-25%) translateZ(0) scaleY(0.55)
    }
    100% {
        transform: translateX(-50%) translateZ(0) scaleY(1)
    }
}
.waveWrapper {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
}
.waveWrapperInner {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 560px;
    top: -1px;
    background-image: linear-gradient(to right,  rgb(73,43,253) , rgb(51,141,255)); /* 标准的语法 */
}
.bgTop {
    z-index: 15;
    opacity: 0.5;
}
.bgMiddle {
    z-index: 10;
    opacity: 0.75;
}
.bgBottom {
    z-index: 5;
}
.wave {
    position: absolute;
    left: 0;
    width: 200%;
    height: 100%;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;
}
.waveTop {
    background-size: 50% 100px;
}
.waveAnimation .waveTop {
  animation: move-wave 3s;
   -webkit-animation: move-wave 3s;
   -webkit-animation-delay: 1s;
   animation-delay: 1s;
}
.waveMiddle {
    background-size: 50% 120px;
}
.waveAnimation .waveMiddle {
    animation: move_wave 10s linear infinite;
}
.waveBottom {
    background-size: 50% 100px;
}
.waveAnimation .waveBottom {
    animation: move_wave 15s linear infinite;
}
.content {
  position: absolute;width: 100%;top:70px;height: 400px;z-index: 16;
}
.caption {
  color: #fff;
}
.loginContent {
  background: #fff;height: 350px;width: 410px;border-radius: 12px;
}
.loginTitle {
  position: relative;line-height:60px;background:#f5f9fc;border-radius: 12px 12px 0 0;
}
.announcement {
  margin-top: 200px
}
.announcement_bj{ background: #f5f9fc; padding: 18px 28px;border-radius: 6px;}
.seeDetails {
  margin-top: 80px;text-align: center;
  h4{ color: #505050; margin: 30px 0 20px 0;}
  p{ padding:0 30px; line-height: 25px; color: #666666;}
}
.seeDetailsLogo3 {
  display: inline-block;width: 60px;height: 60px;border-radius: 30px;background-color: #fedfe5;padding-top: 15px;text-align: center;
}
.seeDetailsLogo2 {
  display: inline-block;width: 60px;height: 60px;border-radius: 30px;background-color: #fff0db;padding-top: 15px;text-align: center;
}
.seeDetailsLogo1 {
  display: inline-block;width: 60px;height: 60px;border-radius: 30px;background-color: #d8e6ff;padding-top: 15px;text-align: center;
}
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 12px;
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
.login .input {
    width: 100%;
    padding: 7px;
    vertical-align: middle;
    border: 0 none;
    color: #000000;
    background: transparent;
    font-size: 17px;
}
.lFooter {
  margin-top: 90px;height: 80px; background: #f5f9fc; line-height: 80px;
  a{ color: #666666;padding-right: 15px}
  small {
    color: rgb(153, 153, 153)
  }
}
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

.login ul, .login li {
    padding: 0;
    margin: 0;
    list-style: none;
}
.login ul {
    background: #fff;
    overflow: hidden;
    margin-bottom: 15px;
    width: 350px;
    margin: auto;
    overflow: hidden;
    padding: 15px 0;
}
.logo_yzm li {
    width: 50%;
    float: left;
    border: none !important;
}
.logo_yzm {
    border-bottom: 1px solid #efefef;
    padding: 0 !important;
}
.login li {
    border-bottom: 1px solid #efefef;
    height: 50px;
    line-height: 50px;
}
.login .verifycode-wrapper {
    padding:5px 0;
    text-align: right;
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
    font-size: 14px; 
}
.login .input:focus {
    outline: 0 none;
}
.placeholder {
    color: #999;
}
.js-ajax-submit {
    width: 350px;
    margin:10px auto;
    padding: 8px;
    color:#fff;
    background: rgb(1, 200, 83);
}
.ckxq {
    width: 130px;
    margin:20px auto;
    color:rgb(1, 200, 83);
    border-color: rgb(1, 200, 83);
}
</style>