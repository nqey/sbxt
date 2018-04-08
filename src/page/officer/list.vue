<template>
  <div>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;申报官列表</span>
      <br/>
      <br/>
      <br/>
      <table class="table table-bordered">
          <thead>
            <tr>
              <th>姓名</th>
              <th>手机号</th>
              <th>审核状态</th>
              <th>添加时间</th>
              <th>考试分数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of lists">
              <th scope="row">{{item.name}}</th>
              <td>{{item.tellphone}}</td>
              <td style="color: #ac2925;">{{item.state}} <span class="glyphicon glyphicon-question-sign"></span>{{item.reason}}</td>
              <td>{{item.createtime}}</td>
              <td>{{item.score}}</td>
              <td>
                <router-link to="/officerdetail">查看</router-link>
                <a>删除</a> 
                <router-link to="/officerdetail">修改</router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <v-pagination :page="pages" @nextPage="search"></v-pagination>
        <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination';

export default {
  name: 'search',
  data() {
    return {
      showImg: false,
      lists: [],
      pages: 0,
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
          id: '1',
          name: '张三',
          tellphone: '13888888888',
          state: 'type:',
          reason: '原因',
          createtime: '13880000',
          score: '100',
        },
        {
          id: '2',
          name: '李四',
          tellphone: '13888888888',
          state: '通过',
          reason: '原因',
          createtime: '13880000',
          score: '未考试',
        },
      ];
      this.pages = 10;
    },
  },
  components: {
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