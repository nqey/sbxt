/**
 * 示例：
  <input type="text" name="项目名" v-qc-validator="validator">
  //验证组
  validator: {
    type: ['required', 'maxLength'],
    // 不设使用默认消息
    message: {
      // required: 'aaa',
      // maxLength: 'bbb',
    },
    // 最大长度验证
    maxLength: 2,
    // 最小长度验证
    minLength: 1,
    // 自定义验证器
    rules: {
      required: {
        validator(el) {
          return el.value === '2';
        },
        message: () => '必须输入！！！',
      },
    },
    //验证结果 {项目名：结果}
    result: {},
  },
 */
import rules from '@/config/rules2';

const msgName = 'validator';

const elementEvents = {
  newElement(v) {
    const newItem = document.createElement('span');
    newItem.setAttribute('name', msgName);
    newItem.style.color = 'red';
    const textnode = document.createTextNode(v);
    newItem.appendChild(textnode);
    return newItem;
  },
  insertAfter(newEl, targetEl) {
    const parentEl = targetEl.parentNode;
    if (parentEl.lastChild === targetEl) {
      parentEl.appendChild(newEl);
    } else {
      parentEl.insertBefore(newEl, targetEl.nextSibling);
    }
  },
  // 删除消息
  removeAfter(targetEl) {
    const isHm = elementEvents.isHaveMessage(targetEl.nextSibling);
    if (!isHm) return;
    const parentEl = targetEl.parentNode;
    parentEl.removeChild(targetEl.nextSibling);
  },
  // 消息是否显示
  isHaveMessage(el) {
    if (!el) return false;
    if (!el.getAttribute) return false;
    const name = el.getAttribute('name');
    return name === msgName;
  },
};

const fun = (el, b) => {
  const bindVal = b.value;
  // 删除消息
  elementEvents.removeAfter(el);
  el.className = el.className.replace('input-error', '').trim();
  const type = bindVal.type || [];
  for (let i = 0; i < type.length; i += 1) {
    // 获取验证类型
    const t = type[i];
    bindVal.rules = bindVal.rules || {};
    // 获取验证器
    const va = bindVal.rules[t] || rules[t];
    // 开始验证
    const isVa = va.validator(el, bindVal);
    if (!isVa) {
      // 验证未通过
      bindVal.message = bindVal.message || {};
      const message = bindVal.message[t] || va.message(bindVal);
      const newEl = elementEvents.newElement(message);
      // 显示消息
      elementEvents.insertAfter(newEl, el);
      el.className += ' input-error';
      break;
    }
  }
};

export default (Vue) => {
  // 注册一个全局自定义指令 `v-validator`
  Vue.directive(msgName, {
    bind(el, b) {
      // 离开焦点时验证
      el.addEventListener('blur', () => {
        fun(el, b);
      });
    },
  });
  // 注册一个全局自定义指令 `v-validator-submit`
  Vue.directive('validator-submit', {
    bind(el, b, vNode) {
      // 离开焦点时验证
      el.addEventListener('click', () => {
        const elements = document.getElementsByClassName('v-validator');
        const evObj = document.createEvent('Event');
        evObj.initEvent('blur', true, true);
        [...elements].forEach((element) => {
          element.dispatchEvent(evObj);
        });
        const errorInputs = document.getElementsByClassName('input-error');
        if (errorInputs.length === 0) {
          vNode.context.commit();
        }
      });
    },
  });
};
