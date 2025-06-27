
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Gift, Calendar, Award, Users, Globe, Recycle, Heart, Sparkles } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import FloatingElement from "@/components/FloatingElement";
import ThreeDCard from "@/components/3DCard";
import GlassmorphicButton from "@/components/GlassmorphicButton";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center p-4 relative z-10">
        <div className="flex items-center">
          <img src="/lovable-uploads/e10aac0e-a4f9-44c5-8074-af7e5a6d42e0.png" alt="Pick & Give" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold text-green-800">Pick & Give</span>
        </div>
        <div className="flex items-center space-x-2">
          <LanguageSelector />
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

      {/* Hero Section with 3D Elements */}
      <section className="relative py-20 px-4 text-center">
        {/* Background 3D Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingElement className="absolute top-20 left-10 opacity-20" delay={0}>
            <Recycle className="h-16 w-16 text-green-400" />
          </FloatingElement>
          <FloatingElement className="absolute top-32 right-16 opacity-15" delay={1000}>
            <Heart className="h-12 w-12 text-blue-400" />
          </FloatingElement>
          <FloatingElement className="absolute bottom-40 left-20 opacity-10" delay={2000}>
            <Sparkles className="h-20 w-20 text-purple-400" />
          </FloatingElement>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <FloatingElement delay={500}>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative p-6 bg-gradient-to-br from-green-100 to-blue-100 rounded-full shadow-2xl transform hover:scale-110 transition-transform duration-500">
                  <Leaf className="h-16 w-16 text-green-600" />
                </div>
              </div>
            </div>
          </FloatingElement>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-green-800 to-blue-800 bg-clip-text text-transparent">
            Pick & Give
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Turn your unused items into environmental impact. Donate, earn eco-points, 
            and join the sustainability movement that's making a real difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlassmorphicButton to={user ? "/dashboard" : "/auth"} variant="primary">
              {user ? "Go to Dashboard" : "Get Started"}
            </GlassmorphicButton>
            <GlassmorphicButton to="#how-it-works" variant="secondary">
              Learn More
            </GlassmorphicButton>
          </div>
        </div>
      </section>

      {/* How It Works Section with 3D Cards */}
      <section id="how-it-works" className="py-16 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ThreeDCard
              title="1. Donate Items"
              description="Upload photos and details of items you no longer need"
              icon={<Gift className="h-12 w-12 text-green-600" />}
              delay={200}
            />
            <ThreeDCard
              title="2. Schedule Pickup"
              description="Choose a convenient time for our team to collect your items"
              icon={<Calendar className="h-12 w-12 text-blue-600" />}
              delay={400}
            />
            <ThreeDCard
              title="3. Earn Eco-Points"
              description="Get rewarded with points for every verified donation"
              icon={<Award className="h-12 w-12 text-purple-600" />}
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* Stats Section with Enhanced Visuals */}
      <section className="py-16 px-4 bg-white/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-blue-50/50"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-gray-900 bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent">
            Making an Impact Together
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">1,000+</div>
              <div className="text-gray-600">Active Donors</div>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full">
                    <Gift className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">5,000+</div>
              <div className="text-gray-600">Items Donated</div>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">50%</div>
              <div className="text-gray-600">Waste Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Glassmorphic Design */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* 3D Background Elements */}
        <div className="absolute inset-0">
          <FloatingElement className="absolute top-10 left-1/4 opacity-10" delay={0}>
            <div className="w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
          </FloatingElement>
          <FloatingElement className="absolute bottom-10 right-1/4 opacity-10" delay={1500}>
            <div className="w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          </FloatingElement>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-white/90 leading-relaxed">
            Join thousands of environmentally conscious individuals who are 
            turning their unused items into positive impact.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl hover:shadow-white/10"
          >
            <Link to={user ? "/donate" : "/auth"}>
              <span className="relative z-10">
                {user ? "Start Donating" : "Start Donating Today"}
              </span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-300 relative">
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
