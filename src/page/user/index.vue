<template>
  <div>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;添加帐号</span>
      <br/>
      <br/>
      <br/>
        
      <div class="form-inline clearfix">
        <div class="form-group col-sm-1 txr">
            <label class="label_height">用户名：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <input type="text" class="form-control iw600"  placeholder="请输入用户名" v-model="name">
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">密码：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <input type="text" class="form-control iw600"  placeholder="请输入密码" v-model="password">
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">选择对象：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <select class="form-control" v-model="declarerId">
            <option>请选择</option>
  		      <option v-for="item of targets" value="item.id">{{item.name}}</option>
  		    </select>
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">选择功能：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <input type="checkbox" v-model="a"/> 企业申报  
            <br/>
            <input type="checkbox" v-model="b"/> 企业列表  
            <br/>
            <input type="checkbox" v-model="c"/> 推荐列表  
        </div>
          <div class="form-group col-sm-1 txr">
          </div>
          <div class="form-group col-sm-11 imb">
              <button class="btn js-ajax-submit" @click="submit">添加</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import upload from '@/components/upload';
import bigImg from '@/components/bigImg';

export default {
  name: 'user',
  data() {
    return {
      name: '',
      password: '',
      declarerId: '',
      function: [],
      a: '',
      b: '',
      c: '',
      showImg: false,
      targets: [],
      obj: {},
    };
  },
  methods: {
    bigimg(src) {
      this.imgSrc = src;
      this.showImg = true;
    },
    viewImg() {
      this.showImg = false;
    },
    submit() {
      this.obj.name = this.name;
      this.obj.password = this.password;
      this.obj.declarerId = this.declarerId;
      this.obj.function = [];
      this.obj.function.push(this.a ? 1 : 0);
      this.obj.function.push(this.b ? 1 : 0);
      this.obj.function.push(this.c ? 1 : 0);
      // console.log(this.obj);
    },
    search() {
      this.targets = [
        {
          id: '1',
          name: '李银',
        },
        {
          id: '2',
          name: '孔清',
        },
        {
          id: '3',
          name: '刘超',
        },
        {
          id: '4',
          name: '张月',
        },
      ];
    },
  },
  components: {
    'v-upload': upload,
    'v-bigimg': bigImg,
  },
  mounted() {
    this.search();
  },
};
</script>

<style lang="scss" scoped>

.bs-example {
    position: relative;
    top: 120px;
    left: 275px;
    margin: 0;
    width: 84%;
    background-color: #fff;
    border: 1px solid #ddd;
    -webkit-border-top-left-radius: 4px;
    -webkit-border-top-right-radius: 4px;
    -moz-border-radius-topleft: 4px;
    -moz-border-radius-topright: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
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
.txr {
  text-align: right;
}
.txc {
  text-align: center;
}
.iw {
  width: 300px;
}
.iw600 {
  width: 600px;
}
.label_height {
  line-height: 35px;
}
.imb {
  margin-bottom: 30px;
}
.info {
  color: #ac2925;
}
.areafc {
  color: #999;
}
.js-ajax-submit {
    width: 350px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
}
</style>
