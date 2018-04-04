<template>
  <div>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;帐号详情</span>
      <router-link to="/userdetail"><button class="btn btnDelete">取消</button></router-link>
      <router-link to="/useredit"><button class="btn js-ajax-submit">保存</button></router-link>
      <br/>
      <br/>
      <br/>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-1 txr">
            <label class="label_height">用户名：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <div v-show="isShowName">
              <span class="label_height">{{name}}&#12288;&#12288;</span>
              <span class="glyphicon glyphicon-edit" @click="editName"></span>
            </div>
            <div v-show="!isShowName">
              <input type="text" class="form-control iw600"  placeholder="请输入用户名" v-model="name">
              <span class="glyphicon glyphicon-floppy-saved" @click="editName"></span>
            </div>
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">密码：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="isShowPassword">
            <span class="label_height">{{password}}&#12288;&#12288;</span>
            <span class="glyphicon glyphicon-edit" @click="editPassword"></span>
          </div>
          <div v-show="!isShowPassword">
            <input type="text" class="form-control iw600"  placeholder="请输入密码" v-model="password">
            <span class="glyphicon glyphicon-floppy-saved" @click="editPassword"></span>
          </div>
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">选择对象：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <div v-show="isShowDeclarer">
              <span class="label_height">{{declarer}}&#12288;&#12288;</span>
              <span class="glyphicon glyphicon-edit" @click="editDeclarer"></span>
            </div>
            <div v-show="!isShowDeclarer">
              <select class="form-control" @change="setDeclarer($event)" v-model="declarerId">
                <option>请选择</option>
                <option v-for="item of targets" :value="item.id">{{item.name}}</option>
              </select>
              <span class="glyphicon glyphicon-floppy-saved" @click="editDeclarer"></span>
            </div>
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">权限功能：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="isShowrole">
            <span class="label_height" v-for="r of role">{{r}}&#12288;&#12288;&#12288;</span>
            <span class="glyphicon glyphicon-edit" @click="editRole"></span>
          </div>
          <div v-show="!isShowrole">
            <input type="checkbox" @change="setRole" v-model="a"/> 企业申报&#12288;&#12288;&#12288;<span class="glyphicon glyphicon-floppy-saved" @click="editRole"></span>
            <br/>
            <input type="checkbox" @change="setRole" v-model="b"/> 企业列表  
            <br/>
            <input type="checkbox" @change="setRole" v-model="c"/> 推荐列表  
          </div>
        </div>
        <div class="form-group col-sm-1 txr">
           <label class="label_height">操作历史：</label>
        </div>
        <div class="form-group col-sm-11 imb">
           <span class="label_height">待定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import upload from '@/components/upload';
import bigImg from '@/components/bigImg';

export default {
  name: 'search',
  data() {
    return {
      showImg: false,
      isShowName: true,
      isShowPassword: true,
      isShowrole: true,
      isShowDeclarer: true,
      id: '001',
      declarer: '申报官姓名',
      declarerId: '001',
      name: '用户名',
      password: '密码',
      role: ['申报企业', '企业列表', '推荐列表'],
      targets: [],
      a: true,
      b: true,
      c: true,
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
    editName() {
      this.isShowName = !this.isShowName;
    },
    editDeclarer() {
      this.isShowDeclarer = !this.isShowDeclarer;
    },
    editPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    editRole() {
      this.isShowrole = !this.isShowrole;
    },
    setRole() {
      this.role = [];
      if (this.a) {
        this.role.push('申报企业');
      }
      if (this.b) {
        this.role.push('企业列表');
      }
      if (this.c) {
        this.role.push('推荐列表');
      }
    },
    setDeclarer(el) {
      this.declarer = el.target.options[el.target.options.selectedIndex].innerHTML;
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
    float: right;
    width: 120px;
    height: 35px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
    margin-right: 10px;
}
.btnDelete {
    float: right;
    width: 120px;
    height: 35px;
    margin: auto;
    color:#999;
    background: #fff;
    border:1px #999 solid;
}
</style>