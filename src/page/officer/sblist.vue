<template>
  <el-container>
    <el-header class="fix" :style="styleObj">
      <h2 class="demo-color-box">申报官认证通过名单</h2>
      <div style="height: 10px;"></div>
      <el-form label-width="100px" class="demo-dynamic" label-position="left">
        <el-form-item label="姓　　名" prop="name">
          <el-input v-model="name" placeholder="请输入申报官姓名"></el-input>
        </el-form-item>
        <el-form-item label="推荐人工号" prop="cellphone">
          <el-input v-model="cellphone" placeholder="请输入推荐人手机号码"></el-input>
        </el-form-item>
        <el-form-item class="submit">
          <el-button
            type="primary"
            @click="openFullScreen"
            v-loading.fullscreen.lock="fullscreenLoading">
            检索
          </el-button>
          &#12288;
          &#12288;
          <div class="el-icon-d-arrow-right an" style="transform:rotate(-90deg); font-size: 20px;"  @click="styleObj.height = '0px !important'"></div>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <div class="el-icon-d-arrow-right an" style="position: fixed;font-size: 20px;right: 180px;z-index: 99;transform:rotate(90deg);" @click="styleObj.height = '270px !important'"></div>
      <div :style="styleObj"></div>
      <!-- <hr/> -->
      <el-row v-for="(o, index) in data" :key="o.name">
        <el-col>
          <div style="height: 20px;"></div>
          <el-card :body-style="{ padding: '0px' }">
            <img :src="IMAGE_SERVER_URL + o.portrait" class="image">
            <div style="padding: 15px;">
              <span>{{o.name}}</span>
            </div>
            <hr style="border-top: 1px solid #3c6cda;margin-top: 0px;margin-bottom:0px;"/>
            <div style="padding: 15px;">
              <small>{{o.organizName || '无' }}</small>
              <a type="text" class="button">查看详情</a>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { PUBLICS_DECLARER_LIST, IMAGE_SERVER_URL } from '@/config/env';

export default {
  data() {
    return {
      IMAGE_SERVER_URL,
      name: null,
      cellphone: null,
      currentDate: new Date(),
      page: 1,
      row: 5,
      data: [],
      fullscreenLoading: false,
      styleObj: {
        height: '270px !important',
        transition: 'height 0.4s',
      },
    };
  },
  methods: {
    async init() {
      const params = {
        name: this.name,
        cellphone: this.cellphone,
        row: this.row,
        page: this.page,
      };
      const res = await this.$http.get(PUBLICS_DECLARER_LIST, params);
      this.fullscreenLoading = true;
      if (res.success) {
        this.data = Object.assign({}, this.data, res.data);
        this.fullscreenLoading = false;
      }
    },
    getScrollTop() {
      // 考虑到浏览器版本兼容性问题，解析方式可能会不一样
      return document.documentElement.scrollTop || document.body.scrollTop;
    },
    getWinHeight() {
      // 浏览器可见内容高度 || 浏览器所有内容高度(考虑到浏览器版本兼容性问题，解析方式可能会不一样)
      return document.documentElement.clientHeight || document.body.clientHeight;
    },
    getScrollHeight() {
      let bodyScrollHeight = 0;
      let documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      // 当页面内容超出浏览器可视窗口大小时，Html的高度包含body高度+margin+padding+border所以html高度可能会大于body高度
      const a = bodyScrollHeight - documentScrollHeight > 0;
      const rs = a ? bodyScrollHeight : documentScrollHeight;
      return rs;
    },
    isReachBottom() {
      // 获取滚动条的高度
      const scrollTop = this.getScrollTop();
      // 一屏的高度
      const winHeight = this.getWinHeight();
      // 获取文档总高度
      const scrollHeight = this.getScrollHeight();
      return scrollTop >= window.parseInt(scrollHeight) - winHeight;
    },
    openFullScreen() {
      this.data = [];
      this.page = 1;
      this.init();
    },
  },
  mounted() {
    const f = () => {
      if (this.isReachBottom()) {
        this.page = this.page + 1;
        this.init();
      }
    };
    window.addEventListener('scroll', f);
  },
};

</script>
<style lang="scss" scoped>
@keyframes drop {
  0%   { opacity: 0;}
  30%  { opacity: 1;}
  100% { opacity: 0;}
}
.an {
  animation-name: drop;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-play-state: running;
}

.demo-color-box {
    padding: 20px;
    margin: 5px 0;
    height: 74px;
    /*color: #fff;*/
    text-align: center;
    border-bottom: 1px solid #dcdfe6;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

/*.hhh {
  height: 0px;
  overflow: hidden;
  transition:height 0.4s;
}
.el-card:hover .hhh {
  height: 50px;
}*/

.fix {
  position: fixed;
  z-index: 999;
  width: 100%;
  /*height: 0px !important;*/
  background-color: #fff;
  overflow: hidden;
  transition:height 0.4s;
}
</style>
