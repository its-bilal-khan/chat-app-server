const router = require('express').Router();
const path = require('path');
const multer = require('multer');

const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const UploadController = require("./controllers/UploadController");

const storage = multer.diskStorage({
    destination:'./Videos',
    filename: (req, file, cb) => {
        cb(null, "VIDEO_"+ Date.now() + path.extname(file.originalname));
    },
})

const upload = multer({ storage });


router.post('/api/auth/register', AuthController.register);
router.post('/api/auth/login', AuthController.login);

router.get('/api/users/', UserController.GetAllUsers);
router.get('/api/users/friends/', UserController.SearchUsersFriend);
router.get('/api/users/search/', UserController.SearchUsers);
router.post('/api/users/friends/add/', UserController.AddFriend);
router.get('/api/users/:id/friends/', UserController.GetUserFriends);
router.get('/api/users/:id', UserController.GetUserById);

router.post('/api/upload/video', upload.single("video"), UploadController.UploadVideo);
router.post('/api/upload/videos', upload.array("videos", 5), UploadController.UploadVideos);

module.exports = router;