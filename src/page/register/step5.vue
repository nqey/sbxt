<template>
  <div>
    <v-register-head :step="5"></v-register-head>
    <div class="row">
      <div class="col-sm-12 container">
        <div class="col-sm-12 bs-example content">
          <div>
            <img :src="sh"></img>
          </div>
          <br/>
          <br/>
          <p>登记表信息审核中...</p>
          <br/>
          <br/>
          <p>审核时间大概在1-2个工作日，请耐心等待。等待过程中你可以登陆账号查看审核结果</p>
          <p>审核最终结果也会以短信方式发送至您注册的手机号码中，请留意查阅。</p> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sh from '@/assets/img/sh.png';
import registerHead from '@/components/header/registerHead';

export default {
  name: 'step5',
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
.content {
  text-align: center;font-size: 18px;
}
</style>