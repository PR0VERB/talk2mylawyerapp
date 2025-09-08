import { Link } from 'react-router-dom';
import { Scale, Shield, Award, Users } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">FirstLawyer</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Connecting clients with top legal professionals. Secure, transparent, and efficient legal services for the modern world.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-sm text-gray-300">Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-amber-400" />
                <span className="text-sm text-gray-300">Verified Lawyers</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/find-lawyers" className="hover:text-white transition-colors">Find Lawyers</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/practice-areas" className="hover:text-white transition-colors">Practice Areas</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 FirstLawyer. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Trusted by 10,000+ legal professionals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}