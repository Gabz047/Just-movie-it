<script setup>
import { shallowRef, computed, onMounted } from 'vue';
import { useMovieStore } from '@/stores';
const movieStore = useMovieStore()
import router from '@/router';

const search = shallowRef('Search for a movie')
const focused = shallowRef(null)
const focusComp = computed(() => {
    focused.value.focus()
    if (typeof focused.value.focus === 'function') {
        console.log('entro')
        search.value = ''
    }
})


onMounted(async()=>{
    // await songStore.getSongs()
})


const emits = defineEmits([
    'search'
])

const searchByName = (search) => {
    emits('search', search)
    movieStore.listMoviesBySearch(search, false, 'en')
} 
</script>
<template>
     <div class="flex justify-center relative">
      <div class="h-[40px] w-[284px] flex items-center relative bg-[#151515] rounded-lg z-30">
            <input @keyup="searchByName(search)" :class="search == 'Search for a movie' ? 'text-[#373737]' : 'text-white'" ref="focused" class="h-full w-[80%] outline-none bg-transparent p-2 relative" type="text" v-model="search" @click="focusComp" @blur="search == '' ? search = 'Search for a movie' : '', focused = null" >
            <span @click="router.push('/navigation')" class="mdi mdi-magnify duration-500 absolute right-3 text-xl text-white px-3 py-2 rounded-full"></span>
           
        </div>
    </div>
       
</template>