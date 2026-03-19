<template>
  <div class="answer-questions">
    <div class="row">
      <div class="col">
        <p class="title">答题要求</p>
        <p>{{ dataJson.dtyq }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">考试时间：{{ dataJson.kssj }}</div>
    </div>
    <div class="row">
      <div class="col">评分标准</div>
      <div class="w-35">
        <div class="col center">总分22分</div>
      </div>
    </div>
    <div class="row-box" v-for="(item,index) in questions" :key="index">
      <div class="row">
        <div class="col head">{{ item.text }}</div>
        <div class="w-35">
          <div class="col">是否答对</div>
          <div class="col txt-c"><span v-if="item.total === parseFloat(item.fs)">{{ item.total || 0 }}分</span><span v-else style="color: #ff0000">{{ item.total || 0 }}分</span></div>
        </div>
      </div>

     <template v-if="item.children && item.children.length && item.toggle">
       <div class="row" v-for="(o,v) in item.children" :key="v"  @click="toggleRow(index, v)">
         <div class="col"><span>{{ o.text }}</span></div>
         <div class="w-35">
           <div class="col"><van-checkbox v-model="o.check" shape="square" v-if="o.fs" @change="onCheck(index,o)"/></div>
           <div class="col txt-c"><span v-if="o.fs">{{ o.fs }}</span></div>
         </div>
       </div>
     </template>
      <div class="row">
        <div class="col">
          <p class="toggle-btn" @click="onToggle(index)">{{item.toggle ? '收起答案' : '展开答案'}}<van-icon :name="item.toggle ? 'arrow-up' : 'arrow-down'" color="#0283EF"/></p>
        </div>
      </div>
    </div>
    <div class="row" v-if="totalScore > 0">
      <div class="col txt-blue">您的考试总得分：{{totalScore}}分，{{totalScoreTip}}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, inject, watch} from 'vue'
const dataJson:any = inject('dataJson')
const clickedRows = ref<Set<string>>(new Set())
const questions = ref<any[]>([])
const totalScore = ref<number>(0)
const totalScoreTip = ref<string>('')

watch(()=>dataJson.value.pfxz,(vals:any[])=>{
  if (vals.length > 0) {
    const _vals:any[] = JSON.parse(JSON.stringify(vals))
    const list:any[] = []
    _vals.forEach((item:any)=>{
      if (item.children && item.children.length > 0) {
        const processedChildren: any[] = [];
        item.check = false
        item.toggle = false
        item.children.forEach((o:any)=>{
          if (o.children && o.children.length > 0) {
            const flattened = flattenToFlatArray(o);
            processedChildren.push(...flattened);
          } else {
            processedChildren.push(o);
          }
        })
        item.children = processedChildren;
      }
      list.push(item)
    })
    questions.value = list
  }
},{
  deep:true
})

const flattenToFlatArray = (data:any) => {
  const result:any[] = [{
    text: data.text,
    fs: data.fs,
    check: false,
  }];
  if (data.children && Array.isArray(data.children)) {
    result.push(...data.children);
  }
  return result;
};

const onToggle = (index:number) => {
  questions.value[index].toggle = !questions.value[index].toggle;
}

const toggleRow = (parentIndex: number, childIndex: number) => {
  const key:string = `${parentIndex}-${childIndex}`
  if (clickedRows.value.has(key)) {
    clickedRows.value.delete(key)
  } else {
    clickedRows.value.add(key)
  }
}

const onCheck = (index:number,row:any) => {
  const item:any = questions.value[index];
  const fs:number = parseFloat(row.fs)
  const check:boolean = row.check
  const total:number = item.total || 0
  item.total = check ? total + fs : total - fs;
  const score:number = check ? totalScore.value + fs : totalScore.value - fs
  totalScore.value = score
  totalScoreTip.value = score > 17 ? '您已经基本掌握了本考点！' : '您还需要加强本考点的练习哦~'
}
const isRowClicked = (parentIndex: number, childIndex: number) => {
  return !clickedRows.value.has(`${parentIndex}-${childIndex}`)
}
</script>

<style scoped>
.answer-questions{
  border: 1px solid #eee;
    .row{
      display: flex;
      align-items: stretch;
      justify-content: center;
      .w-35{
        width: 35%;
        text-align: center;
        display: flex;
      }
      .col{
        font-size: 14px;
        flex: 1;
        padding: 5px;
        line-height: 22px;
        border: 1px solid #eee;
        margin-left: -1px;
        margin-top: -1px;
        display: block;
        align-items: center;
        > span{
          color: #24B49B;
          display: inline;
          color-scheme: light;
          forced-color-adjust: none;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          position: relative;
          z-index: 1;
        }
        .txt-bg{
          color: transparent !important;
          line-height: 24px;
          background-color: #24B49B;
        }
        .title{
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 5px;
        }
        &:last-child{
          border-right: 0;
        }
        .toggle-btn{
          font-size: 14px;
          color: #0283EF;
          text-align: center;
        }
      }
      .txt-blue{
        color: #0283EF;
      }
      .txt-c{
        display: flex;
        text-align: center;
        justify-content: center;
      }
      .head{
        font-size: 16px;
        font-weight: bold;
      }
    }
  .row-box{
    &:last-child{
      .row{
        .col{
          border-bottom: 0;
        }
      }
    }
    .row{
      .w-35{
        .col:first-child{
          flex: none;
          width: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>