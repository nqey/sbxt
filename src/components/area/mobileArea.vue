<template>
  <div>
    <el-form-item label="常住省份">
      <el-select
        v-model="province"
        @change="queryCity"
        placeholder="省份">
        <el-option
          v-for="item in provinces"
          :key="item.code"
          :label="item.text"
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="常住市">
      <el-select
        v-model="city"
        @change="queryTown"
        placeholder="市">
        <el-option
          v-for="item in citys"
          :key="item.code"
          :label="item.text"
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="常住区/县">
      <el-select
        v-model="town"
        @change="handler(town || city || province);"
        placeholder="区/县">
        <el-option
          v-for="item in towns"
          :key="item.code"
          :label="item.text"
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import { DECLARE_GET_AREA_TREE } from '@/config/env';

export default {
  name: 'mobileArea',
  props: {
    areacode: {
      type: String,
      default: '',
    },
    handler: {
      type: Function,
      default: () => '',
    },
  },
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
      const res = await this.$http.get(DECLARE_GET_AREA_TREE);
      if (res.success) {
        this.provinces = res.data;
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
      this.handler(this.town || this.city || this.province);
    },
    queryTown() {
      this.towns = [];
      this.town = '';
      this.citys.forEach((item) => {
        if (item.code === this.city) {
          this.towns = item.nodes;
        }
      });
      this.handler(this.town || this.city || this.province);
    },
    setAreaCode() {
      if (this.areacode) {
        const a = this.areacode.split(',');
        this.province = a[0];
        this.queryCity();
        this.city = a[1];
        this.queryTown();
        this.town = a[2];
        this.handler(this.town || this.city || this.province);
      }
    },
  },
  mounted() {
    this.getAreaTree();
  },
};
</script>

<style lang="scss" scoped>
  .el-select {
    margin-bottom: 5px; 
  }
</style>