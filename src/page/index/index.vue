<template>
  <div class="index_more">
      <div class="index_chunk">       
        <div class="t_nav">&#12288;系统通知</div>
    <hr>
    <ul>
      <li class="news" v-for="(item, index) of news">
        <router-link :to="'/index/detail/'+item.id">{{item.title}}</router-link>
        &#12288;<span class="news_new text-uppercase" v-show="index < 3 && page === 1">new</span>
        <span class="news_time">{{item.pushTime}}</span>
      </li>
    </ul>
    <v-pagination :page="pages" @nextPage="search"></v-pagination>
    <div style="clear: both;"></div>
  </div>
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
.index_more{background: #f6f7fb;min-height: 100%;
    position: absolute;
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
a {
  text-decoration: none;
}
.news {
      height:55px;
    line-height:55px;
    position: relative;
    list-style-type: disc;
    margin-left: 15px;
    a{
      font-size: 16px;
    color: #505050;
  }
}
.news_new {
  background-color: #fdc5d0;color: #fa607e;font-weight: bold;    font-size: 0.1em;
    padding: 1px 3px;
    border-radius: 2px;
    margin-left: 15px;
}
.news_time {
  position: absolute;right: 0;    color: #888888;
    font-size: 12px;
}
</style>
