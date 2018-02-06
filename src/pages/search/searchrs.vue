<template>
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
</template>

<script>
import searchtr from '@/pages/search/searchtr';
import axios from 'axios';
import Global from '@/components/tool/Global';
import utils from '@/components/tool/utils';

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
      axios.get(Global.ENTERPRISE_QUERY_DECLAREORG_ADDRESS, {
        params: utils.toRmEmpty(this.params),
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
  },
};
</script>

<style scoped>

</style>
