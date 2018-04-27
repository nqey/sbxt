<template>
  <div>
    <v-register-head :step="3"></v-register-head>
    <div class="step_more">
       <div class="step_chunk">
          <div class="text-center step_zccg">
          <div>
            <img :src="sh"></img>
          </div>
          <br/>
          <br/>
          <h4>基本信息审核中...</h4>
          <br/>
          <br/>
          <p style="font-size:16px; line-height: 35px;">审核时间大概在1-2个工作日，请耐心等待。等待过程中你可以登陆账号查看审核结果</p>
          <p style="margin-bottom: 80px; font-size:16px;line-height: 35px;">审核最终结果也会以短信方式发送至您注册的手机号码中，请留意查阅。</p> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sh from '@/assets/img/sh2.png';
import registerHead from '@/components/header/registerHead';

export default {
  name: 'step3',
  data() {
    return {
      sh,
    };
  },
  components: {
    'v-register-head': registerHead,
  },
};
</script>

<style lang="scss" scoped>
.step_more{padding: 250px 60px 50px;background: #f6f7fb;}
.step_chunk{background:#fff; padding: 40px 40px 55px;border-radius: 4px; box-shadow: 0px 20px 20px -20px #ddd;}
.step_zccg{padding: 7% 0;}
</style>