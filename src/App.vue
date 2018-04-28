<template>
  <div id="app">
  	<v-top-head v-if="isShowMenu"></v-top-head>
    <v-left-menu v-if="isShowMenu"></v-left-menu>
    <v-contact></v-contact>
    <router-view/>
  </div>
</template>

<script>
import vTopHeader from '@/components/header/topHeader';
import vLeftMenu from '@/components/menu/leftMenu';
import contact from '@/components/contact';
import { getCookie } from '@/config/cookie';

export default {
  name: 'app',
  data() {
    return {
      isShowMenu: false,
    };
  },
  components: {
    'v-top-head': vTopHeader,
    'v-left-menu': vLeftMenu,
    'v-contact': contact,
  },
  watch: {
    $route: 'checkLogin',
  },
  methods: {
    checkLogin() {
      const arr = ['step', 'login', 'sys/msg', 'agency', 'reset'];
      if (location.hash === '#/') {
        this.$router.push('/login');
        return;
      }
      this.match(arr);
      if (this.isShowMenu && !getCookie('token')) {
        // 如果没有登录状态则跳转到登录页
        this.$router.push('/login');
      }
    },
    match(arr) {
      this.isShowMenu = arr.every((d) => {
        const r = !location.hash.match(d);
        return r;
      });
    },
  },
};
</script>

<style lang="scss">
  @import 'assets/css/common.scss';
</style>
