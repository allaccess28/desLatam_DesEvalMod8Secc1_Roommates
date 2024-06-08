import express from "express";
import { home, addRoomie, getRoommates, addGasto, getGastos, updateGasto, deleteGasto } from "../controller/controller.js";
const router = express.Router();

router.get("/", home);


router.post("/roommate", addRoomie);
router.get("/roommates", getRoommates);

router.post('/gasto', addGasto)
router.get("/gastos", getGastos);
router.put("/gasto", updateGasto);
router.delete("/gasto", deleteGasto);


router.get("*",(req, res) => {
    res.status(404).send("Not found");
})

export default router;