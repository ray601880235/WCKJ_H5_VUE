<template>
  <div class="case-summary">
    <p class="title">经典例题</p>
    <div ref="contentRef" class="content" :class="{ 'expanded': isExpanded }" @click="handleImageClick" v-html="renderedContent"></div>

    <div class="toggle-btn" @click="isExpanded = !isExpanded">
      {{ isExpanded ? '收起' : '展开' }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, computed } from 'vue'
import MarkdownIt from 'markdown-it'
const dataJson:any = inject('dataJson')
const isExpanded = ref<boolean>(true)
const contentRef = ref<HTMLElement>()

import { api as viewerApi } from "v-viewer"

const md:any = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})
md.renderer.rules.image = (tokens:any, idx:number) => {
  const token = tokens[idx]
  const src = token.attrGet('src')
  const alt = token.content
  return `<img src="${src}" alt="${alt}" class="preview-image" data-src="${src}">`
}
const renderedContent:any = computed(() => {
  return md.render(dataJson.value?.blzy || '')
})

const handleImageClick = (e: MouseEvent) => {
  const target = e.target as HTMLImageElement
  if (target.classList.contains('preview-image')) {
    const imgSrc:string = target.dataset.src || target.src
    viewerApi({
      images: [imgSrc],
      options: {
        toolbar: {
          zoomIn: false,
          zoomOut: false,
          oneToOne: true,
          reset: false,
          prev: false,
          play: false,
          next: false,
          rotateLeft: true,
          rotateRight: true,
          flipHorizontal: false,
          flipVertical: false,
        },
        movable: false,
        title: false,
        button: true,
        navbar: false,
        fullscreen:true,
      },
    })
  }
}
</script>

<style scoped>
.case-summary{
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  .title{
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 5px;
  }
  .content{
    font-size: 14px;
    line-height: 24px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    transition: all 0.5s;
    &.expanded {
      -webkit-line-clamp: unset;
    }
  }
  :deep(img){
    width: 100%;
  }
  .toggle-btn{
    font-size: 14px;
    color: #0283EF !important;
    text-align: center;
    margin: auto;
  }
}
</style>