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
  });
  
const upload = multer({ storage });

router.get('/', MovieController.index);
router.put('/uploadphoto/:id', upload.single('photo'), MovieController.uploadMoviePhotoController);


module.exports = router;

/*PENGETESAN : 
GET MOVIE
http://localhost:3000/movies


PUT MOVIE
PUT http://localhost:3000/movies/uploadphoto/1
body >> form data>>
Key photo >> ubah type : file
Value : pilih photo
SEND
*/