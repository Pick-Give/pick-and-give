
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      dashboard: {
        title: "Pick & Give",
        welcome: "Welcome",
        ecoPoints: "Eco-Points",
        totalDonations: "Total Donations",
        verifiedItems: "Verified Items",
        quickActions: "Quick Actions",
        newDonation: "New Donation",
        schedulePickup: "Schedule Pickup",
        yourDonations: "Your Donations",
        noDonations: "No donations yet",
        noDonationsText: "Start making a difference by donating your first item!",
        makeFirstDonation: "Make Your First Donation",
        upcomingPickups: "Upcoming Pickups",
        ecoPointsBreakdown: "Eco-Points Breakdown",
        rewardsAndCoupons: "Rewards & Coupons",
        donationHistory: "Donation History",
        profile: "Profile",
        notifications: "Notifications",
        logout: "Sign Out",
        editProfile: "Edit Profile",
        leaderboard: "Community Leaderboard",
        referralProgram: "Referral Program",
        becomeVolunteer: "Become a Volunteer",
        donationGuidelines: "Donation Guidelines"
      }
    }
  },
  hi: {
    translation: {
      dashboard: {
        title: "पिक एंड गिव",
        welcome: "स्वागत है",
        ecoPoints: "इको-पॉइंट्स",
        totalDonations: "कुल दान",
        verifiedItems: "सत्यापित वस्तुएं",
        quickActions: "त्वरित कार्य",
        newDonation: "नया दान",
        schedulePickup: "पिकअप शेड्यूल करें",
        yourDonations: "आपके दान",
        noDonations: "अभी तक कोई दान नहीं",
        noDonationsText: "अपनी पहली वस्तु दान करके बदलाव की शुरुआत करें!",
        makeFirstDonation: "अपना पहला दान करें",
        upcomingPickups: "आगामी पिकअप",
        ecoPointsBreakdown: "इको-पॉइंट्स विवरण",
        rewardsAndCoupons: "पुरस्कार और कूपन",
        donationHistory: "दान इतिहास",
        profile: "प्रोफ़ाइल",
        notifications: "सूचनाएं",
        logout: "लॉग आउट",
        editProfile: "प्रोफ़ाइल संपादित करें",
        leaderboard: "समुदायिक लीडरबोर्ड",
        referralProgram: "रेफरल प्रोग्राम",
        becomeVolunteer: "स्वयंसेवक बनें",
        donationGuidelines: "दान दिशा-निर्देश"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
