<template>
  <div>
    <div class="bs-example">
  		<span class="t_nav">&#12288;通知详情</span>
		<br/>
        <br/>
        <br/>
        <div class="col-sm-12" style="text-align: center;">
            <h3>{{title}}</h3>
            <span style="line-height: 60px">{{createDate}}</span>
    		<br/>
    		    {{content}}
        </div>
        <div class="col-sm-12" style="padding: 30px;text-align: center;">
            <router-link to="/index"><button class="btn fh">返回</button></router-link>
        </div>
        <div style="clear: both;"></div>
	</div>
  </div>
</template>

<script>
import { PUBLICS_GET_NOTICES_DETAILS } from '@/config/env';
import { formatDate } from '@/config/utils';

export default {
  name: 'detail',
  props: {
    value: {
      type: String,
    },
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
      const res = await this.$xhr('get', `${PUBLICS_GET_NOTICES_DETAILS}${this.$route.params.id}`);
      if (res.data.code === 0) {
        this.title = res.data.data.title;
        this.content = res.data.data.content;
        this.createDate = formatDate(new Date(res.data.data.createTime), 'yyyy-MM-dd');
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0px 55px;
}
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
.t_nav {
  border-left: #4786ff solid 3px;
  margin-left: -30px;
  /*font-weight: bold;*/
  font-size: 18px;
}
a {
  text-decoration: none;
}
</style>