const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movieControllers");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }
  ) 
const upload = multer({ storage });

router.get('/', MovieController.index);
router.put('/uploadphoto/:id', upload.single('photo'), MovieController.uploadMoviePhotoController);
router.put('/update/:id', MovieController.updateMovieController);
router.post('/add', MovieController.addMovieController);
router.delete('/delete/:id', MovieController.deleteMovieController);
router.get('/photo/:id', MovieController.getMoviePhotoController);

module.exports = router;

/*  PENGETESAN route: 
GET MOVIE
http://localhost:3000/movies
buka params >> tambah page, limit
SEND


UPLOAD PHOTO 
PUT http://localhost:3000/movies/uploadphoto/1
body >> form data>>
Key photo >> ubah type : file
Value : pilih photo
SEND

GET MOVIE PHOTO
GET http://localhost:3000/movies/photo/:id

CREATE MOVIE
POST http://localhost:3000/movies/add
{
    "title": "Judul Baru",
    "genres": "Genre Baru",
    "year": 2023
}

UPDATE MOVIE
PUT http://localhost:3000/movies/update/100
{
    "title": "Judul Baru",
    "genres": "Genre Baru",
    "year": 2023
}

DELETE MOVIE
DELETE http://localhost:3000/movies/delete/100

GET menampilkan photo dari ID
GET http://localhost:3000/movies/photo/1
*/