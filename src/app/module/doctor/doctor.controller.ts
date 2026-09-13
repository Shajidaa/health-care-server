import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { doctorService } from "./doctor.service";
import httpStatus from "http-status";

const applyAsDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.applyAsDoctor();
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
