<template>
  <div class="index_more">
      <div class="index_chunk">
              <h4>补贴明细</h4>
              <hr/>
               <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>间接推荐人数</th>
                      <th>直接推荐人数</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{data.inDirectCount}}</td>
                      <td>{{data.directCount}}</td>
                    </tr>
                  </tbody>
                </table>
          </div>
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
</style>