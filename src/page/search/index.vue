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
                  <input type="submit" class="btn btn-success" @click="search" value="搜 索">
                  &nbsp; </td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="content_list_list_con table-responsive" style="display: block;">
          <h5>筛选结果：</h5>
          <v-searchrs :params="params"></v-searchrs>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import searchrs from '@/page/search/children/searchrs';
import head from '@/components/header/head';
import lmenu from '@/components/leftMenu/menu';
import { getCookie } from '@/config/cookie';

export default {
  name: 'search',
  data() {
    return {
      declareOrgName: '',
      state: '',
      declareOrgId: '',
      params: {
        declareOrgName: '',
        state: '',
        declareOrgId: '',
      },
    };
  },
  methods: {
    search() {
      const o = {};
      o.declareOrgName = this.declareOrgName;
      o.state = this.state;
      o.declareOrgId = getCookie('declareOrgId');
      this.params = o;
    },
  },
  components: {
    'v-searchrs': searchrs,
    'v-head': head,
    'v-lmenu': lmenu,
  },
};
</script>

<style>
/*首页*/
.main {
  padding: 5% 0;
}
.main_header_login {
  text-align: right;
}
.main_header_login a {
  color: #fff;
  border: 1px solid #fff;
  border-radius: 20px;
  padding: 10px 25px;
}
.main_center {
  padding: 5% 0;
}
.main_center_logo {
  text-align: center;
  color: #333;
}
.main_center_logo h2 {
  padding: 25px 0;
}
.main_center_search {
  text-align: center;
  padding: 10px 0;
}
.main_center_ps {
  padding-top: 12%;
  color: #fff;
  width: 66%;
  margin: auto;
}
.main_center_ps p {
  padding-bottom: 40px;
  line-height: 28px;
}
.main_center_search .navbar-form {
  width: 70% !important;
  margin: auto;
}
.main_center_search .form-group {
  width: 75%;
  margin-right: 4%;
}
.main_center_search .form-group input {
  width: 100% !important;
  background: #fff;
  border-radius: 40px;
  height: 40px;
  font-size: 16px;
  padding: 6px 18px !important;
}
.main_center_search button {
  width: 20%;
  border-radius: 40px;
  height: 40px;
  font-size: 16px;
  outline: none !important;
}
.main_center_search .modal-body {
  padding: 35px 35px 50px 35px !important;
}
.tc .glyphicon {
  font-size: 18px;
  padding: 15px;
  border-radius: 360px;
}
.tc .glyphicon-ok {
  border: 2px solid #5cb85c;
  color: #5cb85c;
}
.tc .glyphicon-remove {
  border: 2px solid red;
  color: red;
}
.tc h4 {
  padding: 25px 0 35px;
}
.tc a {
  color: #fff;
  padding: 10px 30px;
  border-radius: 20px;
}
.success a {
  background: #449d44;
}
.failure a {
  background: red;
}
@media (min-width: 768px) {
.modal-sm {
  width: 350px !important;
}
}
@media (min-width: 768px) {
.modal-dialog {
  margin: 15% auto;
}
}
/*企业列表页*/

.content_list {
  padding: 5% 0 3% 0;
  text-align: center;
}
.content_list_list {
  background: #fff;
  padding: 20px 30px;
  border-radius: 8px;
}
.content_list_list h4 {
  border-bottom: 1px solid #eee;
  color: #716d6d;
  padding-bottom: 10px;
}
.content_list_list_search {
  padding: 10px;
    background: #f9f9f9;
}
.content_list_list_search input, .content_list_list_search select {
  margin-right: 30px;
  border-radius: 5px;
  padding: 2px 10px;
  border: 1px solid #eee;
}
.content_list_list_search select {
  min-width: 120px;
}
.content_list_list_search label {
  font-size: 12px;
}
.content_list_list_search .btn {
  padding: 3px 35px;
  border: none;
  border-radius: 15px;
  outline: none !important;
}
.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
  padding: 12px !important;
  border-top: none !important;
}
.table-striped>tbody>tr:nth-of-type(odd) {
  background-color: #edf2fe !important;
}
td {
  color: #797979;
}
.pagination>li>a:focus, .pagination>li>a:hover, .pagination>li>span:focus, .pagination>li>span:hover {
  background: #5cb85c !important;
  border-color: #5cb85c !important;
  color: #fff !important;
}
</style>
