import { useState } from 'react';
import { Search, Filter, MapPin, Star, Clock, DollarSign, Sparkles, X } from 'lucide-react';
import Header from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { useSemanticSearch } from '../hooks/useSemanticSearch';

export default function FindLawyers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('');
  const { results, loading, error, lastQuery, searchLawyers, clearResults } = useSemanticSearch();
  const [isAISearchEnabled, setIsAISearchEnabled] = useState(false);

  const practiceAreas = [
    'Corporate Law',
    'Employment Law',
    'Real Estate',
    'Family Law',
    'Criminal Defense',
    'Intellectual Property',
    'Tax Law',
    'Immigration',
  ];

  const staticLawyers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Corporate Law Attorney',
      location: 'New York, NY',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 450,
      responseTime: '< 1 hour',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Contract Law', 'M&A', 'Securities'],
      verified: true,
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Business Formation Specialist',
      location: 'San Francisco, CA',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 380,
      responseTime: '< 2 hours',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Startup Law', 'Corporate Formation', 'Venture Capital'],
      verified: true,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Employment Law Expert',
      location: 'Chicago, IL',
      rating: 4.9,
      reviews: 156,
      hourlyRate: 420,
      responseTime: '< 1 hour',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Employment Disputes', 'HR Compliance', 'Workplace Investigations'],
      verified: true,
    },
  ];

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() && isAISearchEnabled) {
      await searchLawyers(query);
    } else if (!query.trim()) {
      clearResults();
    }
  };

  const handleSemanticToggle = (enabled: boolean) => {
    setIsAISearchEnabled(enabled);
    if (enabled && searchQuery.trim()) {
      searchLawyers(searchQuery);
    } else {
      clearResults();
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find the Right Lawyer</h1>
          <p className="text-gray-600">
            Connect with verified attorneys who specialize in your legal needs
            {isAISearchEnabled && <span className="text-blue-600 font-medium"> • AI-powered search enabled</span>}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          {/* Semantic Search Toggle */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleSemanticToggle(!isAISearchEnabled)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  isAISearchEnabled
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">AI Search</span>
              </button>
              <div className="text-sm text-gray-600">
                {isAISearchEnabled 
                  ? 'Describe your legal issue in natural language' 
                  : 'Search by lawyer name or practice area'
                }
              </div>
            </div>
            {isAISearchEnabled && lastQuery && (
              <button
                onClick={clearResults}
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
                <span className="text-sm">Clear search</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder={
                  isAISearchEnabled 
                    ? "e.g., 'I need help with a divorce' or 'contract dispute'"
                    : "Search by name, practice area, or location"
                }
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {!isAISearchEnabled && (
              <select
                value={selectedPracticeArea}
                onChange={(e) => setSelectedPracticeArea(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Practice Areas</option>
                {practiceAreas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            )}

            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </Button>
          </div>
        </div>

        {/* Search Status */}
        {isAISearchEnabled && (
          <div className="mb-6">
            {loading && (
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Searching with AI...</span>
              </div>
            )}
            {error && (
              <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                Search error: {error}
              </div>
            )}
            {lastQuery && results.length > 0 && (
              <div className="text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
                Found {results.length} lawyers matching "{lastQuery}"
              </div>
            )}
            {lastQuery && results.length === 0 && !loading && !error && (
              <div className="text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
                No lawyers found for "{lastQuery}". Try a different search term.
              </div>
            )}
          </div>
        )}

        {/* Results */}
        <div className="space-y-6">
          {isAISearchEnabled && results.length > 0 ? (
            results.map((lawyer) => (
              <Card key={lawyer.id} hover>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={lawyer.profile_photo_url || `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400`}
                        alt={lawyer.full_name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-semibold text-gray-900">{lawyer.full_name}</h3>
                        </div>
                        <p className="text-gray-600">{(lawyer.practice_areas && lawyer.practice_areas[0] + ' Attorney') || 'Attorney'}</p>
                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                          <MapPin className="h-4 w-4" />
                          <span>{lawyer.location}</span>
                        </div>
                        {isAISearchEnabled && lawyer.similarity && (
                          <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full inline-block mt-1">
                            {Math.round(lawyer.similarity * 100)}% match
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(lawyer.practice_areas || []).slice(0, 3).map((specialty) => (
                          <span
                            key={specialty}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{lawyer.rating}</span>
                          <span className="text-gray-500">({lawyer.review_count} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">Responds {lawyer.response_time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">R{lawyer.hourly_rate}/hour</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 md:flex-shrink-0">
                      <Button className="w-full md:w-auto">
                        View Profile
                      </Button>
                      <Button variant="outline" className="w-full md:w-auto">
                        Send Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            staticLawyers.map((lawyer) => (
              <Card key={lawyer.id} hover>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={lawyer.image || `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400`}
                        alt={lawyer.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-semibold text-gray-900">{lawyer.name}</h3>
                          {(lawyer.verified !== false) && (
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600">{lawyer.title}</p>
                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                          <MapPin className="h-4 w-4" />
                          <span>{lawyer.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(lawyer.specialties || []).slice(0, 3).map((specialty) => (
                          <span
                            key={specialty}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{lawyer.rating}</span>
                          <span className="text-gray-500">({lawyer.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">Responds {lawyer.responseTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">R{lawyer.hourlyRate}/hour</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 md:flex-shrink-0">
                      <Button className="w-full md:w-auto">
                        View Profile
                      </Button>
                      <Button variant="outline" className="w-full md:w-auto">
                        Send Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}

        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Lawyers
          </Button>
        </div>
      </div>
    </div>
  );
}