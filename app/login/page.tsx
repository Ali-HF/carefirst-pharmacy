import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-muted/30 min-h-screen py-12 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg border border-border w-full max-w-md shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary-dark">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-2">Sign in to your CareFirst account</p>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email or Phone Number</label>
            <input type="text" className="w-full p-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Enter your email or phone" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <input type="password" className="w-full p-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Enter your password" />
          </div>
          
          <button type="button" className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-md transition-colors mt-6">
            Sign In
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don&#39;t have an account? <Link href="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
