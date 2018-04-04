<template>
  <div>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;推荐列表</span>
      <br/>
      <br/>
      <br/>
      <table class="table table-bordered">
          <thead>
            <tr>
              <th>机构名称</th>
              <th>负责人</th>
              <th>推荐人</th>
              <th>状态</th>
              <th>申报时间</th>
              <th>联系电话</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of lists">
              <th scope="row">{{item.name}}</th>
              <td>{{item.declarer}}</td>
              <td>{{item.recomer}}</td>
              <td style="color: #ac2925;">{{item.state}} <span class="glyphicon glyphicon-question-sign"></span></td>
              <td>{{item.createTime}}</td>
              <td>{{item.tellphone}}</td>
            </tr>
          </tbody>
        </table>
        <v-pagination :page="pages" @nextPage="search"></v-pagination>
        <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script>
import upload from '@/components/upload';
import bigImg from '@/components/bigImg';
import pagination from '@/components/pagination';

export default {
  name: 'recommendlist',
  data() {
    return {
      page: 1,
      rows: 20,
      lists: [],
      pages: 0,
      showImg: false,
    };
  },
  methods: {
    bigimg(src) {
      this.imgSrc = src;
      this.showImg = true;
    },
    viewImg() {
      this.showImg = false;
    },
    search() {
      this.lists = [
        {
          name: '四川中新华搜信息技术有限公司',
          declarer: '申报人',
          recomer: '推荐人',
          state: '登记信息审核中',
          createTime: '13800000',
          tellphone: '13888888888',
        },
        {
          name: '四川中新华搜信息技术有限公司',
          declarer: '申报人',
          recomer: '推荐人',
          state: '登记信息审核中',
          createTime: '13800000',
          tellphone: '13888888888',
        },
      ];
      this.pages = 10;
    },
  },
  components: {
    'v-upload': upload,
    'v-bigimg': bigImg,
    'v-pagination': pagination,
  },
  mounted() {
    this.search();
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
.txr {
  text-align: right;
}
.txc {
  text-align: center;
}
.iw {
  width: 300px;
}
.iw600 {
  width: 600px;
}
.label_height {
  line-height: 35px;
}
.imb {
  margin-bottom: 30px;
}
.info {
  color: #ac2925;
}
.areafc {
  color: #999;
}
.js-ajax-submit {
    width: 350px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
}
</style>
