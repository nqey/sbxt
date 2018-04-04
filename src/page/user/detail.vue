<template>
  <div>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;帐号详情</span>
      <button class="btn btnDelete">删除</button>
      <router-link to="/useredit"><button class="btn js-ajax-submit">修改</button></router-link>
      <br/>
      <br/>
      <br/>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-1 txr">
            <label class="label_height">用户名：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <span class="label_height">{{name}}&#12288;&#12288;</span>
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">密码：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <span class="label_height">{{password}}&#12288;&#12288;</span>
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">选择对象：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <span class="label_height">{{declarer}}&#12288;&#12288;</span>
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">权限功能：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <span class="label_height" v-for="r of role">{{r}}&#12288;&#12288;&#12288;</span>
        </div>
        <div class="form-group col-sm-1 txr">
           <label class="label_height">操作历史：</label>
        </div>
        <div class="form-group col-sm-11 imb">
           <span class="label_height">待定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'userdetail',
  data() {
    return {
      id: '001',
      declarer: '申报官姓名',
      declarerId: '001',
      name: '用户名',
      password: '密码',
      role: ['申报企业', '企业列表', '推荐列表'],
    };
  },
  methods: {
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
    float: right;
    width: 120px;
    height: 35px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
    margin-right: 10px;
}
.btnDelete {
    float: right;
    width: 120px;
    height: 35px;
    margin: auto;
    color:#999;
    background: #fff;
    border:1px #999 solid;
}
</style>