import Link from "next/link";

export const metadata = {
  title: "Shipping Info | Notebloom",
  description: "Shipping Information for Notebloom Stationery",
};

export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen bg-cream selection:bg-oxblood selection:text-cream font-sans pb-20">
      {/* Navigation */}
      <nav className="p-4 sm:p-6 lg:p-8 flex items-center justify-between sticky top-0 bg-cream/90 backdrop-blur-md z-50 border-b border-ink/10">
        <Link href="/" className="font-bold text-xl sm:text-2xl text-ink tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          NOTEBLOOM
        </Link>
        <Link href="/" className="text-sm font-semibold tracking-wider text-ink hover:text-oxblood transition-colors" style={{ fontFamily: "var(--font-stamp)" }}>
          RETURN HOME
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-16 sm:pt-24">
        <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-12" style={{ fontFamily: "var(--font-display)" }}>
          Shipping Information
        </h1>

        <div className="prose prose-stone prose-a:text-oxblood prose-headings:font-display prose-headings:text-ink text-ink-soft max-w-none">
          <p>
            At Notebloom, we aim to get your stationery to you as quickly and safely as possible. Here is everything you need to know about our shipping policies.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">1. Processing Time</h2>
          <p>
            All orders are processed within 1 to 3 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">2. Domestic Shipping Rates and Estimates</h2>
          <p>
            We offer simple, flat-rate shipping options:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Standard Shipping:</strong> Usually takes 3-5 business days. Rate varies by region and weight.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">3. International Shipping</h2>
          <p>
            At this time, we only ship within our designated domestic zones. We hope to offer international shipping in the near future!
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">4. How do I check the status of my order?</h2>
          <p>
            When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
          </p>
          <p>
            If you have an account with us, you can also log in and view your order status directly from the <strong>My Orders</strong> page.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-ink">5. Refunds, Returns, and Exchanges</h2>
          <p>
            We accept returns up to 30 days after delivery, if the item is unused and in its original condition, and we will refund the full order amount minus the shipping costs for the return. 
          </p>
          <p>
            In the event that your order arrives damaged in any way, please email us as soon as possible at <strong>notebloom50@gmail.com</strong> with your order number and a photo of the item’s condition. We address these on a case-by-case basis but will try our best to work towards a satisfactory solution.
          </p>
        </div>
      </main>
    </div>
  );
}
