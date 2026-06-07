import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};


export const comparePassword = async (enteredPassword: string, storedPassword: string) => {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, storedPassword);

    return isMatch;
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};