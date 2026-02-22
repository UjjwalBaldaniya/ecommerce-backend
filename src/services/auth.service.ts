import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";

const SALT_ROUNDS = 10;
const ACCESS_SECRET = env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = env.JWT_REFRESH_SECRET!;
const ACCESS_EXP = "15m";
const REFRESH_EXP = "7d";

interface AuthPayload {
  email: string;
  password: string;
}

interface JwtData {
  userId: string;
}

export const registerUser = async ({ email, password }: AuthPayload) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  return { id: user.id, email: user.email };
};

export const loginUser = async ({ email, password }: AuthPayload) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  const accessToken = jwt.sign({ userId: user.id }, ACCESS_SECRET, {
    expiresIn: ACCESS_EXP,
  });
  const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXP,
  });

  return { accessToken, refreshToken };
};

export const handleRefreshToken = async (token: string) => {
  if (!token) throw new Error("Refresh token required");

  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET!) as JwtData;

  const newAccessToken = jwt.sign(
    { userId: decoded.userId },
    env.JWT_ACCESS_SECRET!,
    { expiresIn: ACCESS_EXP }
  );

  return { accessToken: newAccessToken };
};
