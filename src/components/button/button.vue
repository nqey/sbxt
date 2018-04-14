<template>
  <div>
  	<button v-show="isShowSubmit" type="button" class="btn btn-success" @click="submit">提交</button>
    <button v-show="!isShowSubmit" type="button" class="btn btn-success" disabled>提交</button>
  </div>
</template>

<script>

export default {
  name: 'button',
  props: ['title'],
  methods: {
  	submit() {

  	},
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

</style>