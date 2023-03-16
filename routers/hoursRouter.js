import express from "express";
import { createHour, deleteHour,getHourFilter,deleteThePastBetween,deleteTheirUpdateHourAvailability, updateHour ,getAllBook,getById ,getAll,updateHourAvailability,deleteUpdateHourAvailability,deleteThePast} from "../controllers/hoursController.js";
import veriftyAdmin from "../middlewares/adminAuth.js";
import verifyToken from "../middlewares/verifyToken.js";

const router=express.Router()

router.post("/:hallId",createHour)
router.put("/:id",updateHour)
router.delete("/:id/:hallId",[verifyToken,veriftyAdmin],deleteHour)
router.get("/find/:id",getById)
router.get("/",getAll)
router.get("/getAllBooking",[verifyToken,veriftyAdmin],getAllBook)
router.get("/filter/",getHourFilter)
router.put("/availability/:id",updateHourAvailability)
router.put("/deleteavailability/:id",[verifyToken,veriftyAdmin],deleteUpdateHourAvailability)
router.put("/deletetheiravailability/:id",deleteTheirUpdateHourAvailability)
router.put("/deleteThePast/:id",deleteThePast)
router.put("/deleteThePastBetween/:id",[verifyToken,veriftyAdmin],deleteThePastBetween)

export default router