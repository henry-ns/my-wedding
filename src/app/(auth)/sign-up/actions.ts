"use server";

import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { z } from "zod";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { parseFormErrors } from "../../../utils/parse-form-errors";

type State = {
  formError?: Record<string, string | undefined>;
  success?: boolean;
};

const schema = z.object({
  password: z.string({ required_error: "A senha é obrigatória" }),
  name: z.string({ required_error: "O nome é obrigatório" }),
  email: z
    .string({ required_error: "A senha é obrigatória" })
    .email({ message: "Deve ser um email valido" }),
});

export async function signUp(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const validate = await schema.safeParseAsync({
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    const formError = parseFormErrors(validate.error);
    return { formError };
  }

  const { email, name, password } = validate.data;
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    await db.insert(users).values({
      name,
      email,
      passwordHash,
      id: nanoid(),
    });

    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}
