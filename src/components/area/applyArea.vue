<template>
  <div>
    <div class="form-group">
      <div class="col-sm-4">
        <select v-show="provinces.length > 0" class='form-control' @change="queryCity" v-model="province">
          <option value="">请选择省份</option>
          <option v-for="item in provinces" :value="item.code">{{item.text}}</option>
        </select>
      </div>
      <div class="col-sm-4">
        <select v-for="(o, i) of cityArr" :class="['form-control', {b: i > 0}]" @change="sendData" v-model="o.city">
          <option value="">请选择市</option>
          <option v-for="item in citys" :value="item.code">{{item.text}}</option>
        </select>
      </div>
      <div class="col-sm-4">
        <span style="line-height: 35px;">剩余名额 <font class="fc">{{rmplaces}}</font></span>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-12">
        <small class="areafc">为了方便管理，每一个身份证仅能选择一个申请一个名额。</small>
        <small class="areafc">每一个市级名额有限，剩余为0则不能选择。</small>
        <button type="button" @click="addArea" v-show="cityArr.length > 0"
         style="background:#015FE5; border:none; outline:none;border-radius:3px; color:#fff; padding:3px 10px;font-size:12px;">增加区域</button>
        <button type="button" @click="delArea" v-show="cityArr.length > 0"
         style="background:#015FE5; border:none; outline:none;border-radius:3px; color:#fff; padding:3px 10px;font-size:12px;">减少区域</button>
      </div>
    </div>
  </div>
</template>

<script>
import { DECLARE_GET_AREA_TREE, DECLARE_AREALIMIT_AREACODE } from '@/config/env';

export default {
  name: 'applyArea',
  props: [],
  data() {
    return {
      province: '',
      city: '',
      cityArr: [],
      provinces: [],
      citys: [],
      rmplaces: 0,
    };
  },
  components: {},
  methods: {
    async getAreaTree() {
      const res = await this.$http.get(DECLARE_GET_AREA_TREE);
      if (res.success) {
        this.provinces = res.data;
      }
    },
    addArea() {
      this.cityArr.push({ city: '' });
    },
    delArea() {
      this.cityArr.splice(-1, 1);
    },
    queryCity() {
      this.queryPlaces();
      this.cityArr = [];
      this.citys = [];
      this.provinces.forEach((item) => {
        if (item.code === this.province) {
          if ('120000,110000,310000,500000'.indexOf(this.province) > -1) {
            this.citys = item.nodes[0].nodes;
          } else {
            this.citys = item.nodes;
          }
        }
      });
      this.addArea();
    },
    async queryPlaces() {
      const api = `${DECLARE_AREALIMIT_AREACODE}${this.province}`;
      const res = await this.$http.get(api);
      if (res.success) {
        this.rmplaces = res.data;
      } else {
        this.rmplaces = 0;
      }
    },
    sendData() {
      const d = this.cityArr.map(o => o.city);
      this.$emit('acceptData', d.join(','));
    },
  },
  mounted() {
    this.getAreaTree();
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

.fc {
  color: blue;
}
.areafc {
  color: #999;
}

.b {
  margin-top: 10px;
}
</style>