<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: {
        type: String
    },
    image: {
        type: String
    },
    selectedMovie: {
        type: Boolean
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
    <div @click="emits('action')" :style="{backgroundImage: `url(${props.image})`}" class="w-[270px] bg-cover cursor-pointer bg-no-repeat object-cover flex rounded-2xl rounded-b-none relative hover:scale-105 duration-300 justify-end flex-col h-[168px] bg-white">
       <p class="text-white p-3 z-30"> {{ props.title }} </p>
       
       <div v-if="props.selectedMovie" class="absolute w-full h-full hover:scale-105 z-20 duration-300 flex justify-center items-center">
        <div  class="flex h-14 w-24 rounded-xl absolute bg-[#FBDA58]">
            <span :class="`mdi ${ !props.play ? 'mdi-play' : 'mdi-pause'} text-5xl flex justify-center items-center w-full h-full text-white`"></span>
        </div>
    </div>
       <div style="background: linear-gradient(to top, #0B0B0B 1%, transparent 100%)" class="absolute w-full h-full  hover:scale-105 z-20 duration-300 opacity-50 hover:opacity-30">
       
       </div>
       <div v-if="props.selectedMovie && !props.play" class="absolute bottom-0 bg-[rgba(0,0,0,0.4)] w-full h-1 hover:scale-105 z-20 duration-300">
        <div class=" bg-yellow-400 h-full animate"></div>
       </div>
    </div>
</template>

<style scoped>
.animate {
    animation: animate 5s ease-in-out 1;
}

@keyframes animate {
    from {
        width: 0%;
    }
    to  {
        width: 100%;
    }
}
</style>