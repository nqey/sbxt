<template>
  <nav class="txc">
    <ul class="pagination">
      <li><span @click="prePage()">«</span></li>
      <li v-for="(p, i) in pages"><span :class="{active: p.isActive}" @click="setActive(p)">{{p.value}}</span></li>
      <li><span @click="nextPage()">»</span></li>
    </ul>
  </nav>
</template>

<script>

export default {
  name: 'pagenav',
  props: ['page'],
  data() {
    return {
      pages: [],
      prepage: {},
    };
  },
  watch: {
    page: 'createP',
  },
  methods: {
    setActive(o) {
      // 清除前一个对象的样式
      this.setObj(this.prepage, 'isActive', false);
      // 设置当前对象的样式
      this.setObj(o, 'isActive', true);
      // 保存当前对象为前一个对象
      this.prepage = o;
      // 给父组件传递当前页数
      this.$emit('nextPage', o.value);
    },
    prePage() {
      // 获取当前选中对象
      const o = this.pages.find((p) => {
        const isActive = p.isActive;
        return isActive === true;
      });
      if (o.value - 2 >= 0) {
        // 清除当前对象的样式
        this.setObj(o, 'isActive', false);
        // 设置下一个对象的样式
        this.setObj(this.pages[o.value - 2], 'isActive', true);
        // 保存当前对象为前一个对象
        this.prepage = this.pages[o.value - 2];
        // 给父组件传递当前页数
        this.$emit('nextPage', o.value - 1);
      }
    },
    nextPage() {
      // 获取当前选中对象
      const o = this.pages.find((p) => {
        const isActive = p.isActive;
        return isActive === true;
      });
      if (o && (o.value < this.pages.length)) {
        // 清除当前对象的样式
        this.setObj(o, 'isActive', false);
        // 设置下一个对象的样式
        this.setObj(this.pages[o.value], 'isActive', true);
        // 保存当前对象为前一个对象
        this.prepage = this.pages[o.value];
        // 给父组件传递当前页数
        this.$emit('nextPage', o.value + 1);
      }
    },
    createP() {
      // 生成样式控制模型
      (() => {
        const pages = [];
        for (let i = 1; i < this.page + 1; i += 1) {
          const o = { isActive: false, value: i };
          if (i === 1) {
            o.isActive = true;
            // 保存当前对象为前一个对象
            this.prepage = o;
          }
          pages.push(o);
        }
        this.pages = pages;
      })();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

.txc {
  text-align: center;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
  .active {
      background: #5cb85c !important;
      border-color: #5cb85c !important;
      color: $fc;
  }
  li {
    display: inline;
    &:first-child {
      span {
        margin-left: 0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
    }
    span {
      position: relative;
      float: left;
      padding: 6px 12px;
      margin-left: -1px;
      line-height: 1.42857143;
      color: #337ab7;
      text-decoration: none;
      background-color: #fff;
      border: 1px solid #ddd;
      &:focus {
        @extend .active;
      }
      &:hover {
        @extend .active;
      }
    }
  }
}
</style>