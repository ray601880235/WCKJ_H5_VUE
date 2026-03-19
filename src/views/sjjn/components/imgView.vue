<template>
<div class="img-view">
  <p class="title">病例分析试题编号：{{ dataJson.pageNo }}</p>
  <div class="box" v-if="dataJson.image?.isimg">
    <van-image :src="dataJson.image.imgsrc" />
  </div>
</div>
</template>

<script lang="ts" setup>
import {inject} from 'vue'
const dataJson:any = inject('dataJson')
</script>

<style scoped>
.img-view{
  padding: 10px 0;
  .title{
    font-size: 16px;
    font-weight: bold;
  }
  .box{
    width: 100%;
    height: 150px;
    margin-top: 10px;
    .van-image{
      width: 100%;
      height: 100%;
    }
  }
}
</style>