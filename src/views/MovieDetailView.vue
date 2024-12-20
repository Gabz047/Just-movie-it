<script setup>
import { onMounted, ref } from 'vue';
import { useMovieStore } from '@/stores';
import { useRoute } from 'vue-router';
import Header from '@/components/header/Header.vue';
import user_default from '@/assets/images/icons/user_default.jpg'
const route = useRoute()
const movieStore = useMovieStore()
const id = route.params.id
import axios from 'axios';
const trailerUrl = ref('');
const metaKey = import.meta.env.VITE_API_KEY

onMounted(async()=>{
    console.log(id)
 await movieStore.listMoviesById(id, false, 'en')
 console.log(movieStore.moviesById)
 getMovieTrailer(movieStore.moviesById.id)
})

const convertToFraction = (number) => {
  let newNumber = Math.round(number)

  newNumber = newNumber/10

  newNumber = newNumber*5
  return newNumber
}



const getMovieTrailer = async (movieId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${metaKey}`);
    const data = response.data;

    const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');

    if (trailer) {
      trailerUrl.value = `https://www.youtube.com/embed/${trailer.key}`;
    } else {
      console.error('Nenhum trailer encontrado');
    }

    console.log(trailerUrl.value)
  } catch (error) {
    console.error('Erro ao buscar o trailer:', error);
  }
};

const hover = ref(false)
const hold = ref(false)
</script>
<template>
    <Header />
<section class="w-full min-h-screen flex justify-center items-center">
    <div class="w-6/12 h-[453px] flex items-center flex-col">
        <div @mouseenter="hold ? '' : hover = true" @mouseleave="hold ? '' : hover = false" class="w-11/12 rounded-2xl flex relative">
        <img class="rounded-2xl h-[423px] object-cover w-full" :src="'https://image.tmdb.org/t/p/original/' + movieStore.moviesById.backdrop_path" alt="">
        <div v-if="hover" class="absolute h-[423px] rounded-2xl bg-[rgba(94,94,94,0.5)] backdrop-blur-sm w-full flex justify-center items-center appear">
            <div class="absolute w-full h-full">
            <iframe class=" rounded-2xl" v-if="trailerUrl" :src="trailerUrl" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
        </div>
         
        </div>
    </div>
    <div class="w-full flex gap-2 px-8 mt-4">
    <div v-for="item in movieStore.moviesById.genres" :class="`bg-[#dabc47] flex px-3 py-[2px] rounded-xl justify-center items-center`">
          <p class="text-sm">{{ item.name }}</p>
        </div>
    </div>
</div>

    <div class="w-6/12 flex flex-col min-h-[65dvh] justify-start">
        <div class="w-full flex gap-3 flex-wrap text-white font-bold">
            <p class=" text-nowrap" v-for="producters in movieStore.moviesById.production_companies">{{ producters.name }},</p>
            <p>{{ movieStore.moviesById.director }}</p>
        </div>
        <div class="w-full flex">
            <h1 class="text-white text-6xl font-bold">{{ movieStore.moviesById.original_title }}</h1>
        </div>
        <div class="w-10/12 mt-3 flex text-justify">
            <p class="text-white font-medium text-lg">{{ movieStore.moviesById.overview }}</p>
        </div>
        <div class="w-full flex gap-3">
            <div class="flex gap-2">
            <span v-for="item in 5" :class="item <= convertToFraction(movieStore.moviesById.vote_average) ? 'text-yellow-200' : 'text-white'" class="mdi mdi-star"></span>
        </div>
            <p class="text-white">{{ convertToFraction(movieStore.moviesById.vote_average) }}</p>

            <p class="text-[#dabc47]">or</p>

            <p class="text-white">{{ movieStore.moviesById.vote_average.toFixed(2) }}</p>
        </div>
    </div>
</section>
<section class="w-full flex justify-center flex-col gap-4 flex-wrap pb-32">
     <div class="w-full flex justify-center gap-4 flex-wrap">
    <div v-for="person in movieStore.moviesById.cast" class="w-64 bg-[rgba(41,41,41,0.2)] backdrop-blur-md rounded-lg h-72 flex flex-col items-center gap-5 justify-center">
        <div class="rounded-full size-44">
            <img class="rounded-full w-full h-full object-cover" :src="person.profile_path != null ? 'https://image.tmdb.org/t/p/original/' + person.profile_path : user_default" alt="">
        </div>
        <div class="w-full justify-center flex-col flex items-center">
            <p class="text-white font-semibold">{{ person.name }}</p>
            <p class="text-sm text-[#FBDA58]">{{ person.character }}</p>
        </div>
    </div>
</div>
</section>
</template>

<style scoped>

.appear {
    animation: appear 0.5s 1;
}

@keyframes appear {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>