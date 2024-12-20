<script setup>
import { useMovieStore } from '@/stores';
import { computed, onMounted, ref, watch } from 'vue';
import { MovieHomeShow, Header, TrailerPopUp, MovieHomeTitle, GenreBox, GenreContainer, ExtendedMovieShow } from '@/components';
import axios from 'axios';
const movieStore = useMovieStore();
const trailerUrl = ref('');

const metaKey = import.meta.env.VITE_API_KEY

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


const keepFour = ref([])
const fourBests = (amount) => {
  keepFour.value = []
  const filtered = [...movieStore.movies].sort(() => Math.random() - 0.5);
  keepFour.value = filtered.slice(0, 5)
  return filtered.slice(0, amount);
  
};
const firstTime = ref(false)
onMounted(async () => {
  await movieStore.listAllGenres()
  await movieStore.listMovies(1, false, 'en', '').then(() => {
  });
  await movieStore.listMoviesByGenre('', 1, false, 'en')
  fourBests(5)
  firstTime.value = true
 startLoop()


});
const selected = ref(null)
const increment = ref(-1)
const connect = ref(true)
const interval = ref(null)


const runLoop = () => {
  if (connect.value) {
  if (interval.value) {
    clearTimeout(interval.value);
  }
    if (interval.value && increment.value < 4) {
      increment.value++;
    } else if (increment.value >= 4) {
      increment.value = 0; 
    }

    console.log(increment.value)
    selected.value = keepFour.value[increment.value];

    if (firstTime.value) {
      interval.value = setTimeout(runLoop, 0);
      firstTime.value = false
    } else {
    interval.value = setTimeout(runLoop, 5000);
  }
  }
};

const stopLoop = () => {
  
  console.log('stop')
  connect.value = false;
  clearTimeout(interval.value); 
  interval.value = null

};

const startLoop = () => {
  console.log('start')
  stopLoop(); 
  connect.value = true;
  runLoop();
 
};



watch(
  () => selected.value, 
  (newVal) => {
    if (newVal) {
      console.log('O filme atual mudou:', newVal);
    }
  }
);

const selectedMovie = (movie) => {
 if (selected.value != null) {
  if (movie.id == selected.value.id) {
    return true
  } else {
    return false
  }
 }
}
const play = ref(false)
const setPlay = () => {
  if (!play.value) {
    stopLoop()
    play.value = true
  } else {
    startLoop()
    play.value = false
  }
}

const name = ref('All')
const genre = ref('All')
const data_id = ref(0)
const page = ref(1)
const loading = ref(false)
const getEmitData = async (data) =>{ 
  loading.value = true
  page.value = 1
   name.value = data.name
   genre.value = data.name
   data_id.value = data.id
   if (data.name != 'All') {
    movieStore.state.moviesByGenre = []
    console.log(data)
      await movieStore.listMoviesByGenre(data.id, 1, false, 'en')
      
   } else {
    movieStore.listMoviesByGenre('',1,false,'en')
   }
   loading.value = false
   console.log(movieStore.moviesByGenre)

}



const foward = async () => {
  loading.value = true
  movieStore.state.moviesByGenre = []
   page.value++

   if (data_id.value == 0) {
    data_id.value = ''
 
  }

  setTimeout(()=>{movieStore.listMoviesByGenre(data_id.value, page.value, false, 'en')
  loading.value = false
  },800)
  
} 

const backward = async () => {
  loading.value = true
  movieStore.state.moviesByGenre = []
   page.value--

   if (data_id.value == 0) {
    data_id.value = ''
  
  }

  setTimeout(()=>{movieStore.listMoviesByGenre(data_id.value, page.value, false, 'en')
  loading.value = false
  },800)
  
 
} 

const compare = (emitName) => {
   if (emitName?.name === name.value){
    return true
   } else {
    return false
   }
}

const onSearch = ref('Search for a movie')

const getSearch = (data) => {
 onSearch.value = data
}

</script>


<template>
   <Header @search="getSearch" v-if="!play" />
  <section v-if="onSearch == 'Search for a movie' || onSearch == ''" class="w-full flex flex-col relative z-20 min-h-screen bg-no-repeat bg-cover object-cover" :style="{backgroundImage: `url(${'https://image.tmdb.org/t/p/original/' + selected?.backdrop_path})`}">
   
  
    <TrailerPopUp @action="setPlay()" :url="trailerUrl" :play="play" />
    <MovieHomeTitle :data="selected" />
    <div class="w-full flex gap-7  justify-center absolute z-[999] bottom-10 ">
      <MovieHomeShow @action="setPlay(), getMovieTrailer(movie.id)"
        v-for="movie in keepFour"
        :key="movie.id"
        :title="movie.original_title"
        :image="'https://image.tmdb.org/t/p/original/' + movie.backdrop_path"
        :selected-movie="selectedMovie(movie)"
        :play="play"
      />
    </div>
   
    

    <div style="background: linear-gradient(to top, #0B0B0B 15%, transparent 100%)" class="absolute w-screen h-screen z-20"></div>
  </section>
  <section  v-if="onSearch == 'Search for a movie' || onSearch == ''" class="w-full pb-32">
    <GenreContainer  :activeLeft="movieStore.state.toLeft > 0 ? true : false" :activeRight="movieStore.state.toLeft <= 900 ? true : false" @left="movieStore.state.toLeft <= 0 ? '' : movieStore.state.toLeft -= 188" @right="movieStore.state.toLeft >= 910 ? '' : movieStore.state.toLeft += 188" >
    <div :style="{marginLeft: `-${movieStore.state.toLeft}px`}" :class="`flex w-full gap-4 duration-300`" >
      <GenreBox :active="compare({id: 0, name: 'All'})" @action="getEmitData" :data="{id: 0, name: 'All'}" />
    <GenreBox :active="compare(genre)" @action="getEmitData" v-for="genre in movieStore.genres" :data="genre" />
    </div>
    </GenreContainer>
    <div class="w-full flex flex-wrap justify-center">
      <div class="w-11/12 py-5 px-8 flex flex-wrap gap-10">
   <ExtendedMovieShow v-if="!movieStore.loading" class="mt-8" :genre="genre"  v-for="movie in movieStore.moviesByGenre" :data="movie" :image="'https://image.tmdb.org/t/p/original/' + movie.poster_path" />
   <p v-if="movieStore.loading || loading" class="text-[#FBDA58] text-center text-3xl w-full flex justify-center loading">
  Carregando<span class="dots"></span>
</p>


   
  </div>
 
  </div>
  <div class="flex cursor-pointer select-none text-white gap-5 w-full justify-center mt-24 items-center">
    <span :class="page > 1 ? 'text-[#FBDA58]' : 'text-slate-300'" class="mdi mdi-chevron-left text-xl bg-black px-2 py-1 rounded-full duration-200 active:bg-[rgb(39,39,39)]" @click="page > 1 ? backward() : ''"></span>
    <p class="text-2xl">{{ page }}</p>
    <span :class="page < 500 ? 'text-[#FBDA58]' : 'text-slate-300'" class="mdi mdi-chevron-right text-xl bg-black px-2 py-1 rounded-full duration-200 active:bg-[rgb(39,39,39)]" @click="page <= 500 ? foward() : ''"></span>
   </div>
  </section>

  <section class="w-full flex flex-wrap justify-center">
    <div class="w-11/12 py-5 px-8 flex flex-wrap gap-10">
      <ExtendedMovieShow v-if="!movieStore.loading" class="mt-8" :genre="genre"  v-for="movie in movieStore.moviesBySearch" :data="movie" :image="'https://image.tmdb.org/t/p/original/' + movie.poster_path" />
   <p v-if="movieStore.loading || loading" class="text-[#FBDA58] text-center text-3xl w-full flex justify-center loading"></p>
    </div>

  </section>
</template>
<style scoped>
.animating {
  animation: animate 0.6s 1 ease-in-out;
}

.loading .dots::after {
  content: ''; 
  display: inline-block;
  animation: loading-dots 1.5s infinite ease-in-out;
}

@keyframes loading-dots {
  0% {
    content: '';
  }
  33% {
    content: '.';
  }
  66% {
    content: '..';
  }
  100% {
    content: '...';
  }
}
@keyframes animate {
  from {
    margin-top: -1000px;
  }
  to {
    margin-top: 0px;
  }
}

</style>