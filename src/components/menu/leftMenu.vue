<template>
  <div class="left_menu" id="left-menu">
    <div class="logo"><img :src="logo"/>
      <br/>
      <br/>
      <h3>CPS申报机构</h3>
      <h3>自主管理平台</h3>
    </div>
    <div class="main-left_nav_list">
        <section class="sidebar">
            <ul class="sidebar-menu">
<!--                 <li class="treeview"><router-link to="/bindEnterprise">添加</router-link></li>
                <li class="treeview"><router-link to="/search">搜索</router-link></li> -->
                <li v-for="item in items"> 
                    <a v-if="item.haveSub" @click="showToggle(item)">
                      {{item.name}}
                      <span v-show="item.isSubShow" class="glyphicon glyphicon-menu-up ms"></span>
                      <span v-show="!item.isSubShow" class="glyphicon glyphicon-menu-down ms"></span>
                    </a> 
                    <router-link v-else :to="item.link">{{item.name}}</router-link>
                    <ul v-if="item.haveSub" v-show="item.isSubShow" class="treeview-menu"> 
                      <li v-for="subItem in item.subItems"> 
                        <router-link :to="subItem.link">{{subItem.name}}</router-link>
                      </li> 
                    </ul> 
                </li> 
            </ul>
        </section>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/img/logo.png';
import { getCookie, delCookie } from '@/config/cookie';

export default {
  name: 'leftMenu',
  data() {
    return {
      rule: [],
      username: getCookie('username'),
      logo: Logo,
      items: [
        {
          name: '首页',
          haveSub: false,
          link: '/index',
          id: 1,
        },
        {
          name: '申报官',
          isSubShow: false,
          haveSub: true,
          id: 2,
          subItems: [
            {
              name: '添加申报官',
              link: '/officer/entry',
            },
            {
              name: '申报官列表',
              link: '/officer/list',
            },
          ],
        },
        {
          name: '企业申报',
          haveSub: false,
          rule: '1',
          link: '/decEnt/entry',
          id: 3,
        },
        {
          name: '企业列表',
          haveSub: false,
          rule: '2',
          link: '/ent/list',
          id: 4,
        },
        {
          name: '推荐列表',
          haveSub: false,
          rule: '3',
          link: '/recommend/list',
          id: 5,
        },
        {
          name: '权限管理',
          haveSub: true,
          isSubShow: false,
          id: 6,
          subItems: [
            {
              name: '添加账户',
              link: '/user/entry',
            },
            {
              name: '帐号列表',
              link: '/user/list',
            },
          ],
        },
      ],
    };
  },
  methods: {
    logout() {
      delCookie('username');
      this.$router.push('/login');
    },
    showToggle(item) {
      item.isSubShow = !item.isSubShow;
    },
  },
  mounted() {
    if (getCookie('rule') !== 'undefined') {
      this.items[1].subItems.splice(1, 1);
      this.items.splice(this.items.length - 1, 1);
      this.rule = getCookie('rule');
      this.items.forEach((o, i) => {
        if (o.rule) {
          if (this.rule.indexOf(o.rule) === -1) {
            this.items.splice(i, 1);
          }
        }
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.ms {
  position: absolute;
  right: 35px;
  top: 20px;
}
.left_menu {
    min-width: 240px;
    position: fixed;
    left: 0;
    /*background: #4063FF;*/
    background-image: linear-gradient(to bottom,  rgb(73,43,253) , rgb(51,141,255));
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
        background: rgba(255, 255, 255, 0.2);
    }
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
    }
}
.logo {
    @include wh(240px, 250px);
    min-width: 240px;
    padding-top: 40px;
    text-align: center;
    display: list-item;
    /*background: #4063FF;*/
    position:fixed;
    z-index:102;
    h3 {
        color: #fff;
        line-height: 35px;
        font-size: 20px;
    }
}

.main-left_nav_list {
    padding: 20px 0 60px 0;
    margin-top:250px;
}
.main-left_nav_list ul li a {
    color: #fff;
}

.sidebar-menu > li {
    position: relative;
    margin: 0;
    padding: 0;
}
.sidebar-menu > li > a {
    padding: 15px;
    display: block;
    color: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0);
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    font-size: 16px;
}
.sidebar-menu > li > a img {
    width: 22px;
    margin-right: 20px;
}
.sidebar-menu > li:hover > a, .sidebar-menu > li.active > a {
    color: #fff;
    background: #3b8fff;
}
.active {
  background: #3b8fff;
}
.sidebar-menu > li:hover > a {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.sidebar-menu > li > .treeview-menu {
    background: #472efc;
    margin: 1px 0;
    padding: 0 20px;
}
.sidebar-menu > li > .treeview-menu > li {
    border-bottom: 1px solid #3d66fc;
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
    /*display: none;*/
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
    background: #3b8fff;
}
.sidebar-menu .treeview-menu > li > a {
    display: block;
    font-size: 14px;
    color: #fff;
}
</style>