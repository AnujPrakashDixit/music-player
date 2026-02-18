const experss= require('express');
const musicController = require('../controllers/music.controller');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
});
const router = experss.Router();

router.post("/upload", upload.single("music"), musicController.uploadMusic);





module.exports = router