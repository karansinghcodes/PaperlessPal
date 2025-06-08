import { Request, Response, NextFunction } from "express";
import { jwtSecret } from "../config/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { response } from "../utils/response/response";


export const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.header("Authorization");
  const token = authHeaders?.split(" ")[1];

  if (!token) {
    return response.error(res, "Authorization token is required", 401);
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    const userId =
      decoded as JwtPayload;

    req.params = userId;

    next();
  } catch (err: any) {
    console.log(err.message);

    return response.error(res, "Invalid token", 401);
  }
};
