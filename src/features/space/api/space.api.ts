import { api } from "#/lib/api-client";
import type { Space } from "../types";

export const spaceApi = {
  getMySpaces: () => api<Space[]>('/spaces/me')
}