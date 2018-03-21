<template>
  <div class="row">
    <div class="col-sm-12" style="height: 80px;background-color: #fff;box-shadow: 1px 1px 3px #aaaaaa;padding: 10px;">
      <img :src="logo" style="margin-left: 60px;height: 60px; float: left;"></img>
      <h3 style="float: left;margin-left: 20px;line-height: 60px;">CPS 申报机构自主管理平台登录</h3>
      <button class="btn dl">登录</button>
    </div>
    <div class="col-sm-12" style="height: 165px;height: 165px;padding: 30px 60px;">
      <div style="height: 100px;background-color: #4786ff;border-radius: 10px;">
        <h3 style="float: left;margin-left: 100px;line-height: 64px;color: #fff;line-height: 100px">没有账号的，可申请成为CPS申报机构</h3>
        <button class="btn ljsq">立即申请</button>
      </div>
    </div>
    <div class="col-sm-12" style="padding: 30px;">
      <div class="col-sm-12" style="background-color: #fff;box-shadow:-1px -1px 1px #aaaaaa;">
        <h4 style="border-left: #4786ff solid 3px;margin-left: -15px;margin-top: 30px">
          <router-link to="/login">　首页</router-link>　>　申报机构
          　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　<small>联系申报机构请拨打 400-666-6666</small>
        </h4>
        <br/>
        <div class="row">
          <div class="col-sm-1">
            <div class="input-group">
              <select class="form-control">
                  <option value="">请选择省份</option>
                  <option value="goods">商品模板</option>
                  <option value="push">推送模板</option>
              </select>
            </div><!-- /input-group -->
          </div><!-- /.col-lg-6 -->
          <div class="col-sm-1">
            <div class="input-group">
              <select class="form-control">
                  <option value="">请选择市</option>
                  <option value="goods">商品模板</option>
                  <option value="push">推送模板</option>
              </select>
            </div><!-- /input-group -->
          </div><!-- /.col-lg-6 -->
          <div class="col-sm-1">
            <div class="input-group">
              <select class="form-control">
                  <option value="">请选择区/县</option>
                  <option value="goods">商品模板</option>
                  <option value="push">推送模板</option>
              </select>
            </div><!-- /input-group -->
          </div><!-- /.col-lg-6 -->
          <div class="col-sm-2">
            <div class="input-group">
               <input type="text" class="form-control"  placeholder="请输入机构名称或负责人" aria-label="...">
            </div><!-- /input-group -->
          </div><!-- /.col-lg-6 -->
          <div class="col-sm-2">
            <div class="input-group">
               <button class="btn ss">搜索</button>
            </div><!-- /input-group -->
          </div><!-- /.col-lg-6 -->
        </div><!-- /.row -->
        <br/>
        <table class="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>机构名称</th>
              <th>负责人</th>
              <th>负责区域</th>
              <th>地址</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
        <v-pagination :page="10" @nextPage="search"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/logo.png';
import pagination from '@/components/pagination';

export default {
  name: 'seeDetails',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      logo,
      pages: 1,
      rows: 20,
    };
  },
  components: {
    'v-pagination': pagination,
  },
  methods: {
    search() {

    },
  },
};
</script>

<style lang="scss" scoped>
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
.dl {
    width: 110px;
    margin: auto;
    color: #fff;
    border-color: rgb(1, 200, 83);
    background-color: rgb(1, 200, 83);
    position: absolute;
    right: 170px;
    top: 24px;
}
.ljsq {
    width: 150px;
    margin: auto;
    color:#fff;
    border-color: #fff;
    position: absolute;
    right: 170px;
    top: 65px;
}
.ss {
    width: 110px;
    margin: auto;
    color: #fff;
    border-color: rgb(1, 200, 83);
    background-color: rgb(1, 200, 83);
}
</style>