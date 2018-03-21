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
    <select class="form-control">
      <option>请选择区/县</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
    <div class="mt">
       <input type="text" class="form-control iw" placeholder="请输入详细地址">
    </div>
</div>
</template>

<script>

export default {
  name: 'geoArea',
  props: [],
  data() {
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

.iw {
	width: 300px;
}

.mt {
	margin-top: 30px;
}
</style>