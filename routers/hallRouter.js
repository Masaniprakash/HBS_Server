import express from "express";
import { createHall, updateHall,deleteHall,getById,getByName, getAll,getHallHours} from "../controllers/hallController.js";
import veriftyAdmin from "../middlewares/adminAuth.js";
import verifyToken from "../middlewares/verifyToken.js";
const router=express.Router()

router.post("/",[verifyToken,veriftyAdmin],createHall)
router.put("/:id",updateHall)
router.delete("/:id",[verifyToken,veriftyAdmin],deleteHall)
router.get("/find/:id",getById)
router.post("/find",getByName)
router.get("/",getAll)
router.get("/getHallHours/:id",getHallHours)


export default router