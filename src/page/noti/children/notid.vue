<template>
  <div class="row">
    <div class="col-sm-12" style="height: 80px;background-color: #fff;box-shadow: 1px 1px 3px #aaaaaa;padding: 10px;">
      <img :src="logo" style="margin-left: 60px;height: 60px; float: left;"></img>
      <h3 style="float: left;margin-left: 20px;line-height: 60px;">CPS 申报机构自主管理平台登录</h3>
      <button class="btn dl">登录</button>
    </div>
    <div class="col-sm-12" style="height: 165px;height: 165px;padding: 30px 60px;">
      <div style="height: 100px;background-color: #4786ff;border-radius: 10px;">
        <h3 style="float: left;margin-left: 100px;line-height: 64px;color: #fff;line-height: 100px">没有账号的，可申请成为CPS申报机构</h3>
        <button class="btn ljsq">立即申请</button>
      </div>
    </div>
    <div class="col-sm-12" style="padding: 30px;">
    	<div class="col-sm-12" style="background-color: #fff;box-shadow:-1px -1px 1px #aaaaaa;">
    		<div class="col-sm-12" style="border-left: #4786ff solid 3px;margin-left: -15px;margin-top: 30px">
    			<h4>　　<router-link to="/noti">系统通知</router-link>　>　详情</h4>
    		</div>
    		<br/>
            <div class="col-sm-12" style="text-align: center;">
                <h3>申报机构申请办事指南</h3>
                <span style="line-height: 60px">2017-12-27</span>
        		<br/>
        		    本周认证部没有具体工作任务，本人9号10号协助、配合项目部完成数据库培训流程实操演练及细节修正。 11号针对技术培训涉 拷贝
            </div>
    	</div>
    </div>
    <div class="col-sm-12" style="padding: 30px;text-align: center;">
    	<router-link to="/noti"><button class="btn fh">返回</button></router-link>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/logo.png';

export default {
  name: 'noti',
  props: {
    value: {
      type: String,
    },
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
.fh {
    width: 150px;
    margin: auto;
    color:#888;
    border-color: #888;
}
</style>