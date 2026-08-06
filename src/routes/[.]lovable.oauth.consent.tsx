import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";

type OAuthResult = {
  client?: { name?: string; client_id?: string } | null;
  redirect_url?: string;
  redirect_to?: string;
  scope?: string;
  redirect_uri?: string;
};

type OAuthApi = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
};

function oauthApi(): OAuthApi {
  return (supabase.auth as unknown as { oauth: OAuthApi }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    authorization_id:
      typeof search['authorization_id'] === "string" ? search['authorization_id'] : "",
  }),
  head: () => ({
    meta: [
      { title: "Authorize access | Marian Pilgrim" },
      {
        name: "description",
        content: "Approve or deny an app requesting access to Marian Pilgrim.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({
        to: "/auth",
        search: { next: location.pathname + location.searchStr },
      });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get(
      "authorization_id",
    )!;
    const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="glass-card max-w-sm rounded-3xl p-7 text-sm">
        <h1 className="font-serif text-xl font-semibold">
          Could not load this request
        </h1>
        <p className="mt-2 text-muted-foreground">
          {String((error as Error)?.message ?? error)}
        </p>
      </div>
    </main>
  ),
  component: Consent,
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? "an app";

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const api = oauthApi();
    const { data, error: decisionError } = approve
      ? await api.approveAuthorization(authorization_id)
      : await api.denyAuthorization(authorization_id);
    if (decisionError) {
      setBusy(false);
      setError(decisionError.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect was returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 pb-24 pt-16">
      <div className="glass-card w-full max-w-sm rounded-3xl p-7">
        <h1 className="font-serif text-2xl font-semibold">
          Connect {clientName} to Marian Pilgrim
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {clientName} will be able to call this app's tools — browsing
          apparitions, reading full records, and listing prayers — while you are
          signed in.
        </p>
        {details?.redirect_uri && (
          <p className="mt-3 break-all text-xs text-muted-foreground">
            Redirects to: {details.redirect_uri}
          </p>
        )}
        {details?.scope && (
          <p className="mt-2 text-xs text-muted-foreground">
            Requested: {details.scope}
          </p>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          This does not bypass this app's permissions or backend policies.
        </p>
        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="mt-6 space-y-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => decide(true)}
            className="w-full rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            Approve
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => decide(false)}
            className="gold-hairline w-full rounded-full px-5 py-2.5 text-sm font-medium disabled:opacity-60"
          >
            Cancel connection
          </button>
        </div>
      </div>
    </main>
  );
}
