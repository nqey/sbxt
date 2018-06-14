<template>
  <div>
    <table class="table table-striped">
     <tbody>
      <tr>
       <th>企业名称</th>
       <th>状态</th>
       <th>二维码生成数量</th>
       <th>补贴金额</th>
      </tr>
      <tr v-show="showTishi"><span style="color: red">{{tishi}}</span></tr>
      <tr 
        is="v-searchtr"
        v-for="(list, index) in lists"
        :list="list"
      ></tr>
     </tbody>
    </table>
    
  </div>
</template>

<script>
import searchtr from '@/page/search/children/children/rstr';
import { ENTERPRISE_QUERY_DECLAREORG_ADDRESS } from '@/config/env';

export default {
  name: 'result',
  props: ['params'],
  data() {
    return {
      lists: [],
      showTishi: false,
      tishi: '',
    };
  },
  methods: {
    async getInfo() {
      const res = await this.$http.get(ENTERPRISE_QUERY_DECLAREORG_ADDRESS, this.params);
      if (res.success) {
        this.showTishi = false;
        this.lists = res.data || [];
      } else {
        this.tishi = res.data.message;
        this.showTishi = true;
      }
      this.$emit('isrs', true);
    },
  },
  watch: {
    params: 'getInfo',
  },
  components: {
    'v-searchtr': searchtr,
  },
};
</script>

<style lang="scss" scoped>
.table-striped {
  tbody {
    tr {
      &:nth-of-type(odd) {
        background-color: #edf2fe !important;
      }
    }
  }
}
</style>
