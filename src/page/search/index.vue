<template>
  <div>
    <v-head></v-head>
    <v-lmenu></v-lmenu>
    <div class="container">
      <div style="height: 100px;"></div>
      <div class="content_list">
        <div class="main_center_logo">
          <h2>中国商品诚信数据库申报机构申报企业查询平台</h2>
          <p>该后台主要用于申报机构查询自己所提交的企业的状态及补贴金额</p>
        </div>
      </div>
      <div class="content_list_list">
        <h4>筛选条件</h4>
        <div class="content_list_list_search">
          <table cellpadding="2" cellspacing="1" class="tb">
            <tbody>
              <tr>
                <td><label>输入企业名称：</label>
                  <input type="text" size="25" v-model="declareOrgName" value="" title="关键词">
                  &nbsp;
                  <label>按状态查找：</label>
                  <select name="state" id="state" v-model="state">
                    <option value="">全部</option>
                    <option value="wait">待支付</option>
                    <option value="pending">待初审</option>
                    <option value="collectting">待认证官上门采集</option>
                    <option value="confirmFailed">初审未通过</option>
                    <option value="pending2">待复审</option>
                    <option value="confirm2Failed">复审未通过</option>
                    <option value="passed">通过审核</option>
                  </select>
                  &nbsp;
                  <input type="submit" class="btn btn-success" @click="search(1)" value="搜 索">
                  &nbsp; </td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-show="isShowRs" class="content_list_list_con table-responsive" style="display: block;">
          <h5>筛选结果：</h5>
          <v-searchrs :params="params" @isrs="isprs"></v-searchrs>
          <v-pagenav v-show="isPageShow" :page="pages" @nextPage="search"></v-pagenav>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import searchrs from '@/page/search/children/result';
import pagenav from '@/components/pagenav';
import vhead from '@/components/header';
import lmenu from '@/components/leftMenu';
import { getCookie } from '@/config/cookie';

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
      lines: 10,
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
      this.params = o;
      const aPage = await this.$xhr('get', 'api/count');
      this.pages = aPage.data.data.count / this.lines;
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
    'v-pagenav': pagenav,
  },
};
</script>

<style lang="scss" scoped>
.main_center_logo {
  text-align: center;
  color: #333;
  h2 {
    padding: 25px 0;
  }
}
.content_list {
  padding: 5% 0 3% 0;
  text-align: center;
}
.content_list_list {
  background: #fff;
  padding: 20px 30px;
  border-radius: 8px;
}
.content_list_list_search {
  padding: 10px;
  background: #f9f9f9;
  select {
    min-width: 120px;
  }
}
</style>
