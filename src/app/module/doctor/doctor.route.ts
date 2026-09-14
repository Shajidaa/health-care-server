import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { upload } from "../../lib/multer";

const router = Router();

router.post(
  "/apply-as-doctor",

  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "additionalFiles", maxCount: 5 }, // Adjust maxCount as needed
  ]),
  doctorController.applyAsDoctor,
);

export const DoctorRoutes = router;
