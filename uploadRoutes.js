const express = require("express");
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination:'./Videos',
    filename: (req, file, cb) => {
        cb(null, "VIDEO_"+Date.now() + path.extname(file.originalname));
    },
})

const upload = multer({
    storage
})

router.post('/video', upload.single("video"), (req, res)=> {
    console.log(req.file)
    res.send({
        status:true,
        filePath:req.file.filename
    });
});
router.post('/videos', upload.array("videos",5), (req, res)=> {
    console.log(req.files)
    res.send({
        status:true,
        filePath:req.files
    });
});
module.exports = router;