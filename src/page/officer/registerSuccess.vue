<!-- 申报官自主注册，登记到默认申报机构<中国商品诚信数据库> -->
<template>
  <div>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <header>
      <div class="beijin">
        <div>
          <p>申报官注册</p>
        </div>
      </div>
      <ul class="scene">
        <li class="layer" data-depth="0.2"></li>
      </ul>
    </header>
    <div class="container">
      <div class="shenhe"><img src="../../assets/img/sh_ico.png"/>
        <div>
          <p>审核中...</p>
          <p>您提交的资料进入审核阶段，<br/>
            审核结果将以短信的方式告知</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'addOfficer',
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  .scene {
    width: 100%;
    height: 300px;
  }

  .scene > li {
    width: 100%;
    height: 100%;
    background: url(../../assets/img/officer_register_banner.jpg);
  }

  .beijin {
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
  }

  .beijin > div {
    width: 50%;
    height: auto;
    position: absolute;
    z-index: 20;
    top: 25%;
    left: 25%;
    color: #fff;
    font-size: 30px;
    text-align: center;
    line-height: 48px;
  }
  .shenhe {
    padding: 70px 10px;
    text-align: center;
  }

  .shenhe img {
    padding-bottom: 10px;
  }

  .shenhe > div p:nth-child(1) {
    color: #000;
    font-size: 20px;
    text-align: center;
    padding: 15px 0;
  }

  .shenhe > div p:nth-child(2) {
    color: #000;
    font-size: 12px;
    text-align: center;
    line-height: 22px;
    padding-bottom: 40px;
  }
</style>
