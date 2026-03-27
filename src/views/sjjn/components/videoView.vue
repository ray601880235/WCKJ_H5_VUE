<template>
  <div class="video-view" v-if="videoJson?.isvideo">
    <p class="title">病例分析课程精选</p>
    <video controls muted playsinline>
      <source :src="videoJson.videosrc" type="video/mp4">
      您的浏览器不支持HTML5视频播放
    </video>
  </div>
</template>

<script lang="ts" setup>
import JSON5 from 'json5'
import {ref, inject, watch} from 'vue'
import {getPublicPath} from "@/utils/pathHelper";
const dataJson:any = inject('dataJson')
const videoJson:any = ref<any>({})

watch(()=>dataJson?.value, (val:any) => {
 /* const isPrivateVideo:boolean = val?.isPrivateVideo ?? false
  if (isPrivateVideo) {
    videoJson.value = val?.video || {}
  }else {
    loadDataJson()
  }*/
  videoJson.value = val?.video || {}
},{
  deep: true
})

const loadDataJson = async () => {
  const fileName:string = `video.json5`
  const jsonDataUrl:string = getPublicPath(`/json/${fileName}`)
  const response:any = await fetch(jsonDataUrl)
  if (!response.ok) throw new Error(`${fileName} 不存在`)
  const text:string = await response.text()
  const dataJson:any = JSON5.parse(text)
  videoJson.value = dataJson || {}
}
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