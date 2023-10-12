const MovieService = require("../services/movieServices");


class MovieController {
  
    static index(req, res) {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        MovieService.getAllMovies(limit, page, (err, movies) => {
            if (err) {
                res.status(500).json({ message: 'Error fetching data from the database' });
            } else {
                res.render("movies", { movies });
            }
        });
    }

    static uploadMoviePhotoController(req, res) {
        const file = req.file;
        const id = req.params.id;
      
        if (!file) {
          res.status(400).send({
            status: false,
            data: 'No file selected',
          });
        } else {
          const filePath = file.path;

        MovieService.uploadMoviePhoto(id, filePath, (error, result) => {
            if (error) {
              console.error('Error updating file in the database:', error);
              res.status(500).send({
                status: false,
                data: 'Error updating file in the database',
              });
            } else if (result.rows.length === 0) {
              res.status(404).send({
                status: false,
                data: 'Movie not found',
              });
            } else {
              const updatedId = result.rows[0].id;
              const photoUrl = `/uploads/${updatedId}`;
      
              res.status(200).send({
                status: true,
                data: photoUrl,
              });
            }
          });
        }
    }



    static updateMovieController(req, res) {
        const id = req.params.id;
        const { title, genres, year } = req.body;
    
        MovieService.updateMovie(id, title, genres, year, (error, result) => {
            if (error) {
                console.error('Error updating movie:', error);
                res.status(500).send({
                    status: false,
                    data: 'Error updating movie in the database',
                });
            } else if (result.rows.length === 0) {
                res.status(404).send({
                    status: false,
                    data: 'Movie not found',
                });
            } else {
                res.status(200).send({
                    status: true,
                    data: 'Movie updated successfully',
                });
            }
        });
    }
    
    static addMovieController(req, res) {
      const { title, genres, year } = req.body;
  
      MovieService.addMovie(title, genres, year, (error, result) => {
          if (error) {
              console.error(error);
              res.status(500).json({ message: 'Kesalahan server' });
          } else {
              res.status(201).json(result); // Mengembalikan data movie yang baru dimasukkan
          }
      });
    }
  
    static deleteMovieController(req, res) {
    const id = req.params.id;

    MovieService.deleteMovie(id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Kesalahan server' });
        } else if (result.rows.length === 0) {
            res.status(404).json({ message: 'Film tidak ditemukan' });
        } else {
            res.status(200).json({ message: 'Film berhasil dihapus' });
        }
    });
    }
    
    static getMoviePhotoController(req, res) {
      const path = require('path');
      const id = req.params.id;
      MovieService.getMoviePhoto(id, (error, result) => {
        if (error) {
          console.error('Error retrieving photo from the database:', error);
          res.status(500).send({
            status: false,
            data: 'Error retrieving photo from the database',
          });
        } else if (result.rows.length === 0) {
          res.status(404).send({
            status: false,
            data: 'Movie not found',
          });
        } else {
          const photoPath = result.rows[0].photo;
          //lokasi uploads
          const absolutePath = path.join(__dirname, '..', photoPath);
          // Send the file
          res.sendFile(absolutePath);
        }})
      
    
    }

}

module.exports = MovieController;
