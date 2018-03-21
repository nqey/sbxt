<template>
  <div>
    <v-registerhead :step="4"></v-registerhead>
    <div class="row">
      <div class="col-sm-12" style="padding: 0px 55px;">
        <div class="col-sm-12 bs-example">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import registerHead from '@/components/registerHead';

export default {
  name: 'step4',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
    };
  },
  components: {
    'v-registerhead': registerHead,
  },
  methods: {
    search() {

    },
  },
};
</script>

<style lang="scss" scoped>
.bs-example {
    background-color: #fff;
    border: 1px solid #ddd;
    -webkit-border-top-left-radius: 4px;
    -webkit-border-top-right-radius: 4px;
    -moz-border-radius-topleft: 4px;
    -moz-border-radius-topright: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin: 15px 0;
    padding: 60px 30px;
    position: relative;
}
</style>