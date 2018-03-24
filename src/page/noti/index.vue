<template>
  <div>
    <v-lhead ></v-lhead>
    <div class="col-sm-12 container">
      <div class="col-sm-12 bs-example">
        <span class="t_nav"><router-link to="/login">&#12288;首页</router-link>&#12288;>&#12288;系统通知</span>
        <br/>
        <br/>
        <br/>
        <ul>
          <li style="height: 50px; position: relative;"><router-link to="/notid">申报机构申请办事指南　</router-link><span style="display: inline-block;background-color: #fdc5d0;color: #fa607e">new</span><span style="position: absolute;right: 0">2017-12-27</span></li>
          <li style="height: 50px; position: relative;">申报机构申请办事指南　<span style="display: inline-block;background-color: #fdc5d0;color: #fa607e">new</span> <span style="position: absolute;right: 0">2017-12-27</span></li>
          <li style="height: 50px; position: relative;">申报机构申请办事指南　<span style="display: inline-block;background-color: #fdc5d0;color: #fa607e">new</span> <span style="position: absolute;right: 0">2017-12-27</span></li>
          <li style="height: 50px; position: relative;">申报机构申请办事指南  <span style="position: absolute;right: 0">2017-12-27</span></li>
          <li style="height: 50px; position: relative;">申报机构申请办事指南  <span style="position: absolute;right: 0">2017-12-27</span></li>
          <li style="height: 50px; position: relative;">申报机构申请办事指南  <span style="position: absolute;right: 0">2017-12-27</span></li>
          <li style="height: 50px; position: relative;">申报机构申请办事指南  <span style="position: absolute;right: 0">2017-12-27</span></li>
          <li style="height: 50px; position: relative;">申报机构申请办事指南  <span style="position: absolute;right: 0">2017-12-27</span></li>
          <li style="height: 50px; position: relative;">申报机构申请办事指南  <span style="position: absolute;right: 0">2017-12-27</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/logo.png';
import lhead from '@/components/registerHead/lhead';

export default {
  name: 'noti',
  props: {
    value: {
      type: String,
    },
  },
  components: {
    'v-lhead': lhead,
  },
  data() {
    return {
      logo,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
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
    padding: 35px 30px;
    position: relative;
}
.t_nav {
  border-left: #4786ff solid 3px;
  margin-left: -30px;
  /*font-weight: bold;*/
  font-size: 18px;
}
a {
  text-decoration: none;
}
</style>