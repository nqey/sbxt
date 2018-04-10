<template>
  <div>
    <div class="hello">
      <div>
        <div class="upload_warp_img" v-show="imgList.length!=0">
            <div class="upload_warp_img_div" v-for="(item,index) of imgList">
              <div class="upload_warp_img_div_top">
                <div class="upload_warp_img_div_text">
                  <!-- {{item.file.name}} -->
                </div>
                <img :src="del" class="upload_warp_img_div_del" @click="fileDel(index)">
              </div>
              <div class="upload_warp_img_div_bottom" @click="sendImgSrc(item.file.src)">
                <span class="glyphicon glyphicon-resize-full" style="top: -39px;"></span>
              </div>
              <img :src="item.file.src" >
            </div>
        </div>
        <div class="upload_warp">
          <div class="upload_warp_left" @click="fileClick">
            <img :src="upload">
            <p style="line-height: 75px;">上传图片</p>
          </div>
  <!--         <div class="upload_warp_right" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
            或者将文件拖到此处
          </div> -->
        </div>
    <!--     <div class="upload_warp_text">
          选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}
        </div> -->
        <input @change="fileChange($event)" type="file" :id="uploadid" multiple style="display: none"/>
        
      </div>
    </div>
  </div>
</template>

<script>
import del from '@/assets/img/del.png';
import upload from '@/assets/img/upload.png';
import wenjian from '@/assets/img/wenjian.png';
import { DECLARE_POST_UPLOAD, IMAGE_SERVER_URL } from '@/config/env';

export default {
  name: 'upload',
  props: ['uploadid', 'len', 'imgUrl'],
  data() {
    return {
      del,
      upload,
      wenjian,
      imgList: [],
      size: 0,
      showImg: false,
      isE: true,
      imgSrc: '',
      imgRes: [],
    };
  },

  methods: {
    fileClick() {
      document.getElementById(this.uploadid).click();
    },
    fileChange(el) {
      if (!el.target.files[0].size) return;
      this.fileList(el.target);
      this.upFile(el.target.files[0]);
      this.isE = false;
      el.target.value = '';
    },
    fileList(fileList) {
      const files = fileList.files;
      for (let i = 0; i < files.length; i += 1) {
        // 判断是否为文件夹
        if (files[i].type !== '') {
          this.fileAdd(files[i]);
        } else {
          // 文件夹处理
          this.folders(fileList.items[i]);
        }
      }
    },
    // 文件夹处理
    folders(files) {
      const that = this;
      // 判断是否为原生file
      if (files.kind) {
        files = files.webkitGetAsEntry();
      }
      files.createReader().readEntries((file) => {
        for (let i = 0; i < file.length; i += 1) {
          if (file[i].isFile) {
            this.foldersAdd(file[i]);
          } else {
            that.folders(file[i]);
          }
        }
      });
    },
    foldersAdd(entry) {
      const that = this;
      entry.file((file) => {
        that.fileAdd(file);
      });
    },
    fileAdd(file) {
      // 总大小
      this.size = this.size + file.size;
      // 判断是否为图片文件
      if (file.type.indexOf('image') === -1) {
        file.src = this.wenjian;
        this.imgList.push({
          file,
        });
        if (this.imgList > this.len) {
          this.imgList.splice(0, 1);
        }
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          file.src = e.target.result;
          this.imgList.push({
            file,
          });
          if (this.imgList.length > this.len) {
            this.imgList.splice(0, 1);
          }
        };
      }
    },
    fileDel(index) {
      // 总大小
      this.size = this.size - this.imgList[index].file.size;
      this.imgList.splice(index, 1);
      this.imgRes.splice(index, 1);
      this.$emit('acceptData', this.imgRes);
    },
    bytesToSize(bytes) {
      if (bytes === 0) return '0 B';
      // or 1024
      const k = 1000;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const precision = (bytes / (k ** i)).toPrecision(3);
      return `${precision} ${sizes[i]}`;
    },
    dragenter(el) {
      el.stopPropagation();
      el.preventDefault();
    },
    dragover(el) {
      el.stopPropagation();
      el.preventDefault();
    },
    drop(el) {
      el.stopPropagation();
      el.preventDefault();
      this.fileList(el.dataTransfer);
    },
    sendImgSrc(src) {
      // 发送事件
      this.$emit('acceptImgSrc', src);
    },
    async upFile(file) {
      const param = new FormData();
      param.append('fileList', file);
      const res = await this.$xhr('upload', DECLARE_POST_UPLOAD, param);
      this.imgRes.push(res.data.data[0]);
      this.$emit('acceptData', this.imgRes.join(','));
    },
    setImgSrc() {
      if (this.imgUrl && this.isE) {
        this.imgSrc = `${IMAGE_SERVER_URL}${this.imgUrl}`;
        this.showImg = true;
      }
      if (this.imgUrl && this.isE) {
        this.imgUrl.split(',').forEach((f) => {
          this.imgRes.push(f);
          const o = {
            file: {
              src: `${IMAGE_SERVER_URL}${f}`,
            },
          };
          this.imgList.push(o);
        });
      }
    },
  },
  watch: {
    imgUrl: 'setImgSrc',
  },
  mounted() {
    this.setImgSrc();
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

.upload_warp_img_div_del {
  position: absolute;
  top: 6px;
  width: 16px;
  right: 4px;
}

.upload_warp_img_div_top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  line-height: 30px;
  text-align: left;
  color: #fff;
  font-size: 12px;
  text-indent: 4px;
}

.upload_warp_img_div_bottom {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  background-color: #646a7f;
  color: #fff;
  text-align: center;
  z-index: 999;
}

.upload_warp_img_div_text {
  white-space: nowrap;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.upload_warp_img_div img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}

.upload_warp_img_div {
  position: relative;
  height: 200px;
  width: 200px;
  /*border: 1px solid #ccc;*/
  margin: 0px 30px 10px 0px;
  float: left;
  line-height: 100px;
  display: table-cell;
  text-align: center;
  background-color: #eee;
  cursor: pointer;
}

.upload_warp_img {
  /*border-top: 1px solid #D2D2D2;*/
  /*padding: 14px 0 0 14px;*/
  overflow: hidden;
  float: left;
}

.upload_warp_text {
  text-align: left;
  margin-bottom: 10px;
  padding-top: 10px;
  text-indent: 14px;
  border-top: 1px solid #ccc;
  font-size: 14px;
}

.upload_warp_right {
  float: left;
  width: 57%;
  margin-left: 2%;
  height: 100%;
  border: 1px dashed #999;
  border-radius: 4px;
  line-height: 130px;
  color: #999;
}

.upload_warp_left img {
  margin-top: 40px;
}

.upload_warp_left {
  float: left;
  width: 200px;
  height: 200px;
  border: 1px dashed #999;
  border-radius: 4px;
  cursor: pointer;
  color: #999;
}

.upload_warp {
  /*margin: 14px;*/
  height: 130px;
}

.upload {
  border: 1px solid #ccc;
  background-color: #fff;
  width: 650px;
  box-shadow: 0px 1px 0px #ccc;
  border-radius: 4px;
}

.hello {
  width: 800px;
  /*margin-left: 34%;*/
  text-align: center;
}
</style>