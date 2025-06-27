
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ThreeDCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const ThreeDCard: React.FC<ThreeDCardProps> = ({ title, description, icon, delay = 0 }) => {
  return (
    <Card 
      className="text-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-green-100/50 cursor-pointer transform-gpu perspective-1000"
      style={{
        animationDelay: `${delay}ms`,
        transform: 'translateZ(0)',
      }}
    >
      <CardHeader>
        <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-full shadow-lg">
              {icon}
            </div>
          </div>
        </div>
        <CardTitle className="group-hover:text-green-600 transition-colors duration-300">{title}</CardTitle>
        <CardDescription className="group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ThreeDCard;
