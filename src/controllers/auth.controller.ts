import { Request, Response } from "express";
import {
  handleRefreshToken,
  loginUser,
  registerUser,
} from "../services/auth.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const register = async (req: Request, res: Response) => {
  const result = await registerUser(req.body);

  return res
    .status(201)
    .json(new ApiResponse("User registered successfully", result));
};

export const login = async (req: Request, res: Response) => {
  const result = await loginUser(req.body);

  return res
    .status(200)
    .json(new ApiResponse("User logged in successfully", result));
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const result = await handleRefreshToken(refreshToken);

  return res
    .status(200)
    .json(new ApiResponse("Access token refreshed", result));
};
