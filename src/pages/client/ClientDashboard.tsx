import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, MessageSquare, FileText, Clock, Star } from 'lucide-react';
import Header from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

export default function ClientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John</h1>
          <p className="text-gray-600">Manage your legal matters and connect with top attorneys</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/find-lawyers">
            <Card hover className="h-full">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Find Lawyers</h3>
                <p className="text-gray-600 text-sm">Browse and connect with verified attorneys</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/post-case">
            <Card hover className="h-full">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-2">Post a Case</h3>
                <p className="text-gray-600 text-sm">Receive proposals from interested lawyers</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/consultations">
            <Card hover className="h-full">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Consultations</h3>
                <p className="text-gray-600 text-sm">Schedule and manage consultations</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Cases */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Active Cases</h2>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">Contract Review</h3>
                        <p className="text-sm text-gray-600 mt-1">Employment agreement review and negotiation</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">In Progress</span>
                          <span className="text-xs text-gray-500">Due: Dec 15, 2024</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs text-gray-600">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">Business Formation</h3>
                        <p className="text-sm text-gray-600 mt-1">LLC formation and operating agreement</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Pending Review</span>
                          <span className="text-xs text-gray-500">Due: Dec 20, 2024</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Michael Chen</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs text-gray-600">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Recent Messages</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      SJ
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                      <p className="text-xs text-gray-600 truncate">I've reviewed the contract and have some suggestions...</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      MC
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Michael Chen</p>
                      <p className="text-xs text-gray-600 truncate">The LLC documents are ready for your review...</p>
                      <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Consultations */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Upcoming Consultations</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Tomorrow, 2:00 PM</span>
                    </div>
                    <p className="text-sm text-gray-900">Contract Discussion</p>
                    <p className="text-xs text-gray-600">with Sarah Johnson</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}