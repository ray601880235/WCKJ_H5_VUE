<template>
  <van-swipe class="banner-swipe" height="100%" :autoplay="3000">
    <van-swipe-item v-for="item in banners" :key="item.id" @click="onClick(item)">
      <img :src="item.image" alt="">
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts" setup>
import { getPublicPath } from '@/utils/pathHelper.ts'
import {ref, watch} from 'vue'
import {inject} from 'vue'
const dataJson:any = inject('dataJson')
const banners = ref<any[]>([])
watch(()=>dataJson?.value?.banner, (vals:any[]) => {
  banners.value = []
  if (vals.length > 0) {
    vals.forEach(item => {
      if (item.src) {
        item.image = item.src
      }else if (item.name){
        item.image = getPublicPath(`/img/${item.name}`)
      }
      banners.value.push(item)
    })
  }
},{
  deep: true
})
const onClick = (row:any) => {
  if (row.url){
    window.open(row.url)
  }
}
</script>

<style scoped>
.banner-swipe {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>