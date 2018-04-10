<template>
  <div>
    <div class="bs-example">
      <span class="t_nav">&#12288;帐号更新</span>
      <br/>
      <br/>
      <br/>
      <div style="width: 100%;text-align: center;">
      <div style="display: inline-block;width: 50px;height: 50px;border-radius: 25px;border: #01c853 1px solid;">
          <span class="glyphicon glyphicon-ok" style="line-height: 50px;font-size: 20px; color:  #01c853"></span>
      </div>
      <br/>
      <br/>
      <p>更新成功</p>
      <br/>
      <br/>
      <router-link to="/user/list"><button class="btn ljsq">返回列表</button></router-link>
      </div>
    </div>
   </div>
</template>

<script>

export default {
  name: 'msg',
};
</script>

<style lang="scss" scoped>

.bs-example {
    position: relative;
    top: 120px;
    left: 275px;
    margin: 0;
    width: 84%;
    background-color: #fff;
    border: 1px solid #ddd;
    -webkit-border-top-left-radius: 4px;
    -webkit-border-top-right-radius: 4px;
    -moz-border-radius-topleft: 4px;
    -moz-border-radius-topright: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
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
.txr {
  text-align: right;
}
.txc {
  text-align: center;
}
.iw {
  width: 300px;
}
.iw600 {
  width: 600px;
}
.label_height {
  line-height: 35px;
}
.imb {
  margin-bottom: 30px;
}
.info {
  color: #ac2925;
}
.areafc {
  color: #999;
}
.js-ajax-submit {
    width: 150px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
}
.ljsq {
    width: 150px;
    margin: auto;
    color:#333;
    border: 1px #999 solid;
    background: #fff;
}
</style>
