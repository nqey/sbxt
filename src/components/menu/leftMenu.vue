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
                <li v-for="item in items"> 
                    <a v-if="item.subItems && item.subItems.length>0" @click="item.open = !item.open;">
                      {{item.name}}
                      <span class="glyphicon ms" 
                        :class="{'glyphicon-menu-up': item.open, 'glyphicon-menu-down': !item.open}"></span>
                    </a>
                    <router-link v-else :to="item.link">{{item.name}}</router-link>
                    <ul v-if="item.subItems && item.subItems.length>0" v-show="item.open" class="treeview-menu"> 
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

export default {
  name: 'leftMenu',
  data() {
    return {
      rule: [],
      username: window.sessionStorage.getItem('username'),
      logo: Logo,
      items: [
        {
          name: '首页',
          link: '/index',
        },
        {
          name: '申报官',
          open: false,
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
          link: '/decEnt/entry',
        },
        {
          name: '企业列表',
          link: '/ent/list',
        },
        {
          name: '推荐列表',
          link: '/recommend/list',
        },
      ],
    };
  },
  mounted() {
    if (window.sessionStorage.getItem('type') === '1') {
      this.items.splice(1, 1);
      this.items[this.items.length - 1].link = '/recommend/officer/list';
    } else {
      this.items[this.items.length - 1].link = '/recommend/list';
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
  top: 25px;
}
.left_menu {
    width: 15%;
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
    @include wh(15%, 100%);
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
  
    min-width: 240px;
    padding-top: 40px;
    text-align: center;
    display: list-item;
    z-index:102;
    h3 {
        color: #fff;
        line-height: 35px;
        font-size: 20px;
    }
}

.main-left_nav_list {
    padding: 20px 0 60px 0;
    margin-top: 50px;
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
    padding:20px 15px;
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
}
.sidebar-menu > li > .treeview-menu > li {
  padding:20px 10px;
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
    padding: 20px 0;
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