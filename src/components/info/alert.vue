<script>
import Vue from 'vue';
import alert from '@/components/info/error';

const AlertConstructor = Vue.extend(alert);
const div = document.createElement('div');
AlertConstructor.error = (options) => {
  document.body.appendChild(div);
  const propsData = Object.assign({}, options);
  const alertInstance = new AlertConstructor({
    propsData,
  }).$mount(div);
  setTimeout(() => { alertInstance.close(); }, 5000);
};

export default AlertConstructor;

</script>