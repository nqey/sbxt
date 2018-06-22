
<template>
  <div class="index_more">
      <div class="index_chunk">
              <v-datagrid :columns="columns" :checkable="false"
                  :data-url="dataUrl" :count-url="countUrl"></v-datagrid>
          </div>
      </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import { ORGANIZ_SUBSIDY_RECORD_QUERY, ORGANIZ_SUBSIDY_RECORD_COUNT } from '@/config/env';
  import { formatDate } from '@/config/utils';

  export default {
    name: 'user',
    data() {
      return {
        dataUrl: ORGANIZ_SUBSIDY_RECORD_QUERY,
        countUrl: ORGANIZ_SUBSIDY_RECORD_COUNT,
        status: {
          pending: '待审核',
          passed: '通过',
          rejected: '未通过',
          delayed: '延后',
        },
        typeObj: {
          1: '企业入库',
          2: '二维码',
          3: '粉丝',
          4: '推荐',
        },
        columns: [{ field: 'sn', header: '交易号', sort: 'sn', width: 230 },
          {
            field: 'createTime',
            header: '申请时间',
            sort: 'create_time',
            width: 230,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          { field: 'amount', header: '申请金额', width: 230 },
          {
            field: 'bankCard',
            header: '银行卡',
            width: 230,
          },
          {
            field: 'state',
            header: '补贴状态',
            width: 230,
            formatter: row => this.status[row.state],
          },
          {
            field: 'type',
            header: '申请提现类型',
            width: 230,
            formatter: row => this.typeObj[row.type],
          },
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
</style>