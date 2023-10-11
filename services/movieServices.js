const MovieRepository = require("../repositories/movieRepository");

class MovieService {
    static getAllMovies(limit, page, callback) {
        const offset = (page - 1) * limit;
        MovieRepository.getAllMovies(limit, offset, callback);
    }
    static uploadMoviePhoto(id, filePath, callback) {
        MovieRepository.updateMoviePhoto(id, filePath, callback);
      }
    
}

module.exports = MovieService;
