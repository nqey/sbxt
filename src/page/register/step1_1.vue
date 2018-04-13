<template>
  <div>
    <v-register-head :step="1"></v-register-head>
    <div class="row">
      <div class="col-sm-12" style="padding: 0px 55px;">
        <div class="col-sm-12 bs-example">
          <div class="col-sm-12" style="text-align: center;">
            <br/>
            <br/>
            <div style="display: inline-block;width: 50px;height: 50px;border-radius: 25px;border: #01c853 1px solid;">
              <span class="glyphicon glyphicon-ok" style="line-height: 50px;font-size: 20px; color:  #01c853"></span>
            </div>
            <br/>
            <br/>
            <p>恭喜你注册帐号成功</p>
            <br/>
            <br/>
          </div>
          <div class="col-sm-12" style="text-align: center;">
            <router-link to="/step2/1"><button class="btn js-ajax-submit">下一步</button></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import registerHead from '@/components/header/registerHead';

export default {
  name: 'step11',
  components: {
    'v-register-head': registerHead,
  },
};
</script>

<style lang="scss" scoped>
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
    padding: 60px 30px;
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
.js-ajax-submit {
    width: 350px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
}
</style>