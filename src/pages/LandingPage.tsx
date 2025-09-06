import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Users, Star, CheckCircle, Scale, Gavel, FileText } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Connect with
                  <span className="block text-amber-400">Top Legal Minds</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Find verified attorneys, get expert legal advice, and resolve your legal matters with confidence. Trusted by thousands of clients worldwide.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 text-lg">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/find-lawyers">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg">
                    Browse Lawyers
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Verified Attorneys</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-300" />
                  <span className="text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-amber-400" />
                  <span className="text-sm">10K+ Clients</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Quick Consultation</h3>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                        <Gavel className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Corporate Law Expert</p>
                        <p className="text-sm text-blue-200">Available now</p>
                      </div>
                    </div>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600">
                      Book Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">Verified Lawyers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">50,000+</div>
              <div className="text-gray-600">Cases Resolved</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">4.9/5</div>
              <div className="text-gray-600">Client Rating</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FirstLawyer?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built the most trusted platform for legal services, combining cutting-edge technology with human expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Verified Professionals</h3>
              <p className="text-gray-600">
                Every lawyer is thoroughly vetted, licensed, and verified. Your legal matters are in trusted hands.
              </p>
            </Card>

            <Card hover className="text-center p-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast Response</h3>
              <p className="text-gray-600">
                Get responses within hours, not days. Our lawyers prioritize timely communication and quick turnarounds.
              </p>
            </Card>

            <Card hover className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Transparent Pricing</h3>
              <p className="text-gray-600">
                No hidden fees or surprise charges. Clear, upfront pricing with secure escrow protection for your peace of mind.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get legal help in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Describe Your Need</h3>
              <p className="text-gray-600">
                Tell us about your legal situation. Our smart matching system will connect you with the right lawyers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Lawyer</h3>
              <p className="text-gray-600">
                Review profiles, ratings, and proposals. Schedule consultations and select the best fit for your case.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Results</h3>
              <p className="text-gray-600">
                Work together securely with built-in messaging, document sharing, and milestone tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied clients who found their perfect legal match on FirstLawyer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold">
                Find a Lawyer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/signup?role=lawyer">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-blue-600">
                Join as Lawyer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}