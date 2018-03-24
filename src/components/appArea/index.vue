<template>
  <div class="form-group">
    <select class="form-control">
      <option>请选择省份</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
    <select class="form-control">
      <option>请选择市</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
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
      rmplaces: 3,
    };
  },
  components: {},
  methods: {},
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