<template>
  <div class="get-more" @click="showQRCode">
<!--    <van-image :src="qrCodeUrl"/>-->
    <p>获取更多</p>
  </div>
  
  <!-- 二维码弹窗 -->
  <van-popup class="qr-popup" v-model:show="showPopup" round>
     <div class="popup-body">
       <van-image :src="qrCodeUrl" class="qr-image"/>
       <p class="tip-text">{{ tipText }}</p>
     </div>
    <van-icon class="close-icon" name="close" size="28px" @click="showPopup = false"/>
  </van-popup>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const qrCodeUrl:string = '/sjjn/blfxdx/img/qrcode.png'
const showPopup = ref<boolean>(false)
const tipText = ref<string>('')
const isWeChat = () => {
  const ua:any = navigator.userAgent.toLowerCase()
  return ua.includes('micromessenger')
}

const checkWeChatEnv = () => {
  tipText.value = isWeChat() ? '长按识别二维码获取更多病例带学资料！' : '请在微信中长按识别二维码，可获取更多病例带学资料！'
}

const showQRCode = () => {
  showPopup.value = true
}

onMounted(() => {
  checkWeChatEnv()
})
</script>

<style scoped>
.get-more{
  width: 50%;
  position: fixed;
  right: 0;
  left: 0;
  margin: auto;
  bottom: 20px;
  padding: 10px 5px;
  text-align: center;
  border-radius: 24px;
  box-sizing: border-box;
  background-color: #1DBE8A;
  z-index: 88;
  touch-action: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  > p{
    font-size: 16px;
    color: #fff;
    margin: 0;
    font-weight: bold;
  }
  
  .van-image{
    width: 35px;
    height: 35px;
    display: block;
    margin: 0 auto 2px;
  }
}

.qr-popup {
  text-align: center;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  .popup-body{
    width: 70%;
    padding: 20px !important;
    margin-bottom: 40px;
    border-radius: 12px;
    background-color: #fff;
    .qr-image {
      display: block;
      margin-bottom: 10px;
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
    }

    .tip-text {
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      margin: 0;
      font-weight: 500;
    }
  }
  .close-icon{
    position: fixed;
    left: 0;
    right: 0;
    font-size: 16px;
    color: #fff;
    bottom: 0;
    margin: auto;
  }
}
</style>