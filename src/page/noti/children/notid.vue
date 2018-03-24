<template>
  <div>
    <v-lhead ></v-lhead>
    <div class="col-sm-12 container">
        <div class="col-sm-12 bs-example">
            <span class="t_nav"><router-link to="/login">&#12288;首页</router-link>&#12288;>&#12288;
            <router-link to="/noti">系统通知</router-link>&#12288;>&#12288;详情</span>
    		<br/>
            <br/>
            <br/>
            <div class="col-sm-12" style="text-align: center;">
                <h3>申报机构申请办事指南</h3>
                <span style="line-height: 60px">2017-12-27</span>
        		<br/>
        		    本周认证部没有具体工作任务，本人9号10号协助、配合项目部完成数据库培训流程实操演练及细节修正。 11号针对技术培训涉 拷贝
            </div>
            <div class="col-sm-12" style="padding: 30px;text-align: center;">
                <router-link to="/noti"><button class="btn fh">返回</button></router-link>
            </div>
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
.fh {
    width: 150px;
    margin: auto;
    color:#888;
    border-color: #888;
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