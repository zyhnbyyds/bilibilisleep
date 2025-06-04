<script lang='ts' setup>
defineProps<
  {
    label?: string
    prefix?: string
    clearable?: boolean
    placeholder?: string
  }
>()

const ipt = defineModel<string>({ default: '' })
</script>

<template>
  <div h-33px flex items-center relative class="border-[#E3E5E7] border-1 border-solid rounded-1 overflow-hidden">
    <label v-if="prefix" text-dark h-33px w-auto text-3.5 px-3 py-2 border-r-1 class="bg-[#F6F7F8] border-[#E3E5E7]">
      {{ prefix }}
    </label>
    <input v-model="ipt" :placeholder="placeholder" text-3.5 flex-1 p-2.5 pr-28px text-dark-1 h-33px outline-none type="text">
    <img src="../../public/close.png" alt="close" cursor-pointer h-2.5 w-2.5 absolute right-2 class="top-50% -translate-y-50%" @click="ipt = ''">
  </div>
</template>

<style scoped></style>
