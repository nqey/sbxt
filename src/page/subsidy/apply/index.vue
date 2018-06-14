<template>
  <div class="index_more">
      <div class="index_chunk">
      <div style="width: 100%;text-align: center;">
        <img :src="subsidies" style="width: 124px;height: 124px;">
      </div>
      <br/>
      <div class="money center"><span>{{money}}</span>元</div>
 <!--      <div class="mx center">
        <router-link to="/subsidy/list">
          查看补贴明细
        </router-link>
      </div> -->
      <br/>
      <br/>
      <router-link to="/subsidy/apply_subsidy" style="display: block;width: 300px; margin: 0 auto;">
        <button class="but center">
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
.center{
  text-align: center;
}
.money{
  font-size: 16px;
}
.money span{
  font-size:22px;
  font-weight: 600;
}
.mx{
  color: #337cfd;
  font-size: 16px;
  margin: 25px 0 50px 0;
}
.but{
  width: 300px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  letter-spacing: 2px;
  background-color: #337cfd;
  border:none;
}

</style>