import express from "express";
import * as phonesControls from "../controls/phonesControls.js";

const router = express.Router();

router.get("/", phonesControls.getAllPhones);

router.get("/:id", phonesControls.getPhoneById);

router.post("/", phonesControls.createPhone);

router.put("/:id", phonesControls.updatePhone);

router.delete("/:id", phonesControls.deletePhone);

export default router;
