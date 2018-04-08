<template>
  <div class='form-group'>
    <select class='form-control' @change="queryCity" v-model="province">
      <option value="0">请选择省份</option>
      <option v-for="item in provinces" :value="item.id">{{item.name}}</option>
    </select>
    <select class='form-control' @change="queryTown" v-model="city">
      <option value="0">请选择市</option>
      <option v-for="item in citys" :value="item.id">{{item.name}}</option>
    </select>
    <select class='form-control' v-model="town">
      <option value="0">请选择区/县</option>
      <option v-for="item in towns" :value="item.id">{{item.name}}</option>
    </select>
    <input type="text" class="form-control" @blur="sendData" placeholder="请输入机构名称或负责人" aria-label="..." v-model="name">
</div>
</template>

<script>
import { DECLARE_GET_AREA_TREE } from '@/config/env';

export default {
  name: 'geoArea',
  props: [],
  data() {
    return {
      province: '0',
      city: '0',
      town: '0',
      name: '',
      provinces: [],
      citys: [],
      towns: [],
    };
  },
  components: {},
  methods: {
    async getAreaTree() {
      const res = await this.$xhr('get', DECLARE_GET_AREA_TREE);
      console.log(res);
      // if (res.data.code === 0) {
      // } else {
      // }
    },
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
      this.$emit('acceptData', {
        liveAddress: `${this.province}${this.city}${this.town}`,
        name: this.name,
      });
    },
  },
  mounted() {
    this.getAreaTree();
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