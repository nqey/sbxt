<template>
  <div class="index_more">
      <div class="index_chunk">
       
    <div class="t_nav">&#12288;{{title}}</div>
    <hr>
    <div style="width: 100%;text-align: center; padding:7% 0;">
      <div style="display: inline-block;width: 50px;height: 50px;border-radius: 25px;border: #01c853 1px solid;">
        <span class="glyphicon glyphicon-ok" style="line-height: 50px;font-size: 20px; color:  #01c853"></span>
      </div>
      <br/>
      <br/>
      <p>{{content}}</p>
      <br/>
      <br/>
      <span v-if="">
        <p>{{content2}}</p>
        <p>{{content3}}</p>
        <br/>
        <br/>
      </span>
      <router-link :to="alink" v-if="alink"><button class="btn js-ajax-submit" style="height: 35px;">继续添加</button></router-link>
      <router-link :to="blink" v-if="blink"><button class="btn ljsq" style="height: 35px;">返回列表</button></router-link>
      <router-link :to="clink" v-if="clink"><button class="btn js-ajax-submit" style="height: 35px;">继续申报</button></router-link>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'msg',
  data() {
    return {
      title: sessionStorage.getItem('title'),
      content: sessionStorage.getItem('content'),
      content2: sessionStorage.getItem('content2'),
      content3: sessionStorage.getItem('content3'),
      alink: sessionStorage.getItem('alink'),
      blink: sessionStorage.getItem('blink'),
      clink: sessionStorage.getItem('clink'),
    };
  },
};
</script>

<style lang="scss" scoped>
.index_more{background: #f6f7fb;
  position: absolute;
  height: 100%;
  padding-bottom: 200px;
    width: 100%;}
.index_chunk{ 
position: relative;
top:120px;
left: 19%;
margin: 0;
width: 78%;background:#fff; padding: 40px 70px 55px;border-radius: 4px; box-shadow: 0px 20px 20px -20px #ddd;}

.t_nav {
  border-left: #4786ff solid 3px;
  font-size: 18px;
}
a {
  text-decoration: none;
}
.txr {
  text-align: right;
}
.txc {
  text-align: center;
}
.iw {
  width: 300px;
}
.iw600 {
  width: 600px;
}
.label_height {
  line-height: 35px;
}
.imb {
  margin-bottom: 30px;
}
.info {
  color: #ac2925;
}
.areafc {
  color: #999;
}
.js-ajax-submit {
    width: 150px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
}
.ljsq {
    width: 150px;
    margin: auto;
    color:#333;
    border: 1px #999 solid;
    background: #fff;
}
</style>
