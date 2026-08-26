import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function AboutPage() {
  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: "About Us", href: "/about" }]} />
        <h1 className="text-3xl font-bold text-primary-dark mt-6 mb-8 text-center">About CareFirst Pharmacy</h1>
        
        <div className="bg-white p-8 md:p-12 rounded-lg border border-border max-w-4xl mx-auto space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to CareFirst Pharmacy, your trusted health partner. We are committed to providing genuine medicines, healthcare products, and professional advice to our community.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to make healthcare accessible, affordable, and convenient for everyone. We believe that good health is the foundation of a happy life, and we strive to support you on your wellness journey.
          </p>
          <h2 className="text-2xl font-semibold text-primary-dark mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Quality & Authenticity:</strong> We source all our products directly from manufacturers and authorized distributors to ensure 100% authenticity.</li>
            <li><strong>Customer Care:</strong> Your health and satisfaction are our top priorities. Our team is always ready to assist you.</li>
            <li><strong>Accessibility:</strong> With our easy-to-use platform, you can order your healthcare needs from the comfort of your home.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
