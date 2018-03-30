<template>
  <div>
    <v-lhead ></v-lhead>
    <div class="col-sm-12 container">
      <div class="col-sm-12 bs-example">
        <span class="t_nav"><router-link to="/login">&#12288;首页</router-link>&#12288;>&#12288;系统通知</span>
        <br/>
        <br/>
        <br/>
        <ul>
          <li class="news" v-for="(item, index) of news">
            <router-link :to="'/sysMsgDetail/'+item.id">{{item.title}}</router-link>
            <span class="news_new" v-show="index < 3">new</span>
            <span class="news_time">{{item.pushTime}}</span>
          </li>
        </ul>
        <v-pagination :page="pages" @nextPage="search"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/logo.png';
import lhead from '@/components/registerHead/lhead';
import pagination from '@/components/pagination';

export default {
  name: 'sysMsg',
  props: {
    value: {
      type: String,
    },
  },
  components: {
    'v-lhead': lhead,
    'v-pagination': pagination,
  },
  data() {
    return {
      logo,
      pages: 0,
      news: [],
    };
  },
  methods: {
    search(page) {
      this.news = [
        {
          title: '申报机构申请办事指南',
          id: '1',
          pushTime: '2017-12-27',
        },
        {
          title: '申报机构申请办事指南',
          id: '2',
          pushTime: '2017-12-27',
        },
        {
          title: '申报机构申请办事指南',
          id: '3',
          pushTime: '2017-12-27',
        },
        {
          title: '申报机构申请办事指南',
          id: '4',
          pushTime: '2017-12-27',
        },
        {
          title: '申报机构申请办事指南',
          id: '5',
          pushTime: '2017-12-27',
        },
        {
          title: '申报机构申请办事指南',
          id: '6',
          pushTime: '2017-12-27',
        },
        {
          title: '申报机构申请办事指南',
          id: '7',
          pushTime: '2017-12-27',
        },
        {
          title: '申报机构申请办事指南',
          id: '8',
          pushTime: '2017-12-27',
        },
      ];
    },
  },
  mounted() {
    this.search(1);
    this.pages = 10;
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0px 55px;
}
.bs-example {
    background-color: #fff;
    border: 1px solid #ddd;
    -webkit-border-top-left-radius: 4px;
    -webkit-border-top-right-radius: 4px;
    -moz-border-radius-topleft: 4px;
    -moz-border-radius-topright: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin: 15px 0;
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
.news {
  height: 50px; position: relative;
}
.news_new {
  display: inline-block;background-color: #fdc5d0;color: #fa607e;
}
.news_time {
  position: absolute;right: 0
}
</style>