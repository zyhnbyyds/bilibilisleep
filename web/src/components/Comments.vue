<script lang='ts' setup>
import type { BiliMessage } from '@type/bilibili'

const props = defineProps<{
  comments: BiliMessage[]
}>()
const scrollRef = ref<HTMLElement | null>(null)
const { y } = useScroll(scrollRef, { behavior: 'smooth' })

watch(props.comments, () => {
  nextTick(() => {
    scrollBottom()
  })
})

function scrollBottom() {
  y.value = scrollRef.value?.scrollHeight || 0
}

defineExpose({
  scrollBottom,
})
</script>

<template>
  <div ref="scrollRef" w-80 overflow-y-auto m-5 rounded-3 class="h-[calc(100%-2.5rem)] scrollbar p-2">
    <div v-for="item in comments" :key="item.msg_id" flex gap-2 p-2>
      <img src="/uface.jpg" h-7 w-7 rounded-full>
      <div inline-block bg-gray-3 bg-op20 text-3 px-2 text-white rounded leading-7>
        {{ item.msg }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar {
  scrollbar-color: gray transparent;
}
</style>
