import { Router } from "express";
import { doctorController } from "./doctor.controller";

const router = Router();

router.post("/", doctorController.applyAsDoctor);

export const DoctorRoutes = router;
