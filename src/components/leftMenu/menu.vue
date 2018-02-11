<template>
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
</template>

<script>
import Logo from '@/assets/img/logo.png';
import cookie from '@/components/tool/cookie';

export default {
  name: 'menu',
  data() {
    return {
      username: cookie.getCookie('username'),
      logo: Logo,
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
@import '../../assets/css/common.scss';
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