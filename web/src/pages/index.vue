<script lang='ts' setup>
import { doEnd, doStart } from '@libs/apis'
import { createSocket, destroySocket, sleepPeopleMap, timer } from '@libs/socket'

const visible = ref(false)
const code = ref(localStorage.getItem('code') || '')
const gameId = ref('')

if (!code.value) {
  visible.value = true
}
else {
  handleOpen(code.value)
}

async function handleOpen(zbCode: string) {
  code.value = zbCode
  const { data } = await doStart(zbCode)
  if (!data.value) {
    return
  }
  visible.value = false
  const { websocket_info, game_info: { game_id } } = data.value
  gameId.value = game_id
  createSocket({
    game_id,
    ...websocket_info,
  })
}

onBeforeUnmount(() => {
  destroySocket()
  if (gameId.value) {
    doEnd(gameId.value)
  }
  sleepPeopleMap.value.clear()
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div text-dark dark:text-white class="page h-full w-full">
    <BiliModal v-model="visible" @start="handleOpen" />

    <div v-if="!visible">
      <TransitionGroup name="fade">
        <div v-for="item in sleepPeopleMap" :key="item[1].open_id">
          <SleepAva v-bind="item[1]" />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.page {
  background-image: url('/sleep.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
