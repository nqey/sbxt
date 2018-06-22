<template>
  <div class="index_more">
      <div class="index_chunk" style="text-align: center;">
        <h4>补贴明细</h4>
        <hr/>
         <table class="table table-bordered">
            <thead>
              <tr>
                <!-- <th>间接推荐人数</th> -->
                <th>推荐人数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <!-- <td>{{data.inDirectCount}}</td> -->
                <td>{{data.directCount}}</td>
              </tr>
            </tbody>
          </table>
          <router-link to="/recommend/apply"><button class="btn fh">返回</button></router-link>
      </div>
  </div>
</template>

<script>
  import { ORGANIZ_DECLARER_RECOMMEND_AMOUNT_DETAIL } from '@/config/env';

  export default {
    name: 'recommendDetail',
    data() {
      return {
        data: {},
      };
    },
    async mounted() {
      const res = await this.$http.get(ORGANIZ_DECLARER_RECOMMEND_AMOUNT_DETAIL);
      if (res.success) {
        this.data = res.data;
      }
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
.t_nav {
  border-left: #4786ff solid 3px;
  font-size: 18px;
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
.fh {
    width: 150px;
    margin: auto;
    color:#888;
    border-color: #888;
}
</style>