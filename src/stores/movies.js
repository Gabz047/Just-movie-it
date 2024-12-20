import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { MovieService } from '@/services/index'
import { useStorage } from '@vueuse/core'

export const useMovieStore = defineStore('movieStore', () => {
  const state = useStorage('movieStorage', {
    movies: [],
    moviesBySearch: [],
    moviesByGenre: [],
    selectedMovie: {},
    genres: [{id: 0, name: 'All'},],
    moviesById: null,
    error: null,
    loading: false,
    toLeft: 0
  })

  const movies = computed(()=>state.value.movies)
  const moviesBySearch = computed(()=>state.value.moviesBySearch)
  const moviesByGenre = computed(()=>state.value.moviesByGenre)
  const selectedMovie = computed(()=>state.value.selectedMovie)
  const moviesById = computed(()=>state.value.moviesById)
  const loading = computed(()=> state.value.loading)
  const genres = computed(()=> state.value.genres)

  const listMovies = async (page, isAdult, language, sort) => {
    state.value.loading = true
    try {
      const response = await MovieService.listMovies(page, isAdult, language, sort)
      state.value.movies = response
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
    }
    
  }

  const listMoviesBySearch = async (search, isAdult, language) => {
    state.value.loading = true
    try {
      const response = await MovieService.listMoviesBySearch(search, isAdult, language)
      state.value.moviesBySearch = response
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
    }
    
  }

  const listMoviesById = async (id, isAdult, language) => {
    state.value.loading = true
    try {
      const response = await MovieService.listMoviesById(id, isAdult, language)
      state.value.moviesById = response
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
    }
    
  }

  const listMoviesByGenre = async (genre, page, isAdult, language) => {
    state.value.loading = true
    try {
      const response = await MovieService.listMoviesByGenre(genre, page, isAdult, language)
      state.value.moviesByGenre = response
      console.log('got by genre', response)
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
    }
    
  }

  const listAllGenres = async () => {
    state.value.loading = true

    try {
      const response = await MovieService.getAllGenres()
      state.value.genres = response
      console.log(state.value.genres)
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
    }
  }

  return { state, listMovies, listMoviesByGenre, listMoviesById, listMoviesBySearch, movies, moviesBySearch, moviesById, selectedMovie, moviesByGenre, listAllGenres, genres, loading }
})
