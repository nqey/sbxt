<template>
  <div class='form-group'>
    <select v-show="provinces.length > 0" class='form-control' @change="queryCity" v-model="province">
      <option value="">请选择省份</option>
      <option v-for="item in provinces" :value="item.code">{{item.text}}</option>
    </select>
    <select v-show="citys.length > 0" class='form-control' @change="queryTown" v-model="city">
      <option value="">请选择市</option>
      <option v-for="item in citys" :value="item.code">{{item.text}}</option>
    </select>
    <select v-show="towns.length > 0" class='form-control' v-model="town" @change="sendData">
      <option value="">请选择区/县</option>
      <option v-for="item in towns" :value="item.code">{{item.text}}</option>
    </select>
</div>
</template>

<script>
import { DECLARE_GET_AREA_TREE } from '@/config/env';

export default {
  name: 'geoArea',
  props: ['areacode'],
  data() {
    return {
      province: '',
      city: '',
      town: '',
      provinces: [],
      citys: [],
      towns: [],
    };
  },
  watch: {
    areacode: 'getAreaTree',
  },
  components: {},
  methods: {
    async getAreaTree() {
      const res = await this.$xhr('get', DECLARE_GET_AREA_TREE);
      if (res.data.success) {
        this.provinces = res.data.data;
        this.setAreaCode();
      }
    },
    queryCity() {
      this.citys = [];
      this.towns = [];
      this.city = '';
      this.town = '';
      this.provinces.forEach((item) => {
        if (item.code === this.province) {
          this.citys = item.nodes;
        }
      });
      this.sendData();
    },
    queryTown() {
      this.towns = [];
      this.town = '';
      this.citys.forEach((item) => {
        if (item.code === this.city) {
          this.towns = item.nodes;
        }
      });
      this.sendData();
    },
    sendData() {
      if (this.town === '' && this.city === '') {
        this.$emit('acceptData', this.province);
      } else if (this.town === '') {
        this.$emit('acceptData', this.city);
      } else {
        this.$emit('acceptData', this.town);
      }
    },
    setAreaCode() {
      if (this.areacode) {
        const a = this.areacode.split(',');
        this.province = a[0];
        this.queryCity();
        this.city = a[1];
        this.queryTown();
        this.town = a[2];
      }
    },
  },
  mounted() {
    this.getAreaTree();
  },
};
</script>

<style lang='scss' scoped>
@import '../../assets/css/mixin.scss';

.iw {
	width: 300px;
}

.mt {
	margin-top: 30px;
}
</style>