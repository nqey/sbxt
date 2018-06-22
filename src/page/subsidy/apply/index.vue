<template>
  <div class="index_more">
      <div class="index_chunk" style="text-align: center;">
        <img :src="subsidies" style="width: 124px;height: 124px;">
        <br/>
        <div class="money"><span>{{money}}</span>元</div>
        <br/>
        <router-link to="/subsidy/list">查看补贴明细</router-link>
        <br/>
        <br/>
        <router-link to="/subsidy/apply_subsidy">
          <button class="btn btn-primary" style="width: 350px;height: 35px;">
          申请补贴
          </button>
        </router-link>
    </div>
  </div>
</template>

<script>
  import subsidies from '@/assets/img/subsidies.png';
  import { ORGANIZ_SUBSIDY_AMOUNT } from '@/config/env';

  export default {
    name: 'apply',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        lists: [],
        subsidies,
        money: 0,
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        const res = await this.$http.get(ORGANIZ_SUBSIDY_AMOUNT);
        if (res.success) {
          this.money = res.data;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.index_more{background: #f6f7fb;
  height: 100%;
  padding-bottom: 200px;
    width: 100%;}
.index_chunk{ 
position: relative;
top:120px;
left: 19%;
margin: 0;
width: 78%;background:#fff; padding: 40px 70px 55px;border-radius: 4px; box-shadow: 0px 20px 20px -20px #ddd;}
.money{
  font-size: 16px;
}
.money span{
  font-size:22px;
  font-weight: 600;
}
</style>