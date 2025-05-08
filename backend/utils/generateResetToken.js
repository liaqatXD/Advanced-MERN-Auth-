import { randomBytes } from "crypto";

export const generateResetToken = () => randomBytes(16).toString("hex");