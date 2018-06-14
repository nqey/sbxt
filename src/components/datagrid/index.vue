<template>
  <div class="datagrid-container">

    <table class="datagrid-frame">
      <thead class="datagrid-header">
      <tr class="datagrid-title" v-if=" (title||'').trim().length > 0">
        <th :colspan="columns.length + checkable">
          <p class="datagrid-title-text">{{ title }}</p>
        </th>
      </tr>
      <tr class="datagrid-toolbar" v-if="toolbar && toolbar.length > 0">
        <th :colspan="columns.length + checkable">
          <button type="button" v-for="(item, index) in toolbar" @click="item.handler()"
                  class="datagrid-toolbar-button">
            {{ item.title }}
          </button>
        </th>
      </tr>
      <tr class="datagrid-header-row" v-if="columns != null  && columns.length > 0">
        <th class="datagrid-header-check" v-if="checkable">
          <input type="checkbox" v-model="checkAll" class="datagrid-checkbox">
        </th>
        <th class="datagrid-header-cell" v-for="(column, index) in columns"
            :style="{ width: column.width > 0 ? (column.width + 'px') : 'auto'}"
            @click="onHeaderClicked(column)">
          {{ column.header }}
          <span
            :class="{ 'datagrid-header-sort-asc' : sort === column.sort && (order ||'').toUpperCase() === 'ASC', 'datagrid-header-sort-desc': sort === column.sort && (order ||'').toUpperCase() === 'DESC' }"></span>
        </th>
      </tr>
      </thead>
      <tbody class="datagrid-body">
      <tr class="datagrid-body-row" v-for="(row, rowIndex) in data" v-if="onBeforeRenderRow == null || onBeforeRenderRow(row, rowIndex) !== false">
        <td class="datagrid-row-check" v-if="checkable" style="width:20px">
          <input type="checkbox" v-model="row.$checked" class="datagrid-checkbox">
        </td>

        <td class="datagrid-body-cell" v-for="(col, colIndex) in columns"
            :style="{ width: col.width > 0 ? (col.width + 'px') : 'auto'}">
          <div v-if="col.html" v-html="computeValue(col, row, rowIndex)"></div>
          <div v-if="!col.html"> {{computeValue(col, row, rowIndex)}}</div>
          <div v-if="col.actions != null && col.actions.length > 0">
            <a class="datagrid-action" v-for="(action, index) in col.actions"
               v-if="action.show != null ? action.show(row) === true: true"
               @click="action.handler != null && action.handler(row, rowIndex)">
              {{ action.text }}
            </a>
          </div>
        </td>
      </tr>
      <tr class="datagrid-footer">
        <td :colspan="columns.length + checkable">
          <pager @onChanged="onPagerChanged" v-if="pageable"
                 :page="page" :total="total" :rows="rows"></pager>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

/**
* @author ： 李银 on 2018年5月24日 23:55:12
*
* 入参：
* checkable:Boolean   - 是否支持数据行被check选中， 默认为false（不支持）
* singleCheck:Boolean - 是否单选，默认false（多选）
* pageable:Boolean    - 是否支持分页，默认为true（支持）
* title:String        - title，默认没有
* sortBy:String       - 按什么字段排序，默认不排序
* orderBy:String      - ASC（正序）/DESC（倒序）排序，默认不排序
* toolbar:Array       - 工具栏，格式为：{title:'toolbar',handler(){ doSomething }}
* dataUrl:String      - 数据请求的url路径，不设置则不请求数据
* countUrl:String     - 数据条数请求的url路径，当pageable为true时有效，不设置则不请求总条数（分页不起效）
* params:String       - 请求参数，当改变时，自动请求数据
* loadData:Array      - 外部传入数据（不使用自带请求远程接口获取数据），当此项不为空时，以上参数皆失效
* columns:Array       - 必填项，数据表格的头信息格式如下：
*                     -{
*                     -  field: '表示接口返回的字段标识, 支持a.b.c格式，如：返回数据为{a : {b : {c : 1}}}, 那么field写为 a.b.c即可',
*                     -  header: '显示头的名称',
*                     -  width: '宽度，整数',
*                     -  formatter(row, index, value) { 如果返回值需要格式化，可以使用此方法。比如时间戳转时间字符串等等，可以返回html
*                     -   return value;
*                     -  },
*                     -  sort: '排序字段，基于field字段的下划线命名法（UnderScoreCase），点击头部将重新请求数据'
*                     -  actions: [{
*                     -   text: '按钮显示的内容，可以写html代码',
*                     -   show(row) {}, return true 表示这个按钮要显示，否则不显示, row为当前行数据
*                     -   handler(row, index) { }, 处理器，参数：row-当前行数据，index当前行所属数据的第几行
*                     -  }, {...}]
*                     -}
*
* api:
* getCheckedData()    - 返回checked的数据
* reload()            - 刷新
*
* 回调：
* onBeforeLoad(params)          - 在即将请求远程数据数据之前触发此事件，params是参数，return false将取消加载数据
* onLoadSuccess(data)           - 在请求远程数据完毕时触发此事件，data是请求回来的数据，return false将取消渲染列表
* onBeforeRenderRow(row, index) - 在渲染某一行数据之前触发此事件，row是该行数据，index是数据第几行，return false将需要渲染该行数据
**/
<script>
  import pager from '@/components/pager';

  export default {
    props: {
      // 是否可以有checkbox
      checkable: {
        type: Boolean,
        default: false,
      },
      // 是否单选，默认false（多选）
      singleCheck: {
        type: Boolean,
        default: false,
      },
      // 是否支持分页
      pageable: {
        type: Boolean,
        default: true,
      },
      // datagrid的标题
      title: {
        type: String,
        default: null,
      },
      // 根据那个字段排序
      sortBy: {
        type: String,
        default: null,
      },
      // 排序方式：ASC-正序，DESC-倒序
      orderBy: {
        type: String,
        default: null,
      },
      // 格式为：{title:'toolbar',handler(){ doSomething }}
      toolbar: {
        type: Array,
        default: () => [],
      },
      // 头部 格式：{ field: 'id', header: '序号', sort: 'id', width: 50 }
      columns: {
        type: Array,
        default: () => [],
        required: true,
      },
      // 请求数据的url
      dataUrl: {
        type: String,
        default: null,
      },
      // 计算总数的url， pageable为false时，此项无效
      countUrl: {
        type: String,
        default: null,
      },
      // 外部传入的参数
      params: {
        type: Object,
        default: null,
      },
      loadData: {
        type: Array,
        default: null,
      },
      onBeforeLoad: {
        type: Function,
        default: null,
      },
      onLoadSuccess: {
        type: Function,
        default: null,
      },
      onBeforeRenderRow: {
        type: Function,
        default: null,
      },
    },
    data() {
      return {
        // 分页总条数
        total: 0,
        // 当前页数
        page: 1,
        // 当前页数据条数
        rows: 20,
        // 根据那个字段排序
        sort: null,
        // 排序方式：ASC-正序，DESC-倒序
        order: null,
        requestParams: {},
        data: [],
        // 参数是否已经改变，如果没改变，就不需要去重新请求总条数
        paramsChanged: true,
      };
    },
    mounted() {
      this.sort = this.sortBy;
      this.order = this.orderBy;

      const p = this.getPagerParams();
      const o = this.getOrderParams();
      // 修改参数，datagrid将重新拉取数据
      this.requestParams = Object.assign(p, o, this.params);

      this.data = this.loadData;
    },
    computed: {
      checkAll: {
        get() {
          return this.data && this.data.length > 0 && this.data.filter(s => !s.$checked).length === 0;
        },
        set(checked) {
          this.data.forEach(s => this.$set(s, '$checked', checked));
        },
      },
    },
    watch: {
      params() {
        this.paramsChanged = true;
        this.requestParams = Object.assign({}, this.params,
          this.getPagerParams());
        // 这里需要pager初始化；
        this.total = 0;
        this.page = 1;
      },
      loadData() {
        this.data = this.loadData;
      },
      requestParams() {
        // 重新请求数据
        if (this.loadData === null) {
          this.loadRemoteData();
        }
      },
    },
    methods: {
      getCheckedData() {
        return (this.data || []).filter(s => s.$checked);
      },
      reload() {
        this.paramsChanged = true;
        this.loadRemoteData();
      },
      computeValue(col, row, index) {
        const field = col.field || '';
        const fieldSplits = field.split('.');
        const formatter = col.formatter;
        let value = row;

        if (field) {
          fieldSplits.forEach((s) => {
            value = value[s] != null ? value[s] : '';
          });
        } else {
          value = '';
        }
        if (formatter) {
          value = formatter(row, index, value);
        }
        return value;
      },
      getPagerParams() {
        // 支持分页的时候才有分页参数
        return this.pageable ? ({ page: this.page, rows: this.rows }) : ({});
      },
      getOrderParams() {
        const p = {};
        if (this.sort) {
          p.sort = this.sort;
        }

        if (this.order) {
          p.order = this.order;
        }

        return p;
      },
      async loadRemoteData() {
        // 查询数据
        if (this.dataUrl) {
          if (this.onBeforeLoad != null && this.onBeforeLoad(this.requestParams) === false) {
            return;
          }

          const res = await this.$http.get(this.dataUrl, this.requestParams);
          if (res.success) {
            if (this.onLoadSuccess != null && this.onLoadSuccess(res) === false) {
              return;
            }

            this.data = res.data;
          }
        }

        // 查询总条数
        if (this.pageable && this.countUrl && this.paramsChanged) {
          const res = await this.$http.get(this.countUrl, this.requestParams);
          if (res.success) {
            this.total = res.data;
          }

          this.paramsChanged = false;
        }
      },
      // pager通知分页参数改变
      onPagerChanged(p = {}) {
        if (this.rows !== p.rows) {
          this.paramsChanged = true;
        }

        if (this.rows === p.rows && this.page === p.page) {
          // change nothing
          return;
        }

        this.rows = p.rows;
        this.page = p.page;
        this.requestParams = Object.assign({}, this.requestParams, this.getPagerParams());
      },
      onHeaderClicked(column) {
        const sort = column.sort;
        // 每页设置sort，那么就不sort
        if (!sort) {
          return;
        }
        if (this.sort === sort) {
          this.order = (this.order || '').toUpperCase() === 'ASC' ? 'DESC' : 'ASC';
        } else {
          this.sort = sort;
          this.order = 'DESC';
        }
        this.requestParams = Object.assign({}, this.requestParams, this.getOrderParams());
      },
    },
    components: {
      pager,
    },
  };

</script>

<style lang="scss" scoped>
  /*样式在下面完成*/
  .datagrid-container {

  }

  .datagrid-title {
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 10px;
    color: #6d6d6d;
  }

  .datagrid-title-text {
    padding: 15px;
    border-left: 3px solid #4786ff;
  }

  .datagrid-toolbar {
    width: 100%;
    height: 60px;
    padding: 15px;
    border-bottom: none;
  }

  .datagrid-toolbar-button {
    color: #fff;
    background-color: #337ab7;
    display: inline-block;
    padding: 6px 12px;
    margin: 0 10px;
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
    border: 1px solid #2e6da4;
    border-radius: 4px;
  }

  .datagrid-checkbox {
    width: 40px;
    zoom: 1.5;
  }

  .datagrid-frame {
    border-spacing: 0;
    border-collapse: collapse;
    background-color: transparent;
  }

  .datagrid-header {
    font-size: 15px;
    padding: 15px;
  }

  .datagrid-header-row {
    border: 1px solid #ddd;
  }

  .datagrid-header-cell {
    text-align: center;
    line-height: 1.42857143;
    cursor: pointer;
    padding: 15px;
  }

  .datagrid-header-check {
    width: 40px;
    text-align: center;
  }

  .datagrid-body {
    text-align: center;
  }

  .datagrid-body-row {
    border: 1px solid #ddd;
  }

  .datagrid-body-cell {
    padding: 15px;
  }

  .datagrid-action {

  }

  .datagrid-footer {
    border: 1px solid #ddd;
    background-color: #f1f1f1;
  }
</style>
