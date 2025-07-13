import express from 'express';
import { getUser,createUser,getUserById,updateUser,deleteUser } from '../controller/user.controller';
const router = express.Router();


router.route("/get/:id").get(getUserById)
router.route("/update/:id").patch(updateUser);
router.route("/delete/:id").delete(deleteUser);
router.route("/get").get(getUser);
router.route("/create").post(createUser);

export default router;