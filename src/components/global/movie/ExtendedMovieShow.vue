<script setup>
import router from '@/router';
import { adjusteSize } from '@/utils/utilitys';
import { onMounted, ref } from 'vue';
const props = defineProps({
    data: {
        type: Object
    },
    image: {
        type: String
    },
    genre: {
        type: String
    }
})

onMounted(()=>{
    console.log(props.data)
})

const hover = ref(false)
</script>
<template>
   <div class="w-[181px] h-[296px] relative hover-father">
    <img class="w-full rounded-2xl h-[249px] object-cover" :src="props.image" alt="">
    <div :class="`text-white flex flex-col gap-3`">
        <p v-if="props.data.original_title == ''" class=" text-base font-bold">{{ adjusteSize(props.data.original_title, 40, 40) }}</p>
        <p v-else>{{props.data.original_title}}</p>
        <div :class="`flex gap-4`">
            <p class="font-bold text-[#FBDA58]">{{ props.data?.vote_average > 0 ? (props.data?.vote_average).toFixed(2) : props.data?.vote_average }}</p>
            <span class="px-8 text-sm rounded-md border-[#FBDA58] border-2">{{ props.genre }}</span>
        </div>
    </div>
    <div @click="router.push('/movie/' + props.data.id)" class=" z-30 absolute w-full h-[249px] top-0 backdrop-blur-[2px] rounded-2xl duration-200 select-none cursor-pointer bg-[rgba(30,30,30,0.5)] flex justify-center items-center hover-son">
    <div class="flex gap-2 text-white text-2xl"><p class=" font-light">Details</p><span class="mdi mdi-chevron-right  text-3xl"></span></div>
    </div>
   </div>
</template>

<style scoped>
.hover-son {
    opacity: 0;
    transition: 0.2s;
}
.hover-father:hover .hover-son {
    opacity: 1;
}
</style>