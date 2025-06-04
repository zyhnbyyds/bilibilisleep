<script lang='ts' setup>
const visible = ref(false)

function handleOpen(_code: string) {
  visible.value = false
}
</script>

<template>
  <div text-dark dark:text-white>
    <button @click="visible = !visible">
      test
    </button>
    <BiliModal v-model="visible" @start="handleOpen" />
  </div>
</template>

<style scoped></style>
