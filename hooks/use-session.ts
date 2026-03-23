"use client";

import { useAuthContext } from "@/providers/auth-provider";

export function useSession() {
  return useAuthContext().session;
}
