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
import { getCookie, delCookie } from '@/config/cookie';

export default {
  name: 'menu',
  data() {
    return {
      username: getCookie('username'),
      logo: Logo,
    };
  },
  methods: {
    logout() {
      delCookie('username');
      this.$router.push('/login');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

.left_menu {
    min-width: 240px;
    position: fixed;
    left: 0;
    background: #fff;
    background-size: 100% 100%;
    text-align: center;
    z-index: 101;
    overflow-y: auto;
    overflow-x: hidden;
    @include wh(240px, 100%);
    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0);
    }
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0);
    }
}

.logo {
    @include wh(240px, 250px);
    min-width: 240px;
    padding-top: 40px;
    text-align: center;
    display: list-item;
    background: #4063FF;
    position:fixed;
    z-index:102;
    h3 {
        color: #fff;
        line-height: 35px;
        font-size: 20px;
        font-weight: bold;
    }
}

.main-left_nav_list {
    padding: 20px 0 60px 0;
    margin-top:250px;
}

.sidebar-menu {
    a {
        color: #b8c7ce;
        text-decoration: none;
    }
    li {
        position: relative;
        margin: 0;
        padding: 0;
        a {
            padding: 15px;
            display: block;
            color: #4e4e4e;
            font-size: 16px;
            border-left: 3px solid #fff;
            img {
                width: 22px;
                margin-right: 20px;
            }
        }
        &:hover {
            a {
                color: #015FE5;
            }
        }
    }
}
</style>