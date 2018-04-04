<template> 
  <div>
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
import { ENTERPRISE_BIND_DECLAREORG_ADDRESS } from '@/config/env';

export default {
  name: 'enterprise',
  data() {
    return {
      enterpriseName: '',
      enterpriseId: '',
      showTishi: false,
      tishi: '',
      isErrInfo: false,
      isSuccessInfo: false,
    };
  },
  methods: {
    async bindEnterprise() {
      const data = {
        enterpriseName: this.enterpriseName,
      };
      const res = await this.$xhr('post', ENTERPRISE_BIND_DECLAREORG_ADDRESS, data);
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
.content_list_list {
  background: #fff;
  padding: 20px 30px;
  border-radius: 8px;
}
.content_list_list_search {
  padding: 10px;
}
</style>
