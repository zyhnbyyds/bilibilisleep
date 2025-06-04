<script lang='ts' setup>
const emits = defineEmits<
  {
    start: [code: string]
  }
>()

const visible = defineModel<boolean>({ default: false })
const [isPermit, toggle] = useToggle()
const code = ref(localStorage.getItem('code') || '')

watchEffect(() => {
  if(visible.value) {
    code.value = localStorage.getItem('code') || ''
  }
})

function hdClickOpen() {
  if (!code.value) {
    // eslint-disable-next-line no-alert
    alert('请输入身份码')
    return
  }

  if(isPermit.value) {
    localStorage.setItem('code', code.value)
  }

  emits('start', code.value)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="h-full fixed w-full top-0 left-0 bg-dark-1 bg-op50 flex justify-center items-center" @click="visible = false">
        <div class="w-400px py-5 bg-white flex flex-col items-center rounded-5px relative" @click.stop>
          <img src="../../public/close_s.png" cursor-pointer @click="visible = false" alt="close-icon" absolute right-15px top-15px h-13px w-13px>
          <h1 class="text-[#FF6699]  text-4.3 text-center">
            认证身份后可开启玩法
          </h1>

          <BiliIpt v-model="code" w-310px mt-8 prefix="身份码" placeholder="请输入身份码" />

          <div w-310px flex mt-1 text-3 items-center justify-between mb-50px>
            <span flex items-center>
              <img mr-6px src="../../public/confuse.png" h-4 w-4 alt="confuse">
              <span class="text-#C9CCD0">在获取推流地址处可获取身份码</span>
            </span>

            <a class="text-#FF6699" target="_blank" href="https://play-live.bilibili.com/">
              去获取
            </a>
          </div>

          <button px-8 py-2 text-3.5 class="bg-#FF6699 bg-op90 transition-colors hover:bg-op100 rounded" @click="hdClickOpen">
            开启玩法
          </button>

          <div mt-2 flex items-center select-none cursor-pointer @click="toggle()">
            <img mr-1.1 h-14px w-14px :src="isPermit ? '../../public/checked.png' : '../../public/no-check.png'" alt="checkbox">
            <span class="text-#61666D text-3">记住身份码</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
