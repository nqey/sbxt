<template>
    <div>
      <div class="col-sm-12 step_head">
        <img :src="logo" class="step_title_logo"></img>
        <h3 class="step_title">CPS 申报机构自主管理平台</h3>
      </div>
      <div class="col-sm-12 step_main">
        <div class="step_content">
          <div class="col-sm-1"></div>
          <div :class="{ step_top: true, step_selected: isStep1, 'col-sm-2': true }">
            <span class="stepIcon">1</span>
            <span class="stepFont">　注册帐号　———— </span>
          </div>
          <div :class="{ step_top: true, step_selected: isStep2, 'col-sm-2': true }">
            <span class="stepIcon">2</span>
            <span class="stepFont">　基本信息　———— </span>
          </div>
          <div :class="{ step_top: true, step_selected: isStep3, 'col-sm-2': true }">
            <span class="stepIcon">3</span>
            <span class="stepFont">　审核　———— </span>
          </div>
          <div :class="{ step_top: true, step_selected: isStep4, 'col-sm-2': true }">
            <span class="stepIcon">4</span>
            <span class="stepFont">　填表登记　———— </span>
          </div>
          <div :class="{ step_top: true, step_selected: isStep5, 'col-sm-2': true }">
            <span class="stepIcon">5</span>
            <span class="stepFont">　审核</span>
          </div>
          <div class="col-sm-1"></div>
        </div>
      </div>
    </div>
</template>

<script>
import logo from '@/assets/img/logo.png';

export default {
  name: 'registerHead',
  props: ['step'],
  data() {
    return {
      logo,
      isStep1: false,
      isStep2: false,
      isStep3: false,
      isStep4: false,
      isStep5: false,
    };
  },
  components: {},
  methods: {},
  mounted() {
    if (this.step === 1) {
      this.isStep1 = true;
    } else if (this.step === 2) {
      this.isStep2 = true;
    } else if (this.step === 3) {
      this.isStep3 = true;
    } else if (this.step === 4) {
      this.isStep4 = true;
    } else if (this.step === 5) {
      this.isStep5 = true;
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.step_head {
	height: 80px;
	background-color: #fff;
	border-bottom: 1px solid #D2D2D2;
	padding: 10px;
  margin: 0;
}
.step_title_logo {
	margin-left: 60px;height: 60px; float: left;
}
.step_title {
	float: left;margin-left: 20px;line-height: 60px;
}
.step_main {
	height: 165px;height: 165px;padding: 30px 60px;
}
.step_content {
    height: 100px;background-color: #4786ff;border-radius: 10px;position: relative;
}
.stepIcon {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: white;
    text-align: center;
    color: #4786ff;
    display: inline-block;
    line-height: 30px;
}
.stepFont {
    color: #fff;
    font-size: 18px;
}
.step_top {
	top: 40px;
	opacity: 0.5;
}
.step_selected {
    opacity: 1;
}
</style>