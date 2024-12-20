<script setup>
import router from '@/router';

const props = defineProps({
    data: {
        type: Object
    }
})
</script>
<template>
     <div class="w-full flex flex-col justify-end px-10 text-white h-44 absolute bottom-64 z-30">
      <div class="w-full flex gap-4">
        <div v-for="item in props.data?.genres" :class="`bg-[#dabc47] flex px-3 py-[2px] rounded-xl justify-center items-center`">
          <p class="text-sm">{{ item.name }}</p>
        </div>
      </div>
      <div class="flex items-end gap-4">
      <div>
      <p class=" text-lg font-bold">{{props.data?.cast[0].name}}, {{ props.data?.cast[1].name }} +</p>
      <h1 class="text-6xl font-bold">{{props.data?.original_title}}</h1>
    </div>
    <span @click="router.push('/movie/' + props.data.id)"  style="background: linear-gradient(to right, rgba(42,42,42,0.7) 1%, rgba(71,71,71,0.5) 100%)" class=" backdrop-blur flex h-10 px-6 justify-center items-center gap-4 hover:gap-5 duration-200 hover:scale-[1.03] select-none cursor-pointer rounded-xl">
       <p>Details</p>
       <span class="mdi mdi-chevron-right text-xl"></span>
    </span>
      </div>
     </div>
</template>