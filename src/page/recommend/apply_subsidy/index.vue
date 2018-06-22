<template>
  <div class="index_more">
      <div class="index_chunk">
          <div class="t_nav">&#12288;申请提现</div>
          <hr/>
          <br>
          <div class="row">
            <div class="col-sm-7">
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="col-sm-2 control-label">提现金额</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control"  placeholder="请输入金额" disabled v-model="money">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">开户名</label>
                  <div class="col-sm-10">
                    <input type="text" class="v-validator form-control" v-validator="validator.name" placeholder="请输入开户名" v-model="form.name">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">开户行</label>
                  <div class="col-sm-10">
                    <select class="form-control" v-model="form.bankId">
                      <option v-for="v of bankList" :value="v.bankId">{{v.bankName}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">支行</label>
                  <div class="col-sm-10">
                    <input type="text" class="v-validator form-control" v-validator="validator.bankBranch" placeholder="请精确到支行名称，否则无法到账" v-model="form.bankBranch">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">开户行账号</label>
                  <div class="col-sm-10">
                    <input type="text" class="v-validator form-control" v-validator="validator.bankCard" placeholder="请输入银行账号" v-model="form.bankCard">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">手机号码</label>
                  <div class="col-sm-10">
                    <input type="text" class="v-validator form-control" v-validator="validator.cellphone" placeholder="请输入手机号" v-model="form.cellphone">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">验证码</label>
                  <div class="col-sm-10">
                    <div class="row">
                      <div class="col-sm-10">
                        <input type="text" v-validator="validator.code" class="v-validator form-control" placeholder="请输入手机验证码" v-model="form.code">
                      </div>
                      <div class="col-sm-2">
                        <button type="button" class="btn btn-primary" @click="sendMsg" :disabled="isDisabled">{{buttonName}}</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-10">
                    <button type="button" class="btn btn-primary" v-validator-submit style="width: 100%">确认提现</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-sm-offset-1 col-sm-4">
              <div class="row">
                <div class="col-sm-12" style="margin-left: -15px;">
                  选择已添加银行卡
                </div>
              </div>
              <div class="card row" v-for="item of data" tabindex="-1" @click="setTi(item)">
                <div class="col-sm-3" style="margin-right: -15px;">
                  <img :src="getPictureUrl(item.logo, { w: 40, h: 40, q: 40 })">
                </div>
                <div class="col-sm-9">
                  <div>{{item.bankName}}</div>
                  <div>储蓄卡</div>
                  <div style="margin-top: 20px;">{{item.bankCard}}</div>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import { ORGANIZ_SUBSIDY_WITHDRAW, ORGANIZ_SUBSIDY_WITHDRAW_RECOMMEND, DECLARE_GET_VALIDATECODE,
   ORGANIZ_DECLARER_RECOMMEND_AMOUNT, PUBLICS_BANK_LIST } from '@/config/env';
  import { getPictureUrl } from '@/config/utils';

  export default {
    name: 'apply_subsidy',
    data() {
      return {
        bankList: [],
        buttonName: '发送验证码',
        isDisabled: false,
        time: 60,
        validator: {
          cellphone: {
            type: ['required', 'cellphone'],
          },
          code: {
            type: ['required'],
          },
          bankBranch: {
            type: ['required'],
          },
          name: {
            type: ['required'],
          },
          bankCard: {
            type: ['required'],
          },
        },
        form: {
          bankId: null,
          bankBranch: null,
          name: null,
          bankCard: null,
          cellphone: null,
          code: null,
        },
        money: 0,
        data: [],
        getPictureUrl,
      };
    },
    methods: {
      setTi(d) {
        this.form.bankId = d.bankId;
        this.form.bankBranch = d.bankBranch;
        this.form.name = d.name;
        this.form.bankCard = d.bankCard;
      },
      async getBank() {
        const res = await this.$http.get(ORGANIZ_SUBSIDY_WITHDRAW);
        if (res.success) {
          this.data = res.data;
          const d = (res.data[0] || {});
          this.form.bankId = d.bankId;
          this.form.bankBranch = d.bankBranch;
          this.form.name = d.name;
          this.form.bankCard = d.bankCard;
        }
      },
      async getBankList() {
        const res = await this.$http.get(PUBLICS_BANK_LIST);
        if (res.success) {
          this.bankList = res.data;
          this.form.bankId = res.data[0].bankId;
        }
      },
      async getMoney() {
        const res = await this.$http.get(ORGANIZ_DECLARER_RECOMMEND_AMOUNT);
        if (res.success) {
          this.money = res.data;
        }
      },
      async sendMsg() {
        const me = this;
        me.isDisabled = true;
        const interval = window.setInterval(() => {
          me.buttonName = me.time;
          me.time -= 1;
          if (me.time < 0) {
            me.buttonName = '重新发送';
            me.time = 60;
            me.isDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
        await this.$http.get(`${DECLARE_GET_VALIDATECODE}withaw/${this.form.cellphone}`);
      },
      async commit() {
        const res = await this.$http.post(ORGANIZ_SUBSIDY_WITHDRAW_RECOMMEND, this.form);
        if (res.success) {
          this.$router.push('/subsidy/successful');
          window.console.log('访问成功！！！');
        }
      },
    },
    mounted() {
      this.getMoney();
      this.getBank();
      this.getBankList();
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.index_more{background: #f6f7fb;
  height: 100%;
  padding-bottom: 200px;
    width: 100%;}
.index_chunk{ 
position: relative;
top:120px;
left: 19%;
margin: 0;
width: 78%;background:#fff; padding: 40px 70px 55px;border-radius: 4px; box-shadow: 0px 20px 20px -20px #ddd;}
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
.title{
  font-size: 20px;
  font-weight: 600;
  padding-left: 27px;
}
.card{
  width: 250px;
  height: 120px;
  display: block;
  border-radius: 5px;
  margin-top: 25px;
  padding-top: 20px;
  background: linear-gradient(left, #f57373 , #ffe484);
  background: -moz-linear-gradient(left, #f57373 , #ffe484);
  background: -o-linear-gradient(left, #f57373 , #ffe484);
  background: -webkit-linear-gradient(left,#f57373 , #ffe484);
}
.card > div{
  color: #fff;
}
.card:focus {
  outline: dotted 3px #f70a0a
}
.t_nav {
  border-left: #4786ff solid 3px;
  font-size: 18px;
}

</style>