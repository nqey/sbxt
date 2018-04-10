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
            <router-link :to="'/sys/msg/detail/'+item.id">{{item.title}}</router-link>
            <span class="news_new" v-show="index < 3 && page === 1">new</span>
            <span class="news_time">{{item.pushTime}}</span>
          </li>
        </ul>
        <v-pagination :page="pages" @nextPage="search"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import lhead from '@/components/registerHead/lhead';
import pagination from '@/components/pagination';
import { PUBLICS_GET_NOTICES_LISTING, PUBLICS_GET_NOTICES_COUNTS } from '@/config/env';
import { formatDate } from '@/config/utils';

export default {
  name: 'sysmsglist',
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
      page: 1,
      rows: 10,
      pages: 0,
      news: [],
    };
  },
  methods: {
    async search(page) {
      const param = {};
      this.page = page;
      param.page = this.page;
      param.rows = this.rows;
      const res = await this.$xhr('get', PUBLICS_GET_NOTICES_LISTING, param);
      if (res.data.code === 0) {
        this.news = res.data.data;
        this.news.forEach((o) => {
          o.pushTime = formatDate(new Date(o.createTime), 'yyyy-MM-dd');
        });
      }
      const res2 = await this.$xhr('get', PUBLICS_GET_NOTICES_COUNTS);
      if (res2.data.success) {
        this.pages = Math.ceil(res2.data.data / param.rows);
      }
    },
  },
  mounted() {
    this.search(1);
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