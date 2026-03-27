<template>
  <van-swipe class="banner-swipe" height="100%" :autoplay="3000">
    <van-swipe-item v-for="item in banners" :key="item.id" @click="onClick(item)">
      <img :src="item.image" alt="">
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts" setup>
import JSON5 from 'json5'
import { getPublicPath } from '@/utils/pathHelper.ts'
import {ref, watch} from 'vue'
import {inject} from 'vue'
const dataJson:any = inject('dataJson')
const banners = ref<any[]>([])

watch(()=>dataJson?.value, (val:any) => {
  banners.value = []
  const isPrivateBanner:boolean = val?.isPrivateBanner ?? false
  if (isPrivateBanner) {
    const banners = val?.banner || []
    setBanner(banners)
  }else {
    loadDataJson()
  }
},{
  deep: true
})

const setBanner = (list:any[]) => {
  if (list.length === 0) return
  list.forEach(item => {
    if (item.src) {
      item.image = item.src
    }else if (item.name){
      item.image = getPublicPath(`/img/${item.name}`)
    }
    banners.value.push(item)
  })
}

const loadDataJson = async () => {
  const fileName:string = `banner.json5`
  const jsonDataUrl:string = getPublicPath(`/json/${fileName}`)
  const response:any = await fetch(jsonDataUrl)
  if (!response.ok) throw new Error(`${fileName} 不存在`)
  const text:string = await response.text()
  const bannerJson:any = JSON5.parse(text)
  setBanner(bannerJson.banner)
}


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