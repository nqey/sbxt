<template>
  <div>
    <v-head></v-head>
    <v-lmenu></v-lmenu>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;帐号列表</span>
      <br/>
      <br/>
      <br/>
      <table class="table table-bordered">
          <thead>
            <tr>
              <th>姓名</th>
              <th>帐号</th>
              <th>密码</th>
              <th>权限</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td style="color: #ac2925;">Otto <span class="glyphicon glyphicon-question-sign"></span></td>
              <td>@mdo</td>
              <td><a>查看</a> <a>删除</a> <a>修改</a></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import vhead from '@/components/header';
import lmenu from '@/components/leftMenu';
import upload from '@/components/upload';
import imgenlarge from '@/components/imgEnlarge';

export default {
  name: 'search',
  data() {
    return {
      showImg: false,
    };
  },
  methods: {
    enlarge(src) {
      this.imgSrc = src;
      this.showImg = true;
    },
    viewImg() {
      this.showImg = false;
    },
  },
  components: {
    'v-head': vhead,
    'v-lmenu': lmenu,
    'v-upload': upload,
    'v-imgenlarge': imgenlarge,
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
