<template>
    <div class="row">
      <div class="col-sm-12 step_head">
        <img :src="logo" class="step_title_logo"></img>
        <h3 class="step_title">CPS 申报机构自主管理平台</h3>
      </div>
    </div>
</template>

<script>
import logo from '@/assets/img/logo.png';

export default {
  name: 'rhead',
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
	box-shadow: 1px 1px 3px #aaaaaa;
	padding: 10px;
}
.step_title_logo {
	margin-left: 60px;height: 60px; float: left;
}
.step_title {
	float: left;margin-left: 20px;line-height: 60px;
}
</style>