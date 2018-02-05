<template>
  <tr>
   <td>{{list.name}}</td>
   <td>{{list.status}}</td>
   <td>{{list.qrcodenums}}</td>
   <td>{{list.amount}}</td>
  </tr>
</template>

<script>
export default {
  name: 'searchtr',
  props: ['list'],
};
</script>

<style scoped>
</style>