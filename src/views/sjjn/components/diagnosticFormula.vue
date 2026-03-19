<template>
  <div class="diagnostic-formula">
    <div class="title-box">
      <div class="tag">诊断公式</div>
      <div class="title">{{dataJson.zdbt}}</div>
    </div>
    <div class="formula" v-if="toggle">{{dataJson.zdgs}}</div>
    <p class="toggle-btn" @click="onToggle">{{toggle ? '收起详情' : '展开详情'}}<van-icon :name="toggle ? 'arrow-up' : 'arrow-down'" color="#0283EF"/></p>
  </div>
</template>

<script lang="ts" setup>
import {inject, ref} from 'vue'
const dataJson:any = inject('dataJson')
const toggle = ref<boolean>(false);
const onToggle = () => {
  toggle.value = !toggle.value
}
</script>

<style scoped>
.diagnostic-formula{
  margin-top: 15px;
  padding-bottom: 10px;
  position: relative;
  background-color: #f2d8cd;
  .title-box{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .tag{
      width: 100px;
      font-size: 14px;
      color: #fff;
      padding: 5px 10px;
      background-color: #F26A14;
      clip-path: polygon(0 0, 100% 0, 100% 0, 70% 100%, 0 100%);
    }
    .title{
      flex: 1;
      font-size: 16px;
      font-weight: bold;
      padding: 0 10px;
      margin-top: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .formula{
    font-size: 14px;
    line-height: 20px;
    padding: 0 10px;
    margin-bottom: 5px;
    color: #24B49B;
  }
  .toggle-btn{
    font-size: 14px;
    color: #0283EF;
    text-align: center;
  }
}
</style>