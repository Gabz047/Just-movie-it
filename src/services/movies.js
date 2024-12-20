import api from '@/plugins/api'
const apiKey = import.meta.env.VITE_API_KEY
class MovieService {
    async listMovies(page, isAdult, language, sort) {
        try {
          
          const { data } = await api.get(`discover/movie?include_adult=${isAdult}&include_video=true&language=${language}&page=${page}&sort_by=${sort}&api_key=${apiKey}`);
          
          
          const moviesWithDetails = await Promise.all(data.results.map(async (movie) => {
           
            const creditsResponse = await api.get(`movie/${movie.id}/credits?api_key=${apiKey}`);
            movie.cast = creditsResponse.data.cast;  
      
           
            const detailsResponse = await api.get(`movie/${movie.id}?api_key=${apiKey}`);
            movie.genres = detailsResponse.data.genres;  
      
            return movie;
          }));
          
          return moviesWithDetails;
        } catch (error) {
          console.log('Error in movies {GET}', error);
          throw error;
        }
      }

      async listMoviesById(id, isAdult, language) {
        try {
            
            const movieResponse = await api.get(`movie/${id}?include_adult=${isAdult}&language=${language}&api_key=${apiKey}`);
            const movie = movieResponse.data;
    
        
            const creditsResponse = await api.get(`movie/${id}/credits?api_key=${apiKey}`);
            const credits = creditsResponse.data;
    
        
            const director = credits.crew.find(person => person.job === 'Director');
            movie.director = director ? director.name : 'Unknown';
    
            
            movie.cast = credits.cast.slice(0, 10);
    
            return movie;
        } catch (error) {
            console.log('Error in listMoviesById {GET}', error);
            throw error;
        }
    }
    
    

    async listMoviesBySearch(search, isAdult, language) {
        try {
            const {data} = await api.get(`search/collection?query=${search}&include_adult=${isAdult}&language=${language}&api_key=${apiKey}`)
            return data.results
        } catch (error) {
            console.log('error in movies {GET}', error)
            throw error;
        }
    }

    async listMoviesByGenre(genre, page, isAdult, language) {
        try {
            const {data} = await api.get(`discover/movie?include_adult=${isAdult}&include_video=true&language=${language}&page=${page}&with_genres=${genre}&api_key=${apiKey}`)
            return data.results
        } catch (error) {
            console.log('error in movies {GET}', error)
            throw error;
        }
    }

    async getAllGenres() {
        try {
          const { data } = await api.get(`genre/movie/list?api_key=${apiKey}&language=en`);
          return data.genres;  // Retorna a lista de gêneros
        } catch (error) {
          console.log('Error in getting genres {GET}', error);
          throw error;
        }
      }

   
}



export default new MovieService()