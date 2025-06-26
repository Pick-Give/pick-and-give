
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Gift, Calendar, Award, Users, Globe } from "lucide-react";
import DarkModeToggle from "@/components/DarkModeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src="/lovable-uploads/e10aac0e-a4f9-44c5-8074-af7e5a6d42e0.png" alt="Pick & Give" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold text-green-800">Pick & Give</span>
        </div>
        <div className="flex items-center space-x-2">
          <LanguageSelector />
          <DarkModeToggle />
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Welcome, {user.user_metadata?.full_name || 'User'}</span>
              <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
              <Link to="/auth">Login</Link>
            </Button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full">
              <Leaf className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Pick & Give
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Turn your unused items into environmental impact. Donate, earn eco-points, 
            and join the sustainability movement that's making a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link to={user ? "/dashboard" : "/auth"}>
                {user ? "Go to Dashboard" : "Get Started"}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="#how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Gift className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle>1. Donate Items</CardTitle>
                <CardDescription>
                  Upload photos and details of items you no longer need
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Calendar className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle>2. Schedule Pickup</CardTitle>
                <CardDescription>
                  Choose a convenient time for our team to collect your items
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Award className="h-12 w-12 text-purple-600" />
                </div>
                <CardTitle>3. Earn Eco-Points</CardTitle>
                <CardDescription>
                  Get rewarded with points for every verified donation
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Making an Impact Together
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1,000+</div>
              <div className="text-gray-600">Active Donors</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Gift className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">5,000+</div>
              <div className="text-gray-600">Items Donated</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50%</div>
              <div className="text-gray-600">Waste Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of environmentally conscious individuals who are 
            turning their unused items into positive impact.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to={user ? "/donate" : "/auth"}>
              {user ? "Start Donating" : "Start Donating Today"}
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-300">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center mb-4">
            <Leaf className="h-6 w-6 text-green-500 mr-2" />
            <span className="text-xl font-bold">Pick & Give</span>
          </div>
          <p className="text-sm">
            © 2024 Pick & Give. Making sustainability accessible to everyone.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
