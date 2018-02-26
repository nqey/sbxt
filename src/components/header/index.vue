<template>
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
</template>

<script>
import Tx from '@/assets/img/tx.png';
import { getCookie, delCookie } from '@/config/cookie';

export default {
  name: 'mhead',
  data() {
    return {
      username: getCookie('username'),
      tx: Tx,
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

.harder {
  position: fixed;
  z-index: 100;
  background: $bc;
  @include wh(100%, 90px);
}
.header_con {
  position: relative;
  margin-left: 500px;
}
.header_search {
  background: none;
  border: 1px solid #fff;
  @include borderRadius(90px);
  @include wh(350px, 40px);
  color: $fc;
  padding: 6px 45px;
  background: url(/assets/img/fdj.png) no-repeat 15px;
  display: none;
  &::-webkit-input-placeholder {
     color: $fc;
  }
  &::-moz-placeholder {
     color: $fc;
  }
  &::-ms-input-placeholder {
     color: $fc;
  }
}
.header_content {
  position: absolute;
  width: 100%;
  z-index: 99;
  top: 15px;
  margin: auto;
  right: 160px;
  .tx {
    display: block;
    margin-top: 10px;
    cursor: pointer;
    img {
      padding-right: 10px;
    }
    span {
      color: $fc;
    }
  }
  .tc {
    padding: 25px;
    text-align: center !important;
    left: -50px;
    top: 50px;
    min-width: 180px;
    h5 {
      font-weight: 600;
      line-height: 25px;
      padding: 10px 0;
    }
    button {
      background: none;
      border: 1px solid #ccc;
      border-radius: 45px;
      padding: 4px 20px;
      @include sc(12, #949494);
    }
  }
}
</style>