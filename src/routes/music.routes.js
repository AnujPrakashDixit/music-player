const experss = require('express');
const musicController = require('../controllers/music.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
});
const router = experss.Router();

router.post("/upload-music", authMiddleware.authArtist, upload.single("music"), musicController.uploadMusic);
router.post("/create-album", authMiddleware.authArtist, musicController.createAlbum);
router.get("/", authMiddleware.authUser, musicController.getAllMusics);
router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums);
router.get("/albums/:id", authMiddleware.authUser, musicController.getAlbumById);




module.exports = router