import { api } from "#/lib/api-client";
import type { Workspaces } from "../types";

export const workspaceApi = {
  getMyWorkspaces: () => api<Workspaces>('/workspaces/me')
}