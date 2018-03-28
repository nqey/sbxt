<template>
  <div class="form-group">
    <select class='form-control' @change="queryCity" v-model="province">
      <option value="0">请选择省份</option>
      <option v-for="item in provinces" :value="item.id">{{item.name}}</option>
    </select>
    <select class='form-control' @change="queryPlaces" v-model="city">
      <option value="0">请选择市</option>
      <option v-for="item in citys" :value="item.id">{{item.name}}</option>
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

export default {
  name: 'appArea',
  props: [],
  data() {
    return {
      province: '0',
      city: '0',
      provinces: [],
      citys: [],
      rmplaces: 0,
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
      this.city = '0';
      this.provinces.forEach((item) => {
        if (item.id === this.province) {
          this.citys = item.children;
        }
      });
    },
    queryPlaces() {
      // let api = `${DECLARE_AREALIMIT_AREACODE}${this.province}${this.city}`;
      //   const res = await this.$xhr('get', api);
      this.rmplaces = 5;
      this.$emit('acceptData', {
        applyAddress: `${this.province}${this.city}`,
      });
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

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

.fc {
  color: blue;
}
.areafc {
  color: #999;
}
</style>