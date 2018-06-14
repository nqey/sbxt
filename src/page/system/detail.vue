<template>
  <div>
    <v-detail-head ></v-detail-head>
    <div class="index_more">
      <div class="index_chunk">
       
        <div class="t_nav"><router-link to="/login">&#12288;首页</router-link>&#12288;>&#12288;
            <router-link to="/sys/msg/list">系统通知</router-link>&#12288;>&#12288;详情</div>
        <hr>
            <div class="container text-center">
              <div class="content">
                <h3>{{title}}</h3>
                <span style="color: #888888;font-style: 12px;">{{createDate}}</span>
             <!--    <p id= style="line-height: 28px;margin: 20px 0 80px;color: #666666;">
                {{content}}
                </p> -->
                <div style="margin: 20px 0 40px;" v-html="content"></div>
                <router-link to="/sys/msg/list"><button class="btn fh">返回</button></router-link>
            </div>
          </div>
            
      </div>
    </div>
  </div>
</template>

<script>
import detailHead from '@/components/header/detailHead';
import { PUBLICS_GET_NOTICES_DETAILS } from '@/config/env';
import { formatDate } from '@/config/utils';

export default {
  name: 'detail',
  components: {
    'v-detail-head': detailHead,
  },
  data() {
    return {
      title: '',
      content: '',
      createDate: '',
    };
  },
  methods: {
    async init() {
      const res = await this.$http.get(`${PUBLICS_GET_NOTICES_DETAILS}${this.$route.params.id}`);
      if (res.success) {
        this.title = res.data.title;
        this.content = res.data.content;
        this.createDate = formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:ss');
      }
    },
  },
  mounted() {
    this.init();
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
.content{ padding: 40px;
  h3 {
    margin-bottom: 20px;
  }
}
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
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
    background-image: none;
    border: 1px solid transparent;
    border-radius: 25px;
    color: #fff;
    width: 180px;
    background-color: rgba(73,43,253,0);
    border-color: rgba(255,255,255,0.7);
}
.fh {
    width: 150px;
    margin: auto;
    color:#888;
    border-color: #888;
}
a {
  text-decoration: none;
}
</style>