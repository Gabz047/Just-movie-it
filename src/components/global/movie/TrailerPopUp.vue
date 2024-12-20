<script setup>

const props = defineProps({
    url: {
        type: URL
    },
    play: {
        type: Boolean
    }
})

const emits = defineEmits([
    'action'
])
</script>
<template>
    <div v-if="props.play" class="w-screen h-screen bg-[rgba(0,0,0,0.7)] backdrop-blur-sm fixed z-[99999999] flex flex-col items-center animating">
      <span @click="emits('action')" style="background: linear-gradient(to right, rgba(42,42,42,0.7) 5%, rgba(71,71,71,0.5) 100%)" class="text-white mt-5 backdrop-blur flex h-10 px-6 justify-center items-center gap-4 hover:gap-5 duration-200 hover:scale-[1.03] select-none cursor-pointer rounded-xl">
       <p>Go Back</p>
       <span class="mdi mdi-chevron-right text-xl"></span>
    </span>
      <div class="w-[1000px] mt-8 h-64 z-50 top-24 left-64">
      <iframe v-if="props.url" :src="props.url" width="1000" height="550" frameborder="0" allowfullscreen></iframe>
    <p v-else>Carregando trailer...</p>
    </div>
    </div>
</template>