<template>
    <div>
      <div class="col-sm-12 step_head">
        <img :src="logo" class="step_title_logo"></img>
        <h3 class="step_title">CPS 申报机构自主管理平台</h3>
        <router-link to="/login"><button class="btn dl">登录</button></router-link>
      </div>
      <div class="col-sm-12 sq">
        <div>
          <h3>没有账号的，可申请成为CPS申报机构</h3>
          <router-link to="/step1"><button class="btn ljsq">立即申请</button></router-link>
        </div>
      </div>
    </div>
</template>

<script>
import logo from '@/assets/img/logo.png';

export default {
  name: 'lhead',
  data() {
    return {
      logo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.step_head {
	height: 80px;
	background-color: #fff;
	border: 1px solid #D2D2D2;
	padding: 10px;
  margin: 0;
}
.step_title_logo {
	margin-left: 60px;height: 60px; float: left;
}
.step_title {
	float: left;margin-left: 20px;line-height: 60px;
}

.sq {
  height: 165px;height: 165px;padding: 30px 60px;
}

.sq > div {
  height: 100px;background-color: #4786ff;border-radius: 10px;
}

.sq > div > h3 {
  float: left;margin-left: 100px;line-height: 64px;color: #fff;line-height: 100px;
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
.dl {
    width: 110px;
    margin: auto;
    color: #fff;
    border-color: rgb(1, 200, 83);
    background-color: rgb(1, 200, 83);
    position: absolute;
    right: 170px;
    top: 24px;
}
.ljsq {
    width: 150px;
    margin: auto;
    color:#fff;
    border-color: #fff;
    position: absolute;
    right: 170px;
    top: 65px;
}
</style>