<script>
  export default {
    // 格式化表单数据
    toFormData(params) {
      return Object.entries(params).reduce((p, c, i) => {
        if (i === 1) {
          return `${encodeURIComponent(p[0])}=${encodeURIComponent(p[1])}&${encodeURIComponent(c[0])}=${encodeURIComponent(c[1])}`;
        }
        return `${p}&${encodeURIComponent(c[0])}=${encodeURIComponent(c[1])}`;
      });
    },
    // 删除对象-属性值为空的属性
    toRmEmpty(params) {
      const localParams = {};
      Object.keys(params).forEach((v) => {
        if (params[v]) {
          localParams[v] = params[v];
        }
      });
      return localParams;
    },
  };
</script>
