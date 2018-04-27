<template>
  <div>
    <v-password-head></v-password-head>
    <div class="step_more">
       <div class="step_chunk">
        <div class="text-center step_zccg">
            <div style="display: inline-block;width: 50px;height: 50px;border-radius: 25px;border: #01c853 1px solid;margin-bottom: 50px;">
              <span class="glyphicon glyphicon-ok" style="line-height: 50px;font-size: 20px; color:  #01c853"></span>
            </div>
             <p style="margin-bottom: 100px; font-size:22px ">密码修改成功！</p>
            <p><b>正在返回首页，请 <router-link to="/login">登录</router-link></b></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vPasswordHead from '@/components/header/passwordHead';

export default {
  name: 'resetPwMsg',
  components: {
    'v-password-head': vPasswordHead,
  },
};
</script>

<style lang="scss" scoped>
.step_more{padding: 120px 60px 50px;background: #f6f7fb;}
.step_chunk{background:#fff; padding: 40px 40px 55px;border-radius: 4px; box-shadow: 0px 20px 20px -20px #ddd;}
.step_zccg{padding: 7% 0;}
</style>