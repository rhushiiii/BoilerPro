import "server-only";

import type { Json, Tables } from "@/types/database";
import { createClient } from "@/lib/supabase/server";

type UserRow = Tables<"users">;
type SubscriptionRow = Tables<"subscriptions">;
type ApiKeyRow = Tables<"api_keys">;
type UsageEventRow = Tables<"usage_events">;

async function getAuthedUserId() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return user?.id ?? null;
}

export async function ensureUserProfile(): Promise<UserRow | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  if (!user) {
    return null;
  }

  const fullName =
    typeof user.user_metadata?.name === "string"
      ? user.user_metadata.name
      : typeof user.user_metadata?.full_name === "string"
        ? user.user_metadata.full_name
        : null;

  const avatarUrl = typeof user.user_metadata?.avatar_url === "string" ? user.user_metadata.avatar_url : null;

  const { data, error } = await supabase
    .from("users")
    .upsert(
      {
        id: user.id,
        email: user.email ?? "",
        full_name: fullName,
        avatar_url: avatarUrl,
      },
      { onConflict: "id" },
    )
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getCurrentUserProfile(): Promise<UserRow | null> {
  const userId = await getAuthedUserId();

  if (!userId) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getCurrentSubscription(): Promise<SubscriptionRow | null> {
  const userId = await getAuthedUserId();

  if (!userId) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function listApiKeys(): Promise<ApiKeyRow[]> {
  const userId = await getAuthedUserId();

  if (!userId) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("api_keys")
    .select("*")
    .eq("user_id", userId)
    .is("revoked_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

type CreateApiKeyInput = {
  name: string;
  keyPrefix: string;
  keyHash: string;
  expiresAt?: string | null;
};

export async function createApiKey(input: CreateApiKeyInput): Promise<ApiKeyRow> {
  const userId = await getAuthedUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("api_keys")
    .insert({
      user_id: userId,
      name: input.name,
      key_prefix: input.keyPrefix,
      key_hash: input.keyHash,
      expires_at: input.expiresAt ?? null,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function revokeApiKey(apiKeyId: string): Promise<ApiKeyRow> {
  const userId = await getAuthedUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("api_keys")
    .update({ revoked_at: new Date().toISOString() })
    .eq("id", apiKeyId)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

type RecordUsageEventInput = {
  eventType: string;
  quantity?: number;
  metadata?: Json;
  apiKeyId?: string | null;
};

export async function recordUsageEvent(input: RecordUsageEventInput): Promise<UsageEventRow> {
  const userId = await getAuthedUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("usage_events")
    .insert({
      user_id: userId,
      api_key_id: input.apiKeyId ?? null,
      event_type: input.eventType,
      quantity: input.quantity ?? 1,
      metadata: input.metadata ?? {},
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getUsageEvents(limit = 100): Promise<UsageEventRow[]> {
  const userId = await getAuthedUserId();

  if (!userId) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("usage_events")
    .select("*")
    .eq("user_id", userId)
    .order("occurred_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data;
}

export async function getUsageTotalForLastDays(days = 30): Promise<number> {
  const userId = await getAuthedUserId();

  if (!userId) {
    return 0;
  }

  const supabase = await createClient();
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("usage_events")
    .select("quantity")
    .eq("user_id", userId)
    .gte("occurred_at", since);

  if (error) {
    throw error;
  }

  return data.reduce((acc, row) => acc + row.quantity, 0);
}
