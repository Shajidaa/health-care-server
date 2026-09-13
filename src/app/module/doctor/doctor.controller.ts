import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { doctorService } from "./doctor.service";
import httpStatus from "http-status";

const applyAsDoctor = catchAsync(async (req: Request, res: Response) => {
  // const result = await doctorService.applyAsDoctor();

  const data = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  console.log({ files });
  const resume = files?.["resume"] ? files["resume"][0] : null;
  const additionalFiles = files?.["additionalFiles"] || [];
  console.log({ files, data, resume, additionalFiles });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor application submitted successfully",
    data: {},
  });
});
export const doctorController = {
  applyAsDoctor,
};
