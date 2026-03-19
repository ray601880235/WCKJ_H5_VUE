<template>
  <div
    ref="elRef"
    class="customer-service"
    :style="{ left: pos.x + 'px', top: pos.y + 'px' }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    role="button"
    tabindex="0"
  >
    <van-image src="/sjjn/blfxdx/img/kefu.png"/>
    <p>人工客服</p>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, reactive, ref } from 'vue'
const dataJson:any = inject('dataJson')
const rgkf:string = 'https://60866.sh.absoloop.com/webim/im.html?configId=5977dc84-ae13-42cc-b45f-b8f735c93298&language=zh-CN'
const elRef = ref<HTMLElement | null>(null)
const pos = reactive<any>({ x: 0, y: 0 })
const dragging = ref<boolean>(false)
const pointerId = ref<number | null>(null)
const moved = ref<boolean>(false)

const startClient = reactive<any>({ x: 0, y: 0 })
const offset = reactive<any>({ x: 0, y: 0 })
const elBox = reactive<any>({ w: 0, h: 0 })
const viewport = reactive<any>({ w: window.innerWidth, h: window.innerHeight })

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

const initPos = () => {
  const el:any = elRef.value
  if (!el) return
  const rect:any = el.getBoundingClientRect()

  pos.x = clamp(viewport.w - rect.width - 10, 0, Math.max(0, viewport.w - rect.width))
  pos.y = clamp(viewport.h * 0.35, 0, Math.max(0, viewport.h - rect.height))
}

const openChat = () => {
  const rgzx: string = dataJson?.value?.rgzx || rgkf
  if (!rgzx) return
  window.open(rgzx)
}

const onPointerDown = (e: PointerEvent) => {
  const el:any = elRef.value
  if (!el) return
  e.preventDefault()
  dragging.value = true
  moved.value = false
  pointerId.value = e.pointerId

  startClient.x = e.clientX
  startClient.y = e.clientY

  const rect:any = el.getBoundingClientRect()
  elBox.w = rect.width
  elBox.h = rect.height
  viewport.w = window.innerWidth
  viewport.h = window.innerHeight

  offset.x = e.clientX - pos.x
  offset.y = e.clientY - pos.y

  try {
    el.setPointerCapture(e.pointerId)
  } catch {
    console.error('浏览器不支持setPointerCapture')
  }
}

const onPointerMove = (e: PointerEvent) => {
  if (!dragging.value) return
  if (pointerId.value !== e.pointerId) return

  const nextX:number = e.clientX - offset.x
  const nextY:number = e.clientY - offset.y

  pos.x = clamp(nextX, 0, Math.max(0, viewport.w - elBox.w))
  pos.y = clamp(nextY, 0, Math.max(0, viewport.h - elBox.h))

  const dx:number = e.clientX - startClient.x
  const dy:number = e.clientY - startClient.y
  if (dx * dx + dy * dy > 25){
    moved.value = true
  }
}

const onPointerUp = (e: PointerEvent) => {
  if (pointerId.value !== e.pointerId) return

  dragging.value = false
  pointerId.value = null

  if (!moved.value) {
    openChat()
  }

  moved.value = false
}

onMounted(() => {
  initPos()
})
</script>

<style scoped>
.customer-service{
  position: fixed;
  left: 0;
  top: 0;
  padding: 10px 5px;
  border: 1px solid #133FF0;
  text-align: center;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 99;
  touch-action: none;
  cursor: grab;
  user-select: none;
  > p{
    font-size: 12px;
    color: #133FF0;
  }
  .van-image{
    width: 40px;
    height: 40px;
  }
}
</style>