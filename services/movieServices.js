const MovieRepository = require("../repositories/movieRepository");

class MovieService {
    static getAllMovies(limit, page, callback) {
        const offset = (page - 1) * limit;
        MovieRepository.getAllMovies(limit, offset, callback);
    }
    static uploadMoviePhoto(id, filePath, callback) {
        MovieRepository.updateMoviePhoto(id, filePath, callback);
      }

    static updateMovie(id, title, genres, year, callback) {
        MovieRepository.updateMovie(id, title, genres, year, callback);
    }
    
    static addMovie(title, genres, year, callback) {
        MovieRepository.addMovie(title, genres, year, callback);
    }
    static deleteMovie(id, callback) {
        MovieRepository.deleteMovie(id, callback);
    }
    
    static getMoviePhoto(id, callback) {
        MovieRepository.getMoviePhoto(id, callback);
      }
    
}

module.exports = MovieService;
