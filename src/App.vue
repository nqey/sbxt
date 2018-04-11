<template>
  <div id="app">
  	<v-head v-if="showMenu"></v-head>
    <v-lmenu v-if="showMenu"></v-lmenu>
    <router-view/>
  </div>
</template>

<script>
import vhead from '@/components/header';
import lmenu from '@/components/leftMenu';
import { getCookie } from '@/config/cookie';

export default {
  name: 'app',
  data() {
    return {
      showMenu: false,
    };
  },
  components: {
    'v-head': vhead,
    'v-lmenu': lmenu,
  },
  watch: {
    $route: 'checkLogin',
  },
  methods: {
    checkLogin() {
      const arr = ['step', 'login', 'sys/msg', 'agency', 'reset'];
      this.match(arr);
      if (this.showMenu && !getCookie('token')) {
        // 如果没有登录状态则跳转到登录页
        this.$router.push('/login');
      }
    },
    match(arr) {
      this.showMenu = arr.every((d) => {
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
