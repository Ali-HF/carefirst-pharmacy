import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="bg-muted/30 min-h-screen py-12 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg border border-border w-full max-w-md shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary-dark">Create an Account</h1>
          <p className="text-sm text-muted-foreground mt-2">Join CareFirst Pharmacy today</p>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" className="w-full p-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Enter your full name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" className="w-full p-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="tel" className="w-full p-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Enter your phone number" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full p-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Create a strong password" />
          </div>
          
          <div className="flex items-start mt-4">
            <input type="checkbox" className="mt-1 mr-2 rounded text-primary focus:ring-primary accent-primary" />
            <span className="text-xs text-gray-600">I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.</span>
          </div>
          
          <button type="button" className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-md transition-colors mt-6">
            Create Account
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
