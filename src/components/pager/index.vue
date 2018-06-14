<template>
  <div class="pager">
    <span>每页
      <select class="pager-rows" v-model="pageSize" @change="pageNo = 1; changed()">
        <option class="pager-rows-option" v-for="v of rowsSelections">{{v}}</option>
      </select>
      条</span>
    <button class="pager-first" :disabled="pageNo <= 1"
            :class="{'pager-btn-disable':pageNo<=1, 'pager-btn-enable' : pageNo > 1}" @click="pageNo=1; changed()">首页
    </button>
    <button class="pager-previous" :disabled="pageNo <= 1"
            :class="{'pager-btn-disable':pageNo<=1, 'pager-btn-enable' : pageNo > 1}" @click="pageNo--; changed()">上一页
    </button>
    <input type="number" class="pager-current" v-model="pageNo" :max="totalPages" :min="1"
           @blur="changed" :disabled="totalPages <= 1"/>
    <button class="pager-next" :disabled="pageNo >= totalPages"
            :class="{'pager-btn-disable':pageNo >= totalPages, 'pager-btn-enable' : pageNo < totalPages}"
            @click="pageNo++; changed()">下一页
    </button>
    <button class="pager-last" :disabled="pageNo >= totalPages"
            :class="{'pager-btn-disable':pageNo >= totalPages, 'pager-btn-enable' : pageNo < totalPages}"
            @click="pageNo = totalPages; changed()">尾页
    </button>
    <span class="pager-page">
      共<span class="pager-page-num">{{  totalPages }}</span>页
    </span>
    <span class="pager-total">
      共<span class="pager-total-num">{{ totalCount }}</span>条记录
    </span>
  </div>
</template>

/**
* @author ： 李银 on 2018年5月24日 10:49:32
*
* 入参：
* total : 分页数据总条数，允许多次赋值，重新设置将初始化page为1
* page : 当前页码，允许多次赋值
* rows : 每页数据条数，允许多次赋值
*
* 事件：
* changed ： 当页码或者每页条数发生变化时，通知外部使用者，参数为当前页码和每页条数，如：{page:1,rows:20}
**/
<script>
  export default {
    props: {
      // 分页数据总条数
      total: {
        type: Number,
        default: 0,
      },
      // 当前页码
      page: {
        type: Number,
        default: 1,
      },
      // 每页数据条数
      rows: {
        type: Number,
        default: 20,
      },
    },
    data() {
      return {
        // 分页数据总条数
        totalCount: 0,
        // 当前页码
        pageNo: 1,
        // 每页数据条数
        pageSize: 20,
        rowsSelections: [5, 10, 20, 100],
      };
    },
    watch: {
      // 外部传入参数变更
      total: 'setTotal',
      page: 'setPage',
      rows: 'setRows',
    },
    computed: {
      totalPages() {
        return window.parseInt(this.totalCount / this.pageSize)
          + ((this.totalCount % this.pageSize) ? 1 : 0);
      },
    },
    mounted() {
      this.setTotal();
      this.setPage();
      this.setRows();
    },
    methods: {
      // 外部传入参数变更
      setTotal() {
        this.totalCount = this.total;
      },
      setPage() {
        this.pageNo = this.page;
      },
      setRows() {
        this.pageSize = this.rowsSelections.indexOf(this.rows) > -1 ? this.rows : 20;
      },
      changed() {
        let pageNo = +this.pageNo;
        const pageSize = +this.pageSize || 20;
        if (isNaN(pageNo) || pageNo <= 0) {
          pageNo = 1;
        }

        const totalPages = window.parseInt(this.totalCount / pageSize)
          + ((this.totalCount % pageSize) ? 1 : 0);
        if (pageNo > totalPages) {
          pageNo = totalPages;
        }

        this.pageNo = pageNo;
        this.pageSize = pageSize;

        this.$emit('onChanged', { rows: pageSize, page: this.pageNo });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .pager {
    font-size: 15px;
    color: #666666;
    margin: 15px 10px;
    padding-left: 20px;
    box-sizing: border-box;
    text-align: right;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }

  .pager-rows {
    width: 70px;
  }

  .pager-rows-option {

  }

  .pager-btn-enable {
    background-color: white;
    min-width: 30px;
    height: 28px;
    border: 1px solid #0073A9 !important;
    text-align: center;
    margin: 0 4px;
    cursor: pointer;
    line-height: 28px;
    color: #0073A9;
    font-size: 13px;
    display: inline-block;
  }

  .pager-btn-enable:hover {
    background-color: #3674F4;
    border-color: #3674F4;
    color: #FFFFFF !important;
  }

  .pager-btn-disable {
    color: gray !important;
    background-color: #f2f6f7 !important;
    min-width: 30px;
    height: 28px;
    border: 1px solid #cacaca !important;
    text-align: center;
    margin: 0 4px;
    cursor: pointer;
    line-height: 28px;
    font-size: 13px;
    display: inline-block;
  }

  .pager-first {
    width: 50px;
  }

  .pager-previous {
    width: 70px;
  }

  .pager-current {
    width: 60px;
    text-align: center;
  }

  .pager-next {
    width: 70px;
  }

  .pager-last {
    width: 50px;
  }

  .pager-page {
    margin: 0 10px;
  }

  .pager-total {
    margin: 0 10px;
  }

  .pager-page-num {
    color: #0073A9;
    margin: 0 5px;
  }

  .pager-total-num {
    color: #0073A9;
    margin: 0 5px;
  }

</style>
