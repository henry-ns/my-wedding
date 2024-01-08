import { createClient } from "contentful";
import { createClient as createManagementClient } from "contentful-management";
import { env } from "../env";

export const contentful = createClient({
  space: env.CONTENTFUL_SPACE_ID,
  accessToken: env.CONTENTFUL_ACCESS_TOKEN,
});

export const managementContentful = createManagementClient({
  space: env.CONTENTFUL_SPACE_ID,
  accessToken: env.MANAGEMENT_CONTENTFUL_ACCESS_TOKEN,
});
