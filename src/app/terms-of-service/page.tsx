import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Carefirst Pharmacy",
  description: "Terms of Service for Carefirst Pharmacy Stationery",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-cream selection:bg-oxblood selection:text-cream font-sans pb-20">
      {/* Navigation */}
      <nav className="p-4 sm:p-6 lg:p-8 flex items-center justify-between sticky top-0 bg-cream/90 backdrop-blur-md z-50 border-b border-ink/10">
        <Link href="/" className="font-bold text-xl sm:text-2xl text-ink tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          CAREFIRST PHARMACY
        </Link>
        <Link href="/" className="text-sm font-semibold tracking-wider text-ink hover:text-oxblood transition-colors" style={{ fontFamily: "var(--font-stamp)" }}>
          RETURN HOME
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-16 sm:pt-24">
        <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-12" style={{ fontFamily: "var(--font-display)" }}>
          Terms of Service
        </h1>

        <div className="prose prose-stone prose-a:text-oxblood prose-headings:font-display prose-headings:text-ink text-ink-soft max-w-none">
          <p><strong>Effective Date:</strong> August 2026</p>

          <p>
            Welcome to Carefirst Pharmacy ("we", "our", or "us"). By accessing or using our website (carefirst.pk) and purchasing our products, you agree to be bound by the following Terms of Service. Please read them carefully.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">1. Acceptance of Terms</h2>
          <p>
            By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by these terms and conditions. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">2. Products and Pricing</h2>
          <p>
            We make every effort to display as accurately as possible the colors and images of our products that appear on the store. We reserve the right to modify the prices of our products at any time without prior notice. We shall not be liable to you or to any third party for any modification, price change, or suspension of the Service.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">3. Orders and Billing</h2>
          <p>
            We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">4. Intellectual Property</h2>
          <p>
            All content included on this site, such as text, graphics, logos, images, and software, is the property of Carefirst Pharmacy or its content suppliers and protected by international copyright laws.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">5. Disclaimer of Warranties; Limitation of Liability</h2>
          <p>
            We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure, or error-free. You expressly agree that your use of, or inability to use, the service is at your sole risk.
          </p>
          <p>
            In no case shall Carefirst Pharmacy, our directors, officers, employees, affiliates, agents, contractors, or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind arising from your use of any of the service or any products procured using the service.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">6. Changes to Terms of Service</h2>
          <p>
            You can review the most current version of the Terms of Service at any time on this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">7. Contact Information</h2>
          <p>
            Questions about the Terms of Service should be sent to us at <strong>care@carefirst.pk</strong>.
          </p>
        </div>
      </main>
    </div>
  );
}
