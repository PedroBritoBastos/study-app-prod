import bcrypt from "bcrypt";

export async function createPasswordHash(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}
