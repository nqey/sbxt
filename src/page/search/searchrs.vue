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
    <v-pagenav :page="10"></v-pagenav>
  </div>
</template>

<script>
import searchtr from '@/page/search/searchtr';
import pagenav from '@/page/search/pagenav';
import axios from 'axios';
import { ENTERPRISE_QUERY_DECLAREORG_ADDRESS } from '@/config/env';
import { toRmEmpty } from '@/config/utils';

export default {
  name: 'searchrs',
  props: ['params'],
  data() {
    return {
      lists: [],
      showTishi: false,
      tishi: '',
    };
  },
  methods: {
    getInfo() {
      axios.get(ENTERPRISE_QUERY_DECLAREORG_ADDRESS, {
        params: toRmEmpty(this.params),
      }).then((res) => {
        if (res.data.code === 0) {
          this.showTishi = false;
          this.lists = res.data.data;
        } else {
          this.tishi = res.data.message;
          this.showTishi = true;
        }
      });
    },
  },
  watch: {
    params: 'getInfo',
  },
  components: {
    'v-searchtr': searchtr,
    'v-pagenav': pagenav,
  },
};
</script>

<style scoped>

</style>
