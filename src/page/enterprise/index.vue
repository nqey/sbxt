<template>
  <div>
    <v-head></v-head>
    <v-lmenu></v-lmenu>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;申报企业</span>
      <br/>
      <br/>
      <br/>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-1 txr">
            <label class="label_height"><span class="info">*</span> 企业全称：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <input type="text" class="form-control iw600" name="authCode" placeholder="请输入企业全称">
    		<br/>
    		<br/>
    		&#12288;<small class="areafc">例如：四川新中华搜信息技术有限公司</small>
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height"><span class="info">*</span> 企业负责人：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <input type="text" class="form-control iw600" name="authCode" placeholder="请输入真实姓名">
    		<br/>
    		<br/>
    		&#12288;<small class="areafc">企业法人必须是真是姓名，与营业执照上相同</small>
        </div>
        <v-bigimg v-if="showImg" @hideViewImg="viewImg" :imgSrc="imgSrc"></v-bigimg>
        <div class="form-group col-sm-1 txr">
            <label class="label_height"><span class="info">*</span> 手机号码：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <input type="text" class="form-control iw600" name="authCode" placeholder="请输入手机号码">
    		<br/>
    		<br/>
    		&#12288;<small class="areafc">该号码必须是企业法人本人手机号码</small>
        </div>
         <div class="form-group col-sm-1 txr">
                <label class="label_height"><span class="info">*</span> 身份证号码：</label>
         </div>
	     <div class="form-group col-sm-11 imb">
	            <input type="text" class="form-control iw600" name="authCode" placeholder="请输入身份证号码">
	    		<br/>
	    		<br/>
	    		&#12288;<small class="areafc">申报官真实有效身份证号码，每一个身份证号只能添加一名申报官。</small>
	      </div>
	      <div class="form-group col-sm-1 txr">
              <label class="label_height"><span class="info">*</span> 身份证照片：</label>
          </div>
          <div class="form-group col-sm-11 imb">
            <p class="label_height areafc">请按照示例图片上传证件照片；支持格式：bmp、jpg、png、gif。照片大小不超过2M。</p>
            <small class="info label_height">请上传本人真实身份证，否则审核不通过。</small>
            <br/>
            <br/>
            <v-upload @acceptImgSrc="bigimg" uploadid="upload2"></v-upload>
          </div>
          <div class="form-group col-sm-1 txr">
              <label class="label_height"><span class="info">*</span> 营业执照：</label>
          </div>
          <div class="form-group col-sm-11 imb">
            <p class="label_height">请上次营业执照影印件。支持格式：bmp、jpg、png、gif。照片大小不超过2M。</p>
            <br/>
            <v-upload @acceptImgSrc="bigimg" uploadid="upload3"></v-upload>
          </div>
          <div class="form-group col-sm-1 txr">
              <label class="label_height"><span class="info">*</span> 生产许可证：</label>
          </div>
          <div class="form-group col-sm-11 imb">
            <p class="label_height">请上传生产许可证影印件。支持格式：bmp、jpg、png、gif。照片大小不超过2M。</p>
            <br/>
            <v-upload @acceptImgSrc="bigimg" uploadid="upload3"></v-upload>
          </div>
          <div class="form-group col-sm-1 txr">
              <label class="label_height"><span class="info">*</span> 企业尽职调查表：</label>
          </div>
          <div class="form-group col-sm-11 imb">
            <p class="label_height"><b>下载</b> <a>尽职调查表</a></p>
            <small class="info2 label_height">文件要求：上传加盖企业公章的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
            <br/>
            <small class="info label_height">请认真填写每一必填项，再上传完整的尽职调查表</small>
            <br/>
            <br/>
            <v-upload @acceptImgSrc="bigimg" uploadid="upload3"></v-upload>
          </div>
           <div class="form-group col-sm-1 txr">
              <label class="label_height"><span class="info">*</span> 企业负责人尽职调查表：</label>
          </div>
          <div class="form-group col-sm-11 imb">
            <p class="label_height"><b>下载</b> <a>尽职调查表</a></p>
            <small class="info2 label_height">文件要求：上传加盖企业公章的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
            <br/>
            <small class="info label_height">请认真填写每一必填项，再上传完整的尽职调查表</small>
            <br/>
            <br/>
            <v-upload @acceptImgSrc="bigimg" uploadid="upload3"></v-upload>
          </div>
           <div class="form-group col-sm-1 txr">
              <label class="label_height"><span class="info">*</span> 企业入库申请函</label>
          </div>
          <div class="form-group col-sm-11 imb">
            <p class="label_height"><b>下载</b> <a>申请函</a></p>
            <small class="info2 label_height">文件要求：上传加盖企业公章的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
            <br/>
            <small class="info label_height">请上传完整的申请函</small>
            <br/>
            <br/>
            <v-upload @acceptImgSrc="bigimg" uploadid="upload3"></v-upload>
          </div>
          <div class="form-group col-sm-1 txr">
              <label class="label_height"><span class="info">*</span> 授权委托书</label>
          </div>
          <div class="form-group col-sm-11 imb">
            <p class="label_height"><b>下载</b> <a>委托书</a></p>
            <small class="info2 label_height">指定代表或者共同委托代理人授权委托书；如企业法人不能亲自办理入库事宜，法人可签订此授权书委托书给指定负责人进行办理。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
            <br/>
            <br/>
            <v-upload @acceptImgSrc="bigimg" uploadid="upload3"></v-upload>
          </div>
          <div class="form-group col-sm-1 txr">
              <label class="label_height"> 其他补充材料：</label>
          </div>
          <div class="form-group col-sm-11 imb">
            <small class="info2 label_height">企业如有其他补充材料，可上次至此，可增加通过率;例如发明专利、商标等知识产权；各项奖励证书，等级证书，认证证书等；如企业有全国工业生产许可证，安全生产许可证也需上传至此。 </small>
            <br/>
            <br/>
            <v-upload @acceptImgSrc="bigimg" uploadid="upload6"></v-upload>
          </div>
          <div class="form-group col-sm-1 txr">
          </div>
          <div class="form-group col-sm-11 imb">
              <button class="btn js-ajax-submit">确认</button>
              <br/>
              <br/>
              <p class="areafc">&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#32;申报企业需审核</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import vhead from '@/components/header';
import lmenu from '@/components/leftMenu';
import upload from '@/components/upload';
import bigImg from '@/components/bigImg';

export default {
  name: 'search',
  data() {
    return {
      showImg: false,
    };
  },
  methods: {
    bigimg(src) {
      this.imgSrc = src;
      this.showImg = true;
    },
    viewImg() {
      this.showImg = false;
    },
  },
  components: {
    'v-head': vhead,
    'v-lmenu': lmenu,
    'v-upload': upload,
    'v-bigimg': bigImg,
  },
};
</script>

<style lang="scss" scoped>

.bs-example {
    position: relative;
    top: 120px;
    left: 275px;
    margin: 0;
    width: 84%;
    background-color: #fff;
    border: 1px solid #ddd;
    -webkit-border-top-left-radius: 4px;
    -webkit-border-top-right-radius: 4px;
    -moz-border-radius-topleft: 4px;
    -moz-border-radius-topright: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding: 35px 30px;
    position: relative;
}
.t_nav {
  border-left: #4786ff solid 3px;
  margin-left: -30px;
  /*font-weight: bold;*/
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
    width: 350px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
}
</style>
