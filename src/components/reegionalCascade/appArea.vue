<template>
  <div class="form-group">
    <select v-show="provinces.length > 0" class='form-control' @change="queryCity" v-model="province">
      <option value="">请选择省份</option>
      <option v-for="item in provinces" :value="item.code">{{item.text}}</option>
    </select>
    <select v-show="citys.length > 0" class='form-control' @change="queryPlaces" v-model="city">
      <option value="">请选择市</option>
      <option v-for="item in citys" :value="item.code">{{item.text}}</option>
    </select>
    <span>剩余名额 <font class="fc">{{rmplaces}}</font></span>
    <br/>
    <br/>
    <small class="areafc">为了方便管理，每一个身份证仅能选择一个申请一个名额。</small>
    <br/>
    <small class="areafc">每一个市级名额有限，剩余为0则不能选择。</small>
</div>
</template>

<script>
import { DECLARE_GET_AREA_TREE, DECLARE_AREALIMIT_AREACODE } from '@/config/env';

export default {
  name: 'appArea',
  props: [],
  data() {
    return {
      province: '',
      city: '',
      provinces: [],
      citys: [],
      rmplaces: 0,
    };
  },
  components: {},
  methods: {
    async getAreaTree() {
      const res = await this.$xhr('get', DECLARE_GET_AREA_TREE);
      if (res.data.success) {
        this.provinces = res.data.data;
      }
    },
    queryCity() {
      this.citys = [];
      this.city = '';
      this.provinces.forEach((item) => {
        if (item.code === this.province) {
          this.citys = item.nodes;
        }
      });
    },
    async queryPlaces() {
      const api = `${DECLARE_AREALIMIT_AREACODE}${this.city}`;
      const res = await this.$xhr('get', api);
      if (res.data.success) {
        this.rmplaces = res.data.data;
      } else {
        this.rmplaces = 0;
      }
      this.sendData();
    },
    sendData() {
      if (this.city === '') {
        this.$emit('acceptData', this.province);
      } else {
        this.$emit('acceptData', this.city);
      }
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
</style>