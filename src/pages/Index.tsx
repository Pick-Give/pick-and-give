
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Menu, X, Recycle, Heart, Gift, Smartphone, Book, Shirt, Users, Leaf, Star } from "lucide-react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguage = () => setLanguage(language === "en" ? "hi" : "en");

  const content = {
    en: {
      navHome: "Home",
      navDonate: "Donate Now",
      navPoints: "My Eco-Points",
      navLogin: "Login",
      heroTitle: "Give What You Don't Need. Get What You'll Value.",
      heroSubtitle: "Schedule pickups for your old items and earn eco-points to redeem for rewards that matter.",
      heroCTA: "Donate Now",
      howItWorksTitle: "How It Works",
      step1: "Select Items",
      step1Desc: "Choose what to donate",
      step2: "Schedule Pickup",
      step2Desc: "Free collection service",
      step3: "Earn Points",
      step3Desc: "Get eco-points rewards",
      whatToDonateTitle: "What You Can Donate",
      clothes: "Clothes",
      books: "Books", 
      electronics: "Electronics",
      whyChooseTitle: "Why Pick & Give?",
      communityStat: "500+ KG recycled by our community",
      impactDesc: "Join thousands making a difference",
      footerCTA: "Start Donating",
      privacy: "Privacy Policy",
      terms: "Terms",
      ecoPoints: "Eco-Points"
    },
    hi: {
      navHome: "होम",
      navDonate: "अभी दान करें",
      navPoints: "मेरे इको-पॉइंट्स",
      navLogin: "लॉगिन",
      heroTitle: "जो चाहिए नहीं, वो दें। जो चाहिए, वो पाएं।",
      heroSubtitle: "अपने पुराने सामान के लिए पिकअप शेड्यूल करें और इको-पॉइंट्स कमाएं।",
      heroCTA: "अभी दान करें",
      howItWorksTitle: "यह कैसे काम करता है",
      step1: "आइटम चुनें",
      step1Desc: "दान करने के लिए चुनें",
      step2: "पिकअप शेड्यूल करें",
      step2Desc: "मुफ्त संग्रह सेवा",
      step3: "पॉइंट्स कमाएं",
      step3Desc: "इको-पॉइंट्स रिवार्ड पाएं",
      whatToDonateTitle: "आप क्या दान कर सकते हैं",
      clothes: "कपड़े",
      books: "किताबें",
      electronics: "इलेक्ट्रॉनिक्स",
      whyChooseTitle: "Pick & Give क्यों?",
      communityStat: "हमारे समुदाय द्वारा 500+ KG रीसाइकिल",
      impactDesc: "हजारों लोगों के साथ बदलाव लाएं",
      footerCTA: "दान करना शुरू करें",
      privacy: "गोपनीयता नीति",
      terms: "नियम",
      ecoPoints: "इको-पॉइंट्स"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Pick & Give
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors font-medium">{t.navHome}</a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors font-medium">{t.navDonate}</a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors font-medium">{t.navPoints}</a>
              <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                {t.navLogin}
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-green-100">
              <div className="flex flex-col space-y-3 pt-4">
                <a href="#" className="text-gray-600 hover:text-green-600 transition-colors font-medium">{t.navHome}</a>
                <a href="#" className="text-gray-600 hover:text-green-600 transition-colors font-medium">{t.navDonate}</a>
                <a href="#" className="text-gray-600 hover:text-green-600 transition-colors font-medium">{t.navPoints}</a>
                <Button variant="outline" size="sm" className="w-fit border-green-200 text-green-700 hover:bg-green-50">
                  {t.navLogin}
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eco-Points Display */}
          <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-2 mb-8">
            <Star className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-semibold">
              {t.ecoPoints}: 0 | Join 10K+ eco-warriors
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t.heroTitle}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            {t.heroSubtitle}
          </p>

          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Heart className="w-5 h-5 mr-2" />
            {t.heroCTA}
          </Button>

          {/* Visual Centerpiece */}
          <div className="mt-12 relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-200 to-blue-200 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <Gift className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="container mx-auto px-4 py-16">
        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t.howItWorksTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.step1}</h3>
                <p className="text-gray-600">{t.step1Desc}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-blue-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.step2}</h3>
                <p className="text-gray-600">{t.step2Desc}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.step3}</h3>
                <p className="text-gray-600">{t.step3Desc}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What You Can Donate */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t.whatToDonateTitle}</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shirt className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-700 font-medium">{t.clothes}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Book className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-700 font-medium">{t.books}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-700 font-medium">{t.electronics}</p>
            </div>
          </div>
        </div>

        {/* Why Pick & Give */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t.whyChooseTitle}</h2>
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-green-600 mr-2" />
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.communityStat}</h3>
              <p className="text-gray-600 text-lg">{t.impactDesc}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-50 to-green-50 border-t border-green-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Button 
              size="lg" 
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-4 text-lg rounded-xl"
            >
              <Recycle className="w-5 h-5 mr-2" />
              {t.footerCTA}
            </Button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
            <div className="mb-4 md:mb-0">
              <button 
                onClick={toggleLanguage}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                {language === "en" ? "English | हिंदी" : "हिंदी | English"}
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <a href="#" className="hover:text-green-600 transition-colors">{t.privacy}</a>
              <span>|</span>
              <a href="#" className="hover:text-green-600 transition-colors">{t.terms}</a>
            </div>

            <div>
              © 2024 Pick & Give
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
