import type { ZodError } from "zod";

type FormErrors = Record<string, string | undefined>;
export function parseFormErrors({ issues }: ZodError): FormErrors {
  const formErrors: FormErrors = {};

  for (const issue of issues) {
    const errorField = issue.path.reduce(
      (path, current, index) => (index ? `${path}[${current}]` : current),
      "",
    );

    if (!formErrors[errorField]) {
      formErrors[errorField] = issue.message;
    }
  }

  return formErrors;
}
