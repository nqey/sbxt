<template>
  <div>
    <v-registerhead :step="3"></v-registerhead>
    <div class="row">
      <div class="col-sm-12 container">
        <div class="col-sm-12 bs-example content">
          <div>
            <img :src="sh"></img>
          </div>
          <br/>
          <br/>
          <p>基本信息审核中...</p>
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
import sh from '@/assets/img/sh2.png';
import registerHead from '@/components/registerHead';

export default {
  name: 'step3',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      sh,
    };
  },
  components: {
    'v-registerhead': registerHead,
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
.container {
  padding: 0px 55px;
}
.content {
  text-align: center;font-size: 18px;
}
</style>