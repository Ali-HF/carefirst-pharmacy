import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Carefirst Pharmacy",
  description: "Privacy Policy for Carefirst Pharmacy Stationery",
};

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>

        <div className="prose prose-stone prose-a:text-oxblood prose-headings:font-display prose-headings:text-ink text-ink-soft max-w-none">
          <p><strong>Effective Date:</strong> August 2026</p>

          <p>
            At Carefirst Pharmacy ("we", "our", or "us"), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website (carefirst.pk) or make a purchase.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when you:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Create an account or purchase products (Name, Email Address, Shipping Address, Billing details).</li>
            <li>Contact customer support.</li>
          </ul>
          <p>
            We also automatically collect essential information regarding your session using Cookies to maintain your shopping cart state and keep you logged in.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">2. How We Use Your Information</h2>
          <p>
            We use your personal information solely to provide and improve our services. Specifically, we use it to:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Process and fulfill your orders, including sending transactional emails like order confirmations and shipping updates.</li>
            <li>Manage your account securely (e.g., password resets and email verification).</li>
            <li>Respond to your customer service inquiries.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">3. Third-Party Services and Tracking</h2>
          <p>
            Carefirst Pharmacy respects your digital privacy. We <strong>do not</strong> use third-party tracking analytics (such as Google Analytics), we do not run third-party advertisements on our site, and we do not use retargeting pixels (such as the Facebook Pixel). 
          </p>
          <p>
            We only share your information with trusted third-party service providers necessary to fulfill our services (such as our payment processor and shipping partners). These third parties are strictly prohibited from using your personal information for any other purposes.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">4. Cookies</h2>
          <p>
            We use strictly necessary cookies to ensure the basic functionality of the website, such as remembering the items in your shopping cart and keeping your session authenticated. You can instruct your browser to refuse all cookies, but this may prevent you from using some features of our website, such as checking out.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <strong>care@carefirst.pk</strong>.
          </p>
        </div>
      </main>
    </div>
  );
}
