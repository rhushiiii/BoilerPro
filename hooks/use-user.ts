"use client";

import { useAuthContext } from "@/providers/auth-provider";

export function useUser() {
  return useAuthContext().user;
}
