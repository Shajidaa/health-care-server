import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { doctorService } from "./doctor.service";
import httpStatus from "http-status";
import { ApplyAsDoctorValidationZodSchema } from "./doctor.validation";

const applyAsDoctor = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  // console.log({ files });
  const resume = files?.["resume"] ? files["resume"][0] : null;
  const additionalFiles = files?.["additionalFiles"] || [];
  // Check if req.body.data exists
  if (!req.body.data) {
    throw new Error(
      "Invalid input: 'data' field is missing in the request body.",
    );
  }

  let parsedData: any;
  try {
    parsedData = JSON.parse(req.body.data);
  } catch (err) {
    throw new Error("Invalid input: 'data' must be a valid JSON string.");
  }

  const zodValidationResult = ApplyAsDoctorValidationZodSchema.safeParse(
    JSON.parse(req.body.data),
  );
  console.log("RAW req.body.data:", req.body.data);
  const dataff = JSON.parse(req.body.data);
  console.log("PARSED data:", dataff);

  if (!zodValidationResult.success) {
    throw new Error(zodValidationResult.error.issues[0].message);
  }

  const payload = zodValidationResult.data;
  // const payload = zodValidationResult.data;

  const result = await doctorService.applyAsDoctor(
    payload,
    resume,
    additionalFiles,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor application submitted successfully",
    data: result,
  });
});
export const doctorController = {
  applyAsDoctor,
};
