import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { UploadCloud } from "lucide-react";

export default function PrescriptionUploadPage() {
  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: "Upload Prescription", href: "/prescription-upload" }]} />
        <h1 className="text-3xl font-bold text-primary-dark mt-6 mb-8 text-center">Upload Prescription</h1>
        
        <div className="bg-white p-8 md:p-12 rounded-lg border border-border max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Please upload a clear image or PDF of your valid prescription. Our pharmacists will review it and process your order.
            </p>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer bg-gray-50 mb-8">
            <UploadCloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Click or drag file to upload</h3>
            <p className="text-sm text-gray-500">Supported formats: JPG, PNG, PDF (Max size: 5MB)</p>
          </div>
          
          <form className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input type="tel" className="w-full p-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Enter your phone number" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
              <textarea rows={3} className="w-full p-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Any specific instructions?"></textarea>
            </div>
            <button type="button" className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-md transition-colors mt-4">
              Submit Prescription
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
