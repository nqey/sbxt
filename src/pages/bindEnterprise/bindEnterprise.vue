<template> 
  <div>
    <v-nav></v-nav>
    <div style="height: 262px;"></div>
    <div class="container">
      <div class="content_list_list">
        <h4>绑定企业</h4>
        <div class="content_list_list_search">
          <table cellpadding="2" cellspacing="1" class="tb">
            <tbody>
              <tr>
                <td>
                  <div style="position: relative;">
                    <label>输入企业名称：</label>
                    <input type="text" size="50" v-model="enterpriseName" value="" title="关键词">
                    &nbsp;
                    <input type="submit" @click="bindEnterprise" class="btn btn-success" value="添 加">
                    <span :class="{errInfo: isErrInfo, successInfo: isSuccessInfo}" v-show="showTishi">{{tishi}}</span>
                    &nbsp;
                    <div class="bdsug" style="height: auto;" v-show="showKeywords">
                      <ul>
                        <li v-for="key in keywords">
                          {{ key.enterpriseName }}
                        </li>
                      </ul>
                    </div>
                  </div> 
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import nav from '@/components/nav/nav';
import Global from '@/components/tool/Global';
import utils from '@/components/tool/utils';

export default {
  name: 'enterprise',
  data() {
    return {
      enterpriseName: '',
      enterpriseId: '',
      showTishi: false,
      tishi: '',
      keywords: [],
      showKeywords: false,
      isErrInfo: false,
      isSuccessInfo: false,
    };
  },
  components: {
    'v-nav': nav,
  },
  methods: {
    bindEnterprise() {
      const params = {
        enterpriseName: this.enterpriseName,
      };
      axios.post(Global.ENTERPRISE_BIND_DECLAREORG_ADDRESS,
        utils.toFormData(params),
      ).then((res) => {
        if (res.data.code === 0) {
          this.tishi = '绑定企业成功';
          this.showTishi = true;
          this.isErrInfo = false;
          this.isSuccessInfo = true;
          setTimeout(() => { this.showTishi = false; }, 2000);
        } else {
          this.tishi = res.data.message;
          this.showTishi = true;
          this.isErrInfo = true;
          this.isSuccessInfo = false;
        }
      });
    },
  },
};
</script>

<style>
.errInfo {
 color: red;
}
.successInfo {
 color: green;
}
.bdsug ul li {
  display: list-item;
}
.bdsug {
  position: absolute;
  z-index: 1;
  width: 400px;
  left: 89px;
  background: #fff;
  border: 1px solid #ccc;
  _overflow: hidden;
  box-shadow: 1px 1px 3px #ededed;
  -webkit-box-shadow: 1px 1px 3px #ededed;
  -moz-box-shadow: 1px 1px 3px #ededed;
  -o-box-shadow: 1px 1px 3px #ededed;
}
.bdsug li {
  width: 100%;
  color: #000;
  font: 14px arial;
  line-height: 22px;
  padding: 0 8px;
  position: relative;
  cursor: default;
}
p, form, ol, ul, li, dl, dt, dd, h3 {
  margin: 0;
  padding: 0;
  list-style: none;
}
.bdsug ul li b{display: inline;}
.bdsug ul{display: block;}
.bdsug ul li:hover
{ 
  background-color:#eee;
}
</style>
