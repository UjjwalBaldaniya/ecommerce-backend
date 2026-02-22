import { Request, Response } from "express";
import {
  handleRefreshToken,
  loginUser,
  registerUser,
} from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({ error: (error as Error).message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const result = await handleRefreshToken(refreshToken);
    res.json(result);
  } catch (err) {
    res.status(403).json({ error: (err as Error).message });
  }
};
