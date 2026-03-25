<template>
  <div class="blfxdxlb">
    <van-image class="top-bg" width="100%" :src="topBg" />
    <div class="body">
      <div class="content">
        <van-sidebar v-model="activeKey" @change="getCase">
          <van-sidebar-item v-if="dataJson.data && dataJson.data.length > 0" v-for="(item,index) in dataJson.data" :key="index">
            <template #title>
              <p class="title">{{ item.text }}</p>
              <p class="count">共{{ item?.children?.length || 0 }}个病例</p>
            </template>
          </van-sidebar-item>
        </van-sidebar>
        <div class="right">
          <van-list v-if="caseList.length > 0">
            <van-cell v-for="item in caseList" :key="item">
             <div class="row">
               <div class="txt">{{item.text}}</div>
               <div class="btn" @click="toAnswer(item.codestr)">去答题 ></div>
             </div>
            </van-cell>
          </van-list>
          <van-skeleton title :row="10" animate v-else/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import JSON5 from 'json5'
import topBg from '@/assets/top-bg.png'
import {getPublicPath} from "@/utils/pathHelper";
const router = useRouter()
const dataJson = ref<any>({})
const activeKey = ref<number>(0)
const caseList = ref<any[]>([])

const loadDataJson = async () => {
  const fileName:string = `homedata.json5`
  const jsonDataUrl:string = getPublicPath(`/json/${fileName}`)
  const response:any = await fetch(jsonDataUrl)
  if (!response.ok) throw new Error(`${fileName} 不存在`)
  const text:string = await response.text()
  dataJson.value = JSON5.parse(text)
  getCase()
}
loadDataJson()

const getCase = () => {
  const _dataJson:any = dataJson.value || {}
  if (_dataJson.data && _dataJson.data.length > 0) {
    caseList.value = _dataJson.data[activeKey.value].children || []
  }
}

const toAnswer = (codestr:string) => {
  if (codestr){
    router.push({
      name:'blfxdx',
      query:{
        codestr,
        type:'home'
      }
    })
  }
}

</script>

<style scoped>
.blfxdxlb{
  width: 100%;
  height: 100%;
  position: relative;
  .top-bg{
    position: absolute;
    top: -50px;
    z-index: 1;
  }
  .body{
    position: absolute;
    top: 150px;
    width: 100%;
    height: calc(100% - 150px);
    padding: 10px;
    z-index: 2;
    .content{
      height: 100%;
      background-color: #fff;
      display: flex;
      .van-sidebar{
        --van-sidebar-selected-border-color: #3CAA8B;
        background-color: var(--van-sidebar-background);
        .van-sidebar-item{
          padding: 15px 5px;
          text-align: center;
          .title{
            font-size: 14px;
          }
          .count{
            font-size: 10px;
            color: #aaa;
          }
        }
        .van-sidebar-item--select{
          .van-badge__wrapper{
            .title,.count{
              color: #3CAA8B;
            }
          }
        }
        .van-sidebar-item--select::before{
          left: -2px;
        }
      }
      .right{
        flex: 1;
        overflow-y: auto;
        .van-list{
          .van-cell{
            padding: 10px;
            .row{
              display: flex;
              .txt{
                flex: 1;
                font-size: 14px;
                color: #000;
                text-align: left;
                padding-right: 5px;
              }
              .btn{
                width: 60px;
                height: 25px;
                line-height: 25px;
                font-size: 10px;
                color: #000;
                text-align: center;
                margin: auto;
                border-radius: 24px;
                background-color: #D1F0E8;
              }
            }
          }
        }
        .van-skeleton{
          margin-top: 15px;
        }
      }
    }
  }
}
</style>