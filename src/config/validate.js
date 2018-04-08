import Vue from 'vue';
import rules from '@/config/rules';

// 注册一个全局自定义指令 `v-qcvalidate`
Vue.directive('qcvalidate', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el, b) {
    // 离开焦点时验证
    el.addEventListener('blur', () => {
      if (!rules[b.value.p].pattern.test(el.value)) {
      }
    });
  },
});

