<template>
  <div>
    <v-head></v-head>
    <v-lmenu></v-lmenu>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;系统通知</span>
      <br/>
      <br/>
      <br/>
      <ul>
        <li style="height: 50px; position: relative;"><router-link to="/notid">申报机构申请办事指南　</router-link><span style="display: inline-block;background-color: #fdc5d0;color: #fa607e">new</span><span style="position: absolute;right: 0">2017-12-27</span></li>
        <li style="height: 50px; position: relative;">申报机构申请办事指南　<span style="display: inline-block;background-color: #fdc5d0;color: #fa607e">new</span> <span style="position: absolute;right: 0">2017-12-27</span></li>
        <li style="height: 50px; position: relative;">申报机构申请办事指南　<span style="display: inline-block;background-color: #fdc5d0;color: #fa607e">new</span> <span style="position: absolute;right: 0">2017-12-27</span></li>
        <li style="height: 50px; position: relative;">申报机构申请办事指南  <span style="position: absolute;right: 0">2017-12-27</span></li>
        <li style="height: 50px; position: relative;">申报机构申请办事指南  <span style="position: absolute;right: 0">2017-12-27</span></li>
        <li style="height: 50px; position: relative;">申报机构申请办事指南  <span style="position: absolute;right: 0">2017-12-27</span></li>
        <li style="height: 50px; position: relative;">申报机构申请办事指南  <span style="position: absolute;right: 0">2017-12-27</span></li>
        <li style="height: 50px; position: relative;">申报机构申请办事指南  <span style="position: absolute;right: 0">2017-12-27</span></li>
        <li style="height: 50px; position: relative;">申报机构申请办事指南  <span style="position: absolute;right: 0">2017-12-27</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import searchrs from '@/page/search/children/result';
import pagination from '@/components/pagination';
import vhead from '@/components/header';
import lmenu from '@/components/leftMenu';
import { getCookie } from '@/config/cookie';
import { ENTERPRISE_QUERY_COUNT_ADDRESS } from '@/config/env';

export default {
  name: 'search',
  data() {
    return {
      declareOrgName: '',
      state: '',
      declareOrgId: '',
      isShowRs: false,
      isPageShow: false,
      pages: 1,
      rows: 20,
      params: {
        declareOrgName: '',
        state: '',
        declareOrgId: '',
      },
    };
  },
  methods: {
    async search(page) {
      const o = {};
      o.declareOrgName = this.declareOrgName;
      o.state = this.state;
      o.declareOrgId = getCookie('declareOrgId');
      o.page = page;
      o.rows = this.rows;
      this.params = o;
      const aPage = await this.$xhr('get', ENTERPRISE_QUERY_COUNT_ADDRESS);
      this.pages = aPage.data.data.count / this.rows;
      this.isPageShow = true;
    },
    isprs(isShow) {
      this.isShowRs = isShow;
    },
  },
  components: {
    'v-searchrs': searchrs,
    'v-head': vhead,
    'v-lmenu': lmenu,
    'v-pagination': pagination,
  },
};
</script>

<style lang="scss" scoped>

.bs-example {
    position: relative;
    top: 120px;
    left: 275px;
    margin: 0;
    width: 84%;
    background-color: #fff;
    border: 1px solid #ddd;
    -webkit-border-top-left-radius: 4px;
    -webkit-border-top-right-radius: 4px;
    -moz-border-radius-topleft: 4px;
    -moz-border-radius-topright: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding: 35px 30px;
    position: relative;
}
.t_nav {
  border-left: #4786ff solid 3px;
  margin-left: -30px;
  /*font-weight: bold;*/
  font-size: 18px;
}
a {
  text-decoration: none;
}

</style>
