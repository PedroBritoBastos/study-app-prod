import { User } from "@/features/auth/models/UserModel";

export async function findUserByUsername(username: string) {
  return User.findOne({ username });
}

export async function createUser(username: string, password: string) {
  return User.create({
    username,
    password,
  });
}
