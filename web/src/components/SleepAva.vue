<script lang='ts' setup>
import type { SleepPeopleItem } from '@type/sleep'

const { style = {}, uface } = defineProps<SleepPeopleItem>()
</script>

<template>
  <div animate-bounce :style="{ ...style, left: `${style.left}%`, right: `${style.right}%` }" fixed bottom-10 transition-all duration-700>
    <Transition name="fade">
      <div v-if="msg || emoji_img_url" bg-dark-2 text-light-8 text-nowrap rounded-md w-auto p-2 py-1 class="absolute -top-100% left-50% -translate-x-50%">
        <span v-if="msg">{{ msg }}</span>
        <img v-if="emoji_img_url" :src="emoji_img_url" h-20>
      </div>
    </Transition>

    <img h-10 w-10 rounded-full :src="uface">
  </div>
</template>

<style scoped></style>
