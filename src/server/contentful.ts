import { createClient } from "contentful";
import { env } from "../env";

export const contentful = createClient({
  space: env.CONTENTFUL_SPACE_ID,
  accessToken: env.CONTENTFUL_ACCESS_TOKEN,
});
