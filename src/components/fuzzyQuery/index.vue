<template>
   <div class="bdsug">
     <ul>
      <li v-for="item of list" @click="setRecommendName(item)">item.name</li>
     </ul>
   </div>
</template>
<script>

export default {
  name: 'commonImg',
  props: ['imgSrc'],
  data: {
    return {
      list: [
        {
          id: '001',
          type: '1',
          name: '四川中新华搜信息技术有限公司1'
        },
        {
          id: '002',
          type: '2',
          name: '四川中新华搜信息技术有限公司2'
        },
        {
          id: '003',
          type: '3',
          name: '四川中新华搜信息技术有限公司3'
        },
      ], 
    }
  },
  methods: {
    setRecommendName(el) {
      // 发送事件
      this.$emit('sendData', el.target.innerText);
    },
  },
};

</script>
<style scoped>
.bdsug {
    position: absolute;
    z-index: 1;
    width: 538px;
    background: #fff;
    border: 1px solid #ccc;
    _overflow: hidden;
    box-shadow: 1px 1px 3px #ededed;
    -webkit-box-shadow: 1px 1px 3px #ededed;
    -moz-box-shadow: 1px 1px 3px #ededed;
    -o-box-shadow: 1px 1px 3px #ededed;
}
.bdsug li {
    width: 522px;
    color: #000;
    font: 14px arial;
    line-height: 22px;
    padding: 0 8px;
    position: relative;
    cursor: default;
}
p, form, ol, ul, li, dl, dt, dd, h3 {
    margin: 0;
    padding: 0;
    list-style: none;
}
</style>