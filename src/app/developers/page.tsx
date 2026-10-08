import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Code, Database, Key } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";

export const metadata: Metadata = {
  title: "API Documentation",
  description: "Developer API documentation for NusaSense internal integrations.",
};

export default function DevelopersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="rounded-full p-2 hover:bg-surface-hover transition-colors">
            <ArrowLeft className="size-5 text-ink-muted" />
          </Link>
          <div className="flex items-center gap-2 border-l border-line pl-4">
            <BrandMark className="size-6 grayscale opacity-70" />
            <span className="font-semibold text-sm tracking-tight text-ink-muted">Developer Hub</span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-ink mb-4">API Reference</h1>
            <p className="text-ink-muted leading-relaxed">
              Welcome to the NusaSense API documentation. Our platform exposes several REST endpoints that allow developers to programmatically manage user settings and watchlists. All API requests must be authenticated using your NextAuth session cookies.
            </p>
          </div>

          <div className="space-y-12">
            {/* Endpoint 1 */}
            <section className="scroll-mt-24" id="watchlist">
              <div className="flex items-center gap-3 mb-6 border-b border-line pb-4">
                <div className="rounded bg-surface border border-line p-1.5">
                  <Database className="size-5 text-brand" />
                </div>
                <h2 className="text-xl font-semibold">Watchlist Management</h2>
              </div>
              
              <div className="mb-8 bg-surface rounded-xl border border-line overflow-hidden">
                <div className="bg-canvas border-b border-line px-4 py-3 flex items-center gap-3">
                  <span className="bg-brand/10 text-brand px-2 py-0.5 rounded text-xs font-bold font-mono">POST</span>
                  <code className="text-sm font-mono text-ink">/api/user/watchlist</code>
                </div>
                <div className="p-6 space-y-6">
                  <p className="text-sm text-ink-muted">
                    Adds or removes a stock symbol from the authenticated user's active watchlist. The platform allows a maximum of 5 symbols per user.
                  </p>
                  
                  <div>
                    <h3 className="text-xs font-semibold text-ink uppercase tracking-wider mb-3">Request Body</h3>
                    <div className="bg-canvas rounded-lg border border-line overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-surface border-b border-line text-ink-muted">
                          <tr>
                            <th className="px-4 py-2 font-medium">Field</th>
                            <th className="px-4 py-2 font-medium">Type</th>
                            <th className="px-4 py-2 font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          <tr>
                            <td className="px-4 py-3 font-mono text-xs">symbol</td>
                            <td className="px-4 py-3 text-brand font-mono text-xs">string</td>
                            <td className="px-4 py-3 text-ink-muted">IDX ticker symbol (e.g., <code className="bg-surface px-1 py-0.5 rounded border border-line">BBCA.JK</code>)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-mono text-xs">action</td>
                            <td className="px-4 py-3 text-brand font-mono text-xs">enum</td>
                            <td className="px-4 py-3 text-ink-muted">Either <code className="bg-surface px-1 py-0.5 rounded border border-line">"add"</code> or <code className="bg-surface px-1 py-0.5 rounded border border-line">"remove"</code></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Endpoint 2 */}
            <section className="scroll-mt-24" id="settings">
              <div className="flex items-center gap-3 mb-6 border-b border-line pb-4">
                <div className="rounded bg-surface border border-line p-1.5">
                  <Key className="size-5 text-brand" />
                </div>
                <h2 className="text-xl font-semibold">User Settings</h2>
              </div>
              
              <div className="mb-8 bg-surface rounded-xl border border-line overflow-hidden">
                <div className="bg-canvas border-b border-line px-4 py-3 flex items-center gap-3">
                  <span className="bg-brand/10 text-brand px-2 py-0.5 rounded text-xs font-bold font-mono">POST</span>
                  <code className="text-sm font-mono text-ink">/api/user/settings</code>
                </div>
                <div className="p-6 space-y-6">
                  <p className="text-sm text-ink-muted">
                    Updates user preferences, such as linking a Telegram Chat ID for automated n8n push notifications.
                  </p>
                  
                  <div>
                    <h3 className="text-xs font-semibold text-ink uppercase tracking-wider mb-3">Request Body</h3>
                    <div className="bg-canvas rounded-lg border border-line overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-surface border-b border-line text-ink-muted">
                          <tr>
                            <th className="px-4 py-2 font-medium">Field</th>
                            <th className="px-4 py-2 font-medium">Type</th>
                            <th className="px-4 py-2 font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          <tr>
                            <td className="px-4 py-3 font-mono text-xs">telegramChatId</td>
                            <td className="px-4 py-3 text-brand font-mono text-xs">string | null</td>
                            <td className="px-4 py-3 text-ink-muted">The user's numeric Telegram Chat ID, or null to unlink.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Authentication */}
            <section className="scroll-mt-24" id="auth">
              <div className="flex items-center gap-3 mb-6 border-b border-line pb-4">
                <div className="rounded bg-surface border border-line p-1.5">
                  <Code className="size-5 text-brand" />
                </div>
                <h2 className="text-xl font-semibold">Authentication (NextAuth)</h2>
              </div>
              <p className="text-ink-muted mb-4 text-sm leading-relaxed">
                All API endpoints are protected by the NextAuth session validator. Attempting to call these APIs without a valid session cookie will result in a <code className="bg-surface border border-line text-brand px-1 py-0.5 rounded">401 Unauthorized</code> response.
              </p>
              <div className="bg-surface border border-line rounded-lg p-4">
                <pre className="text-xs font-mono text-ink-faint overflow-x-auto">
                  <code>
                    {`// Example Response (401)\n{\n  "error": "Unauthorized"\n}`}
                  </code>
                </pre>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
