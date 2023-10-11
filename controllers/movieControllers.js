const MovieService = require("../services/movieServices");
// const Movie = require('../models/movieModels');
// const { uploadMoviePhoto } = require('../services/movieService');


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
              const photoUrl = `/uploadtodb/${updatedId}`;
      
              res.status(200).send({
                status: true,
                data: photoUrl,
              });
            }
          });
        }
      }

    }

module.exports = MovieController;
