const pool = require("../config/connection");

class MovieRepository {
    static getAllMovies(limit, offset, callback) {
        const query = 'SELECT * FROM movies LIMIT $1 OFFSET $2';
        pool.query(query, [limit, offset], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        });
    }

    static updateMoviePhoto(id, filePath, callback) {
        pool.query(
          'UPDATE movies SET photo = $1 WHERE id = $2 RETURNING id',
          [filePath, id],
          callback
        );
      }
    
}



module.exports = MovieRepository;
