import db from "./index";
import bcrypt from "bcrypt";

export const checkUserEmailPassword = async (_email, password) => {
  const user = await db.Usuario.findOne({ where: { email: _email } });

  if (!user) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return null;
  }

  const { id, name, username, email } = user;

  return {
    id,
    name,
    username,
    email,
  };
};
