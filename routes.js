import { Router } from 'express';
import path from 'path';
import multer from 'multer';
import {
  authController,
  uploadController,
  userController,
} from './controllers';
import { use } from './utils/route.util';
const router = Router();

const storage = multer.diskStorage({
  destination: './Videos',
  filename: (req, file, cb) => {
    cb(null, `VIDEO_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post('/api/auth/register', use(authController.register));
router.post('/api/auth/login', use(authController.login));

router.get('/api/users', use(userController.GetAllUsers));
router.get('/api/user', use(userController.getUserDetails));
router.get('/api/users/friends/', use(userController.SearchUsersFriend));
router.get('/api/users/search/', use(userController.SearchUsers));
router.post('/api/user/friend/add', use(userController.AddFriend));
router.get('/api/users/:id/friends/', use(userController.GetUserFriends));
router.get('/api/users/:id', use(userController.GetUserById));

router.post(
  '/api/upload/video',
  upload.single('video'),
  use(uploadController.UploadVideo),
);
router.post(
  '/api/upload/videos',
  upload.array('videos', 5),
  use(uploadController.UploadVideos),
);

export default router;
