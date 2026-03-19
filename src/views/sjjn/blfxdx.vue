<template>
  <div class="case-analysis">
    <banner/>

    <div class="label-count">病例分析 <span>{{ dataJson.pageNo }}</span>/{{ dataJson.pageSize }}</div>

    <div class="body">

      <img-view/>

      <case-summary/>

      <answer-questions/>

      <diagnostic-formula/>

      <video-view/>
    </div>
  </div>

  <customer-service/>
</template>

<script setup lang="ts">
import {ref, provide, watch} from 'vue'
import JSON5 from 'json5'
import { useRoute } from 'vue-router'
import { getPublicPath } from '@/utils/pathHelper.ts'
import banner from './components/banner.vue'
import diagnosticFormula from './components/diagnosticFormula.vue'
import imgView from './components/imgView.vue'
import caseSummary from './components/caseSummary.vue'
import answerQuestions from './components/answerQuestions.vue'
import videoView from './components/videoView.vue'
import customerService from './components/customerService.vue'
const route:any = useRoute()
const codestr:string = route.query.codestr
const qNumber = ref<number>(1)
const dataJson = ref<any>({})

const getData = async (response:any) => {
  const text:string = await response.text()
  const data:any = JSON5.parse(text)
  const blfx:string[] = data.blfx && data.blfx.split('/') || []
  const [pageNo,pageSize] = blfx
  data.pageNo = pageNo
  data.pageSize = pageSize
  dataJson.value = data
  document.title = dataJson.value.title
}

const loadDataJson = async () => {
 try {
   const code: number = qNumber.value
   const fileName:string = `data_${code}.json5`
   const jsonDataUrl:string = getPublicPath(`/json/${fileName}`)
   const response:any = await fetch(jsonDataUrl)
   if (!response.ok) throw new Error(`data_${code}.json5 不存在`)
   getData(response)
 }catch (e:any){
   const fileName:string = `data_1.json5`
   const jsonDataUrl:string = getPublicPath(`/json/${fileName}`)
   const response:any = await fetch(jsonDataUrl)
   if (!response.ok) throw new Error(`${fileName} 不存在`)
   getData(response)
 }
}

watch(() => codestr,(val: string)=>{
  if (val){
    qNumber.value = Number(val)
    loadDataJson()
  }else {
    loadDataJson()
  }
},{
  immediate: true
})

provide('dataJson',dataJson)
provide('qNumber',qNumber)

</script>

<style scoped lang="scss">
.case-analysis {
  min-height: 100%;
  background: #eee;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  .label-count{
    font-size: 16px;
    padding: 10px;
    >span{
      color: #24B49B;
      margin-left: 15px;
    }
  }
  .body{
    padding: 10px;
    background-color: #fff;
  }
}
</style>