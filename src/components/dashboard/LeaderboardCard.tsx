
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';

const LeaderboardCard = () => {
  const leaderboard = [
    { name: "Priya Sharma", points: 1250, rank: 1, tier: "Gold" },
    { name: "Rahul Kumar", points: 980, rank: 2, tier: "Silver" },
    { name: "Anjali Singh", points: 750, rank: 3, tier: "Silver" },
    { name: "You", points: 450, rank: 8, tier: "Bronze" }
  ];

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Gold': return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 'Silver': return <Medal className="h-4 w-4 text-gray-400" />;
      default: return <Award className="h-4 w-4 text-amber-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Community Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((user, index) => (
            <div key={index} className={`flex items-center justify-between p-2 rounded ${user.name === 'You' ? 'bg-green-50 border border-green-200' : ''}`}>
              <div className="flex items-center space-x-3">
                <span className="font-medium text-sm">#{user.rank}</span>
                {getTierIcon(user.tier)}
                <span className={`text-sm ${user.name === 'You' ? 'font-semibold' : ''}`}>
                  {user.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{user.points}</span>
                <Badge variant="outline" className="text-xs">
                  {user.tier}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
