<template>
  <div>
    <v-lhead ></v-lhead>
    <div class="col-sm-12 container">
      <div class="col-sm-12 bs-example">
        <span class="t_nav"><router-link to="/login">&#12288;首页</router-link>&#12288;>&#12288;申报机构</span>
        <small>&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;联系申报机构请拨打 400-666-6666</small>
        <br/>
        <br/>
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
import lhead from '@/components/registerHead/lhead';

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
    'v-lhead': lhead,
  },
  methods: {
    search() {

    },
  },
};
</script>

<style lang="scss" scoped>
.ss {
    width: 110px;
    margin: auto;
    color: #fff;
    border-color: rgb(1, 200, 83);
    background-color: rgb(1, 200, 83);
}
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
small {
  color: #999;
}
</style>