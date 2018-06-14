
<template>
  <div class="content">
    <div class="content_con">
      <div style="width: 100%;height: 300px;text-align: center;">
        <img :src="correct" style="width: 64px;height: 64px;margin: 180px auto 0;">
      </div>
      <div class="money center">申请补贴成功</div>
      <div class="mx center">申请补贴审核时长1-5个工作日，请注意短信或平台消息</div>
      <router-link to="/subsidy/apply">
        <div class="but center">返回</div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import correct from '@/assets/img/correct_img.png';

  export default {
    name: 'successful',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        lists: [],
        correct,
      };
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.center{
  text-align: center;
}
.money{
  font-size:20px;
  font-family: "黑体"；
}
.mx{
  font-size: 16px;
  margin: 25px 0 50px 0;
}
.but{
  width: 300px;
  height: 40px;
  margin: 0 auto;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  letter-spacing: 2px;
  background-color: #337cfd;
}

</style>
