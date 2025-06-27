# Welcome to Pick-and-Give


## 🌿 Pick & Give — A Donation Pickup and Rewards Engine

**Pick & Give** is a sustainability-focused full-stack web application that enables users to schedule pickups for their used goods (clothes, books, electronics) and receive **eco-points** as rewards. It simplifies the donation process, promotes reuse, and incentivizes responsible behavior.

-----

**URL**: https://pick-and-give.lovable.app


## 🧩 Features

### 👥 User Features

  * User registration and login via Supabase Auth
  * Schedule donation pickups with category tagging and images
  * Track donation status in real-time (Submitted → Scheduled → Verified → Rewarded)
  * Earn and redeem eco-points for verified donations
  * View eco-impact metrics and donation history
  * Toggle light/dark mode and switch between English / Hindi

### 📦 Admin/Platform Features

  * Admin dashboard for verifying donations and managing pickups
  * Eco-points issuance logic based on verified items
  * Zapier + Google Calendar integration for pickup scheduling
  * Referral tracking and reward system (planned)
  * Leaderboard and gamified tiers (future-ready)

-----

## 🖥️ Tech Stack

| Layer      | Tools / Services                      |
|------------|----------------------------------------|
| Frontend   | React.js, Tailwind CSS, Shadcn/ui      |
| Backend    | Supabase (PostgreSQL, Edge Functions)  |
| Auth       | Supabase Auth                          |
| Storage    | Supabase Storage (Images)              |
| Calendar   | Zapier + Google Calendar API           |
| Charts     | Recharts / Chart.js                    |
| Hosting    | Vercel (frontend), Supabase (backend)  |
| UI Design  | Miro (UX), Lovable AI (UI design)      |
| Assets     | Spline/Framer for 3D visual elements   |
| Docs/Collab| Notion, GitHub, Postman                |

-----

## 📂 Project Structure

```bash
pick-and-give/
│
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/
│   │   ├── index.tsx      # Homepage
│   │   ├── dashboard.tsx  # User dashboard after login
│   │   └── donate.tsx     # Donation form
│   ├── lib/               # Supabase client and utilities
│   ├── i18n/              # Language config and translations
│   └── styles/            # Tailwind config and custom CSS
│
├── supabase/
│   ├── schema.sql         # DB schema
│   ├── functions/         # PostgreSQL RPCs
│   └── storage/           # Supabase storage buckets
│
├── .env.local             # Supabase keys & secrets
├── tailwind.config.js
├── README.md
└── package.json
```

### 📈 Supabase Tables Overview

  * **users**: user metadata, auth UUIDs
  * **donations**: item info, category, status
  * **pickups**: scheduled date/time, status
  * **eco\_points**: transaction log (earn/redeem)
  * **rewards**: redeemed rewards, active coupons
  * **referrals**: user referral codes and bonuses
  * **notifications**: in-app notification logs

### 🧠 Key Supabase Functions (RPCs)

  * `get_user_dashboard_stats(user_id)`
  * `get_donation_timeline(donation_id)`
  * `get_eco_points_history(user_id)`
  * `redeem_coupon(user_id, coupon_code)`
  * `get_donation_summary(user_id)`
  * `get_donation_history(user_id, filter)`
  * `log_referral(user_id, referral_code)`
  * `apply_volunteer_request(user_id, form_data)`

-----

## 🛠️ Setup & Development

### 1\. Clone the Repository

```bash
git clone https://github.com/your-username/pick-and-give.git
cd pick-and-give
```

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Environment Setup

Create a `.env.local` file in the root directory and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (if needed)
```

### 4\. Run Locally

```bash
npm run dev
```

### 5\. Deploy

  * **Frontend**: Deploy to Vercel
  * **Backend**: Supabase project (hosted DB, storage, auth, functions)

-----

## 🚀 Upcoming Features (Planned)

  *  3D visual UI using Spline
  *  Eco-points gamification leaderboard
  *  Pickup partner dashboard (for NGOs/logistics)
  *  AI image classification of donation items (using HuggingFace or Replicate)
  *  Admin panel for category-based eco-points rules
  *  Mobile PWA optimization

-----

## 🤝 Contributing

We welcome contributions\! Please follow these steps:

1.  Fork the project
2.  Create your feature branch: `git checkout -b feature/awesome-feature`
3.  Commit your changes: `git commit -m 'feat: Add awesome feature'`
4.  Push to the branch: `git push origin feature/awesome-feature`
5.  Submit a pull request

-----

## 📜 License

This project is licensed under the MIT License.

-----

## 👤 Authors & Maintainers

  * **Project Lead**: Himanshu Warulkar
  * **UI/UX**: Designed using Miro, Lovable AI
  * **Backend Design**: Supabase
  * **Docs & Infra**: Notion, GitHub

-----

## 📞 Contact & Links

  * [LinkedIn](https://www.google.com/search?q=https://www.linkedin.com/in/himanshu-warulkar/) (Replace with actual LinkedIn profile)
  * [GitHub Issues](https://www.google.com/search?q=https://github.com/your-username/pick-and-give/issues) (Replace with actual GitHub issues link)
  * [Live Demo](https://www.google.com/search?q=https://www.pickandgive.com) (Replace with actual live demo URL)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.


## HomePage UI
![image](https://github.com/user-attachments/assets/5bcb046a-54f1-46b4-8f82-c6016622fe71)

## LoginPage UI
![image](https://github.com/user-attachments/assets/ccc12d3c-364c-49e7-aae8-39a8f6d90c98)

## DashBoard UI
![image](https://github.com/user-attachments/assets/e32f88d1-6e86-40e0-803b-b8df11eded64)

## Donation Interface
![image](https://github.com/user-attachments/assets/83d24e70-7520-4b09-9665-4d74fe2cc51a)

## Scheduling the Pickup
![image](https://github.com/user-attachments/assets/e50709e9-ea6c-4aec-b44d-066c48ba83d5)

## Learn more I
![image](https://github.com/user-attachments/assets/54e62f1f-3a87-4b16-af91-ca8ec3ed6ace)

## Learn more II
![image](https://github.com/user-attachments/assets/11f7062b-77ac-434d-a433-d151559fb392)


Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
