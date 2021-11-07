import { axios } from "../config/axios";

export const inviteUser = async (name: string, userEmal: string) => {
  const { data: { email, password } } = await axios.post("/auth/register", { name, email: userEmal });
  return { email, password };
}