<template>
  <div class="video-view" v-if="dataJson.video?.isvideo">
    <p class="title">视频带学</p>
    <video controls muted playsinline>
      <source :src="dataJson.video.videosrc" type="video/mp4">
      您的浏览器不支持HTML5视频播放
    </video>
  </div>
</template>

<script lang="ts" setup>
import {inject} from 'vue'
const dataJson:any = inject('dataJson')
</script>

<style scoped>
.video-view{
  padding: 10px 0;
  .title{
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
  }
    > video{
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
}
</style>