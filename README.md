# Food Waste Dashboard

A comprehensive AI-powered dashboard designed to track and manage food waste effectively. The dashboard provides insights into sustainability metrics, gamification features, and actionable data.

![Dashboard Preview 1](https://raw.githubusercontent.com/CHANDIGARH-UNIVERSITY-DOMAIN-CAMP-2024/project-Harsh-Gopal/main/Preview1.png)  
![Dashboard Preview 2](https://raw.githubusercontent.com/CHANDIGARH-UNIVERSITY-DOMAIN-CAMP-2024/project-Harsh-Gopal/main/Preview2.png)  
![Dashboard Preview 3](https://raw.githubusercontent.com/CHANDIGARH-UNIVERSITY-DOMAIN-CAMP-2024/project-Harsh-Gopal/main/Preview3.png)

---

## Features

- **Real-Time Analytics**: Track food waste in real time.
- **AI-Powered Insights**: Get predictions and actionable recommendations.
- **Sustainability Metrics**: Monitor environmental impact and carbon footprint.
- **Gamification**: Unlock challenges, earn achievements, and participate in leaderboards.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Smart Alerts**: Stay updated with notifications.

---

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Recharts
- **Backend**: Supabase
- **Build Tool**: Vite
- **Icons**: Lucide Icons

---

## Requirements

- **Node.js**: Version 16 or higher  
- **Package Manager**: npm or yarn  
- **Supabase Account**: For backend setup  

---

## How to run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/CHANDIGARH-UNIVERSITY-DOMAIN-CAMP-2024/project-Harsh-Gopal.git
cd project-Harsh-Gopal
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the project root and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## Database Setup

The project uses **Supabase** for database management. To set up the database schema, run the migrations from the `supabase/migrations` folder:

```bash
supabase migration up
```

---

## Project Structure

```
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and configurations
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Helper functions
├── supabase/
│   └── migrations/      # Database migrations
├── public/              # Static assets
└── index.html           # Main HTML file
```

---

## Key Features Overview

### Real-Time Tracking
- Monitor food waste live
- Compare historical data
- Analyze trends over time

### AI-Powered Insights
- Predict waste trends
- Identify anomalies
- Smart recommendations for waste reduction

### Sustainability Metrics
- Environmental impact tracking
- Calculate carbon footprint
- Track and improve sustainability scores

### Gamification Features
- Participate in monthly challenges
- Earn achievement badges
- Compete on leaderboards

---

## Contribution Guidelines

1. **Fork** the repository.  
2. Create a feature branch: `git checkout -b feature/your-feature`.  
3. Commit changes: `git commit -m "Add your feature description"`.  
4. Push to the branch: `git push origin feature/your-feature`.  
5. Submit a Pull Request for review.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Recharts](https://recharts.org/) for advanced charting capabilities.  
- [Lucide](https://lucide.dev/) for modern icons.  
- [Tailwind CSS](https://tailwindcss.com/) for seamless styling.  
- [Supabase](https://supabase.com/) for backend services.

---
