import { Response } from "express";

export const response = {
  ok: (res: Response, message: string, data?: any, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      ...(data !== undefined && { data }),
    });
  },

  error: (res: Response, message: string, statusCode = 400) => {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  },
};
