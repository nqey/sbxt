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
          <div class="col-sm-12 txc">
            <router-link to="/step2/1"><button class="btn btn-success">下一步</button></router-link>
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
</style>