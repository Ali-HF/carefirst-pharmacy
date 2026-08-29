import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Analytics - Admin | Carefirst Pharmacy",
};

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session?.user?.id || !session.user.isAdmin) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="text-sm text-ink-soft hover:text-ink transition-colors mb-2 inline-flex items-center gap-1" style={{ fontFamily: "var(--font-stamp)" }}>
            &larr; BACK TO ADMIN
          </Link>
          <h1 className="text-4xl mt-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Analytics
          </h1>
        </div>
        <div>
          <a
            href="https://us.posthog.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-full bg-oxblood text-cream text-sm hover:bg-oxblood-dark transition-colors"
            style={{ fontFamily: "var(--font-stamp)" }}
          >
            OPEN POSTHOG
          </a>
        </div>
      </div>

      <div className="bg-cream border border-ink/10 rounded-xl p-8 shadow-[0_4px_12px_rgba(34,29,24,0.04)] text-center min-h-[500px] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>PostHog Analytics</h2>
        <p className="text-ink-soft max-w-lg mb-6">
          Your analytics are powered by PostHog. You can view all metrics, session replays, and detailed add-to-cart funnels directly in your PostHog dashboard.
        </p>
        <p className="text-ink-soft max-w-lg mb-6 text-sm">
          <strong>Tip:</strong> If you want to embed charts directly on this page, you can create a Shared Dashboard link in PostHog and drop the iframe code right here!
        </p>
      </div>
    </div>
  );
}
