<template>
  <div>
    <v-detail-head ></v-detail-head>
    <div class="index_more">
      <div class="index_chunk">
        <div class="t_nav"><router-link to="/login">&#12288;首页</router-link>&#12288;>&#12288;系统通知</div>
       <hr>
        <ul>
          <li class="news" v-for="(item, index) of news">
            <router-link :to="'/sys/msg/detail/'+item.id">{{item.title}}</router-link>
            <span class="news_new text-uppercase" v-show="index < 3 && page === 1">new</span>
            <span class="news_time">{{item.pushTime}}</span>
          </li>
        </ul>
        <v-pagination :page="pages" @nextPage="search"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import detailHead from '@/components/header/detailHead';
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
    'v-detail-head': detailHead,
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
          o.pushTime = formatDate(new Date(o.createTime), 'yyyy-MM-dd hh:mm:ss');
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
.index_more{padding: 250px 60px 50px;background: #f6f7fb;}
.index_chunk{background:#fff; padding: 40px 70px 55px;border-radius: 4px; box-shadow: 0px 20px 20px -20px #ddd;}
.t_nav {
  border-left: #4786ff solid 3px;
  font-size: 18px;
}
a {
  text-decoration: none;
}
.news {
  height: 80px;
  line-height: 80px;
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