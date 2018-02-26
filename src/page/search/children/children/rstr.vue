<template>
  <tr>
   <td>{{list.name}}</td>
   <td>{{listStatus}}</td>
   <td>{{list.qrcodenums}}</td>
   <td>{{listAmount}}</td>
  </tr>
</template>

<script>
import { ENTERPRISE_TYPE } from '@/config/env';

export default {
  name: 'rstr',
  props: ['list'],
  computed: {
    listStatus() { return ENTERPRISE_TYPE[this.list.status]; },
    listAmount() {
      if (this.list.qrcodenums <= this.list.amount) {
        return Number.prototype.toFixed.call(30731 * 0.15, 2);
      }
      let am = 30731;
      am += (this.list.qrcodenums - this.list.amount) * 0.003;
      am *= 0.15;
      return Number.prototype.toFixed.call(am, 2);
    },
  },
};
</script>

<style lang="scss" scoped>
  td {
    color: #797979 !important;
  }
</style>