<template>
  <div class="contact">
    <div class="izlrmenu" :style="consults">
      <a class="consult" :style="consults" target="_blank">
        <div class="phones" style="display:none;">400-8822-011</div>
      </a>
      <a class="cart" :style="consults">
        <div class="pic" :style="pics"></div>
      </a>
    </div>
    <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=229307241&site=qq&menu=yes" id="udesk-feedback-tab" class="tableft" :style="consults" style="display: block; background-color: black;"></a>
  </div>
</template>

<script>
import consult from '@/assets/img/consult_icon.gif';
import pic from '@/assets/img/wx.jpg';

export default {
  name: 'contact',
  data() {
    return {
      consults: {
        backgroundImage: `url(${consult})`,
      },
      pics: {
        backgroundImage: `url(${pic})`,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
 /*在线客服*/
.izlrmenu{
         margin-right: 0;
         width: 82px;
         position: fixed;
         right: 2px;
         top: 65%;
         -webkit-box-shadow: #DDD 0px 1px 5px;
         -moz-box-shadow: #DDD 0px 1px 5px;
         box-shadow: #DDD 0px 1px 5px;
         z-index:999;
}
.izlrmenu .consult{    
    background-repeat: no-repeat;
    background-position: center -77px;
    display: block;
    height: 76px;
    width: 82px;
}
.izlrmenu .consult .phones {
    background-color: rgb(247,247,255);
    position: absolute;
    width: 160px;
    left: -160px;
    top: 0px;
  line-height:70px;
    color: #000;
    font-size: 18px;
    text-align: center;
    display: none;
    box-shadow: #DDD -1px 1px 4px;
}
.izlrmenu a.consult:hover .phones{display:inline !important;}
.izlrmenu .cart {
    background-repeat: no-repeat;
    background-position: center bottom;
    display: block;
    font-size: 12px;
    line-height: 16px;
    color: #45BDFF;
    text-align: center;
    padding-top: 15px;
    padding-right: 18px;
    padding-bottom: 47px;
    padding-left: 48px;
}
.izlrmenu a.cart:hover .pic{display:block;}
.izlrmenu .cart .pic {
  display:none;
    position: absolute;
    left: -140px;
    top: 65px;
    width: 140px;
    height: 140px;
  border:2px solid #f1f1f1;
}
#udesk-feedback-tab {
    position: fixed;
    right: 2px;
    top: 65%;
    margin-top: -76px;
    -webkit-box-shadow: #DDD 0px -1px 5px;
    -moz-box-shadow: #DDD 0px -1px 5px;
    box-shadow: #DDD 0px -1px 5px;
    z-index: 10000;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center top;
    display: block;
    height: 76px;
    width: 82px;
    background-color: #FFF!important;
    z-index:999;
}
@media (max-width: 768px) {
  .contact {
    display: none;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
}
@media (min-width: 992px) and (max-width: 1199px) {
}
@media (min-width: 1200px) {
}
</style>