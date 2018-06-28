<template>
  <div class="index_more">
      <div class="index_chunk" style="text-align: center;">
              <h4>补贴明细</h4>
              <hr/>
              <v-datagrid 
                  :columns="columns"
                  :checkable="false"
                  :data-url="dataUrl"
                  :count-url="countUrl">
              </v-datagrid>
              <br/>
              <br/>
              <router-link to="/subsidy/apply"><button class="btn fh">返回</button></router-link>
      </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import { ORGANIZ_SUBSIDY_DETAIL_QUERY, ORGANIZ_SUBSIDY_DETAIL_COUNT } from '@/config/env';

  export default {
    name: 'subsidyList',
    data() {
      return {
        status: {
          pending: '待审核',
          passed: '通过',
          rejected: '未通过',
          delayed: '延后',
        },
        typeObj: {
          1: '入库费用',
          2: '二维码赋码费用',
          3: '粉丝推送费用',
        },
        dataUrl: ORGANIZ_SUBSIDY_DETAIL_QUERY,
        countUrl: ORGANIZ_SUBSIDY_DETAIL_COUNT,
        columns: [{ field: 'enterpriseName', header: '企业名称', sort: 'name', width: 300 },
          {
            field: 'type',
            header: '补贴类型',
            width: 300,
            formatter: row => this.typeObj[row.type],
          },
          { field: 'paidQuantity', header: '补贴数量', width: 300 },
          { field: 'amount', header: '补贴金额', width: 300 },
        ],
      };
    },
    methods: {},
    components: {
      'v-datagrid': datagrid,
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