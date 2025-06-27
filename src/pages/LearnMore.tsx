
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Leaf, Shirt, Book, Smartphone, Award, Shield, Users } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src="/lovable-uploads/e10aac0e-a4f9-44c5-8074-af7e5a6d42e0.png" alt="Pick & Give" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold text-green-800">Pick & Give</span>
        </div>
        <div className="flex items-center space-x-2">
          <LanguageSelector />
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-full">
              <Leaf className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learn More About Pick & Give
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our mission, process, and impact
          </p>
        </div>

        {/* What is Pick & Give */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">What is Pick & Give?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              Pick & Give is a donation pickup platform designed to simplify sustainable giving. 
              It enables individuals to donate used items—clothes, books, electronics—directly from their homes. 
              In return, they receive eco-points which can be redeemed for rewards or recognition. 
              The system promotes minimalism, waste reduction, and local impact.
            </p>
          </CardContent>
        </Card>

        {/* Why This Matters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">Why This Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <strong>Waste Reduction:</strong> India generates over 3 million tons of textile waste annually. Much of it is reusable.
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <strong>Access to Resources:</strong> Donated items are redistributed to NGOs, educational centers, and verified reuse channels.
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <strong>Incentive-based Giving:</strong> Donors are rewarded for every verified pickup through eco-points—encouraging consistent participation.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Select Items</h3>
                <p className="text-sm text-gray-600">Choose what you want to give away from accepted categories.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Schedule Pickup</h3>
                <p className="text-sm text-gray-600">Pick a convenient time. We'll coordinate the logistics.</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Track Status</h3>
                <p className="text-sm text-gray-600">View progress from submission to verification in your dashboard.</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Earn Rewards</h3>
                <p className="text-sm text-gray-600">Receive eco-points once verified for discount coupons or leaderboard ranks.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accepted Items */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">Accepted Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <Shirt className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Clothing</h3>
                  <p className="text-sm text-gray-600">Washed, wearable garments (no undergarments)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Book className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Books</h3>
                  <p className="text-sm text-gray-600">Academic, non-fiction, storybooks (no torn/missing pages)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Smartphone className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Electronics</h3>
                  <p className="text-sm text-gray-600">Working gadgets or devices with usable components</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> We do not accept wet, soiled, hazardous, or broken items beyond repair.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Eco-Points */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 flex items-center">
              <Award className="h-6 w-6 mr-2" />
              What Are Eco-Points?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Eco-points are the platform's virtual reward units. You earn them by:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Earn Points By:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Donating verified items</li>
                  <li>• Referring others</li>
                  <li>• Volunteering for pickups or drives</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Redeem Points For:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Discount coupons from partner brands</li>
                  <li>• Priority pickup slots</li>
                  <li>• Community recognition (badges, leaderboard)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Data & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-700">
              <p>• All user data is stored securely using Supabase (PostgreSQL)</p>
              <p>• Pick & Give does not sell or share personal data</p>
              <p>• Only verified partners receive minimal data for pickup coordination</p>
            </div>
          </CardContent>
        </Card>

        {/* Want to Do More */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 flex items-center">
              <Users className="h-6 w-6 mr-2" />
              Want to Do More?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Users className="h-6 w-6" />
                <span>Join as a Volunteer</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Award className="h-6 w-6" />
                <span>Refer Friends</span>
              </Button>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>• Track your environmental footprint in your dashboard</p>
              <p>• Apply to become a Pickup Partner in your city</p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="mb-6">Join thousands of others in creating a more sustainable future.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Link to="/auth">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
