<template>
  <div>
    <div class="index_more">
      <div class="index_chunk" style="padding: 40px 70px 20px;">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="form.cellphone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.declarerState" placeholder="请选择">
              <el-option
                v-for="(k, v) of stateObj"
                :key="v"
                :label="k"
                :value="v">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="补贴">
            <el-select v-model="form.subsidyState" placeholder="请选择">
              <el-option
                v-for="(k, v) of subsidyStateObj"
                :key="v"
                :label="k"
                :value="v">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search(1)">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <br/>
      <div class="index_chunk">
        <div class="t_nav">&#12288;我的推荐列表 </div>
        <div style="background:#f6f7fb;width:80%;position:absolute;top:28px;left:230px;height: 50px;">
          <div style="width: 30%;text-align: center;float: left;line-height: 50px;">工号：<b>{{myCode}}</b></div>
          <div style="width: 30%;text-align: center;float: left;line-height: 50px;">申报官申请地址：<a href="http://www.xxx.com">http://www.xxx.com</a></div>
          <div style="width: 30%;text-align: center;float: left;line-height: 50px;">申报机构申请地址：<a href="http://mp.cpsdb.com">http://mp.cpsdb.com</a></div>
          <div style="clear: both;"></div>
        </div>
        <hr>
        <span v-if="lists.length === 0">无数据</span>
        <div v-show="lists.length > 0">
          <table class="table">
            <thead>
              <tr>
                <th>姓名</th>
                <th>手机号码</th>
                <th>申请时间</th>
                <th>状态</th>
                <th>补贴</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of lists">
                <td>{{item.name}}</td>
                <td>{{item.tellphone}}</td>
                <td>{{item.createTime}}</td>
                <td>{{stateObj[item.state]}}</td>
                <td>{{subsidyStateObj[item.subsidyState]}}</td>
              </tr>
            </tbody>
          </table>
          <v-pagination :page="pages" @nextPage="search"></v-pagination>
          <div style="clear: both;"></div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import pagination from '@/components/pagination';
import { DECLARE_GET_RECOMMEND, DECLARE_GET_RECOMMEND_COUNT } from '@/config/env';
import { TRAFFIC_LIGHT } from '@/config/mapping';
import { formatDate } from '@/config/utils';

export default {
  name: 'recommendlist',
  data() {
    return {
      form: {
        name: null,
        cellphone: null,
        date: [],
        declarerState: null,
        subsidyState: null,
      },
      TRAFFIC_LIGHT,
      myCode: null,
      page: 1,
      rows: 20,
      lists: [],
      pages: 0,
      stateObj: {
        '': '请选择',
        waitPending: '待初审',
        waitAudit: '待审核',
        unpass: '未通过',
        passed: '已通过',
        delete: '删除中',
        deleted: '已删除',
      },
      subsidyStateObj: {
        '': '请选择',
        unapply: '未申请',
        pending: '待审核',
        rejected: '未通过',
        passed: '通过',
        delayed: '延后',
      },
      // colorObj: {
      //   red: 'color: red',
      //   yellow: 'color: #ec971f',
      //   green: 'color: #5cb85c',
      // },
    };
  },
  methods: {
    async search(page) {
      const param = {
        name: this.form.name,
        cellphone: this.form.cellphone,
        declarerState: this.form.declarerState,
        subsidyState: this.form.subsidyState,
        startDate: this.form.date[0] && formatDate(new Date(this.form.date[0]), 'yyyy-MM-dd hh:mm:ss'),
        endDate: this.form.date[1] && formatDate(new Date(this.form.date[1]), 'yyyy-MM-dd hh:mm:ss'),
        page: page || this.page,
        rows: this.rows,
      };
      const res = await this.$http.get(DECLARE_GET_RECOMMEND, param);
      if (res.success) {
        this.lists = res.data || [];
        this.lists.forEach((o) => {
          o.createTime = formatDate(new Date(o.createTime), 'yyyy-MM-dd hh:mm:ss');
        });
      }
      const res2 = await this.$http.get(DECLARE_GET_RECOMMEND_COUNT);
      if (res2.success) {
        this.pages = Math.ceil(res2.data / param.rows);
      }
    },
  },
  components: {
    'v-pagination': pagination,
  },
  mounted() {
    this.myCode = window.sessionStorage.getItem('recommendId');
    this.search();
  },
};
</script>

<style lang="scss" scoped>

.index_more{background: #f6f7fb;
    position: absolute;
    height: 100%;
    width: 100%;}
.index_chunk{ 
position: relative;
top:120px;
left: 19%;
margin: 0;
width: 78%;background:#fff; padding: 40px 70px 55px;border-radius: 4px; box-shadow: 0px 20px 20px -20px #ddd;}
.t_nav {
  border-left: #4786ff solid 3px;
  font-size: 18px;
}
table{ border:1px solid #eee; }
.table>thead>tr>th{ border-bottom: none; }
.table>thead>tr>th,.table>tbody>tr>td,.table>tbody>tr>th{ padding: 15px; }
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
