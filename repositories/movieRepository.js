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

    static updateMovie(id, title, genres, year, callback) {
        pool.query(
            'UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4 RETURNING id',
            [title, genres, year, id],
            callback
        );
    }
    
    static addMovie(title, genres, year, callback) {
        // Implementasi logika untuk menghasilkan newId secara manual
        // mendapatkan newId dari idterakhir +1
        pool.query('SELECT id FROM movies ORDER BY id DESC LIMIT 1', (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                let newId = 1; // Nilai default jika tabel kosong
                if (result.rows.length > 0) {
                    newId = result.rows[0].id + 1;
                }
    
                pool.query(
                    'INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4) RETURNING *',
                    [newId, title, genres, year],
                    (error, result) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            callback(null, result.rows[0]);
                        }
                    }
                );
            }
        });
    }
    
    static deleteMovie(id, callback) {
        pool.query(
            'DELETE FROM movies WHERE id = $1 RETURNING *',
            [id],
            callback
        );
    }
    
    static getMoviePhoto(id, callback) {
        pool.query(
          'SELECT photo FROM movies WHERE id = $1',
          [id],
          callback
        );
      }
}



module.exports = MovieRepository;
