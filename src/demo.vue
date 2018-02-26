<template>
  <div></div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'demo',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      lists: [],
    };
  },
  computed: {
  },
  methods: {
  },
  watch: {
  },
  components: {
    'v-test': test,
  },
  beforeCreate() {
  },
  cteated() {
  },
  beforeMount() {
  },
  mounted() {
    axios.get('http://localhost:3001', {
      params: {
      },
    }).then((response) => { this.lists = response.data.resultes; });
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

</style>