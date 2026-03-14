import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface TokenPayload {
  id: string;
}

export async function getUserFromToken(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error("Não existe secret.");

    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") return null;

    return decoded as TokenPayload;
  } catch {
    return null;
  }
}
