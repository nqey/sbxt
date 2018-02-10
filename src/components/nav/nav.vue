<template>
  <div>
      <div class="harder" id="header">
        <div class="header_con">
            <div class="header_content clearfix">
                <div class="pull-left">
                    <form class="navbar-form navbar-left">
                        <div class="form-group">
                            <input type="text" class="form-control header_search" placeholder="搜索">
                        </div>
                    </form>
                </div>
                <div class="pull-right">
                    <div class="dropdown">
                        <a class="tx" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <img :src="tx"/><span class="caret"></span>
                        </a>
                        <div class="dropdown-menu tc" aria-labelledby="dropdownMenu1"><img :src="tx"/>
                            <h5>{{username}}</h5>
                            <button class="btn" @click="logout" >退出登录</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="left_menu" id="left-menu">
        <div class="logo"><img :src="logo"/>
          <h3>中国商品诚信数据库<br/>
          <span>申报机构</span>管理后台</h3>
        </div>
        <div class="main-left_nav_list">
            <section class="sidebar">
                <ul class="sidebar-menu">
                    <li class="treeview"><router-link to="/bindEnterprise">添加</router-link></li>
                    <li class="treeview"><router-link to="/search">搜索</router-link></li>
                </ul>
            </section>
        </div>
      </div>
   </div>
</template>

<script>
import Logo from '@/assets/img/logo.png';
import Tx from '@/assets/img/tx.png';
import cookie from '@/components/tool/cookie';

export default {
  name: 'mynav',
  data() {
    return {
      username: cookie.getCookie('username'),
      logo: Logo,
      tx: Tx,
    };
  },
  methods: {
    logout() {
      cookie.delCookie('username');
      this.$router.push('/login');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@charset "utf-8";
/* CSS Document */
* {
    margin: 0;
    padding: 0;
}
img {
    max-width: 100%;
}
ul li {
    list-style-type: none;
}
.bj {
    background: #4063FF;
    height: 300px;
    position: fixed;
    width: 100%;
}
.harder {
    position: fixed;
    z-index: 100;
    background: #4063FF;
    height: 90px;
    width: 100%;
}
.header_con {
    position: relative;
    margin-left: 500px;
}
.header_content {
    position: absolute;
    width: 100%;
    z-index: 99;
    top: 15px;
    margin: auto;
    right: 160px;
}
.header_search::-webkit-input-placeholder { /* WebKit browsers */
 color: #fff;
}
.header_search::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
 color: #fff;
}
.header_search::-moz-placeholder { /* Mozilla Firefox 19+ */
 color: #fff;
}
 .header_search::-ms-input-placeholder { /* Internet Explorer 10+ */
 color: #fff;
}
.header_content .tx {
    display: block;
    margin-top: 10px;
    cursor: pointer;
}
.header_content .tx img {
    padding-right: 10px;
}
.header_content .tx span {
    color: #fff;
}
.header_content .tc {
    padding: 25px;
    text-align: center !important;
    left: -50px;
    top: 50px;
    min-width: 180px;
}
.header_content .tc h5 {
    font-weight: 600;
    line-height: 25px;
    padding: 10px 0;
}
.header_content .tc button {
    background: none;
    border: 1px solid #ccc;
    border-radius: 45px;
    padding: 4px 20px;
    color: #949494;
    font-size: 12px;
}
.left_menu {
    width: 240px;
    min-width: 240px;
    height: 100%;
    position: fixed;
    left: 0;
    background: #fff;
    background-size: 100% 100%;
    text-align: center;
    z-index: 101;
    overflow-y: auto;
    overflow-x: hidden;
}
 .left_menu::-webkit-scrollbar {
 width: 6px;
 height: 6px;
}
 .left_menu::-webkit-scrollbar-thumb {
 background: rgba(255, 255, 255, 0);
}
 .left_menu::-webkit-scrollbar-track {
 background: rgba(0, 0, 0, 0);
}
.logo {
    width: 240px;
    min-width: 240px;
    height: 250px;
    padding-top: 40px;
    text-align: center;
    display: list-item;
    background: #4063FF;
    position:fixed;
    z-index:102;
}
.logo h3 {
    color: #fff;
    line-height: 35px;
    font-size: 20px;
    font-weight: bold;
}
.main-left_nav_list {
    padding: 20px 0 60px 0;
    margin-top:250px;
}

/**MEMU*/
.sidebar-menu > li {
    position: relative;
    margin: 0;
    padding: 0;
}
.sidebar-menu > li > a {
    padding: 15px;
    display: block;
    color: #4e4e4e;
    font-size: 16px;
    border-left: 3px solid #fff;
}
.sidebar-menu > li > a img {
    width: 22px;
    margin-right: 20px;
}
.sidebar-menu > li:hover > a, .sidebar-menu > li.active > a {
    color: #015FE5;
}
.sidebar-menu > li.active > a {
    border-left: 3px solid #015FE5;
}

.sidebar-menu > li > .treeview-menu {
    background: #fbfbfb;/*  margin: 1px 0;*/
}
.sidebar-menu > li .label, .sidebar-menu > li .badge {
    margin-top: 3px;
    margin-right: 5px;
}
.sidebar-menu li > a > .fa-angle-left {
    width: auto;
    height: auto;
    padding: 0;
    margin-right: 10px;
    margin-top: 3px;
}
.sidebar-menu a {
    color: #b8c7ce;
    text-decoration: none;
}
.sidebar-menu .treeview-menu {
    display: none;
    list-style: none;
    padding: 0;
    margin: 0;
}
.sidebar-menu .treeview-menu .treeview-menu {
    padding-left: 20px;
}
.sidebar-menu .treeview-menu > li {
    margin: 0;
    padding: 10px 0;
}
.sidebar-menu .treeview-menu > li:hover, .sidebar-menu .treeview-menu > li.active {
    background: #e2e2e2;
}
.sidebar-menu .treeview-menu > li > a {
    display: block;
    font-size: 14px;
    color: #757575;
}
.header_content .header_search {
    background: none;
    border: 1px solid #fff;
    border-radius: 90px;
    height: 40px;
    width: 350px;
    color: #fff;
    padding: 6px 45px;
    background: url(/assets/img/fdj.png) no-repeat 15px;
    display: none;
}
</style>