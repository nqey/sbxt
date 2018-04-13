<template>
  <div class="bs-example">
    <span class="t_nav">&#12288;系统通知</span>
    <br/>
    <br/>
    <br/>
    <ul>
      <li class="news" v-for="(item, index) of news" style="list-style-type: disc;margin-left: 10px;">
        <router-link :to="'/index/detail/'+item.id">{{item.title}}</router-link>
        &#12288;<span class="news_new" v-show="index < 3 && page === 1">new</span>
        <span class="news_time">{{item.pushTime}}</span>
      </li>
    </ul>
    <v-pagination :page="pages" @nextPage="search"></v-pagination>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
import pagination from '@/components/pagination';
import { PUBLICS_GET_NOTICES_LISTING, PUBLICS_GET_NOTICES_COUNTS } from '@/config/env';
import { formatDate } from '@/config/utils';

export default {
  name: 'index',
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
  components: {
    'v-pagination': pagination,
  },
  mounted() {
    this.search(1);
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
