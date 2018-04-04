<template>
  <div class='form-group'>
    <select v-show="provinces.length > 0" class='form-control' @change="queryCity" v-model="province">
      <option value="0">请选择省份</option>
      <option v-for="item in provinces" :value="item.id">{{item.name}}</option>
    </select>
    <select v-show="citys.length > 0" class='form-control' @change="queryTown" v-model="city">
      <option value="0">请选择市</option>
      <option v-for="item in citys" :value="item.id">{{item.name}}</option>
    </select>
    <select v-show="towns.length > 0" class='form-control' v-model="town" @change="sendData">
      <option value="0">请选择区/县</option>
      <option v-for="item in towns" :value="item.id">{{item.name}}</option>
    </select>
</div>
</template>

<script>
// import { DECLARE_GET_AREA_TREE } from '@/config/env';

export default {
  name: 'geoArea',
  props: [],
  data() {
    return {
      province: '0',
      city: '0',
      town: '0',
      provinces: [],
      citys: [],
      towns: [],
    };
  },
  components: {},
  methods: {
    // async getAreaTree() {
    //   const res = await this.$xhr('get', DECLARE_GET_AREA_TREE);
      // if (res.data.code === 0) {
      // } else {
      // }
    // },
    queryCity() {
      this.citys = [];
      this.towns = [];
      this.city = '0';
      this.town = '0';
      this.provinces.forEach((item) => {
        if (item.id === this.province) {
          this.citys = item.children;
        }
      });
      this.sendData();
    },
    queryTown() {
      this.towns = [];
      this.town = '0';
      this.citys.forEach((item) => {
        if (item.id === this.city) {
          this.towns = item.children;
        }
      });
      this.sendData();
    },
    sendData() {
      this.$emit('acceptData', `${this.province}${this.city}${this.town}`);
    },
  },
  mounted() {
    this.provinces = [{
      id: '1',
      name: '四川省1',
      children: [{
        id: '1',
        name: '成都市x',
        children: [{
          id: '1',
          name: '双流区x1',
        },
        {
          id: '2',
          name: '双流区x2',
        },
        {
          id: '3',
          name: '双流区x3',
        },
        ],
      },
      {
        id: '2',
        name: '成都市x2',
        children: [{
          id: '1',
          name: '双流区x21',
        },
        {
          id: '2',
          name: '双流区x22',
        },
        {
          id: '3',
          name: '双流区x23',
        },
        ],
      },
      {
        id: '3',
        name: '成都市x3',
        children: [{
          id: '1',
          name: '双流区x31',
        },
        {
          id: '2',
          name: '双流区x32',
        },
        {
          id: '3',
          name: '双流区x33',
        },
        ],
      },
      ],
    },
    {
      id: '2',
      name: '四川省2',
      children: [{
        id: '1',
        name: '成都市2',
        children: [{
          id: '1',
          name: '双流区2',
        }],
      }],
    },
    {
      id: '3',
      name: '四川省3',
      children: [{
        id: '1',
        name: '成都市3',
        children: [{
          id: '1',
          name: '双流区3',
        }],
      }],
    },
    ];
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