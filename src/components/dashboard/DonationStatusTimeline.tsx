
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TimelineProps {
  status: string;
  createdAt: string;
}

const DonationStatusTimeline: React.FC<TimelineProps> = ({ status, createdAt }) => {
  const stages = [
    { key: 'submitted', label: 'Submitted' },
    { key: 'scheduled', label: 'Scheduled' },
    { key: 'picked_up', label: 'Picked Up' },
    { key: 'verified', label: 'Verified' }
  ];

  const currentStageIndex = stages.findIndex(stage => stage.key === status);

  return (
    <div className="flex items-center space-x-2 mt-2">
      {stages.map((stage, index) => (
        <div key={stage.key} className="flex items-center">
          <div 
            className={`w-3 h-3 rounded-full ${
              index <= currentStageIndex 
                ? 'bg-green-500' 
                : index === currentStageIndex + 1 
                ? 'bg-yellow-500' 
                : 'bg-gray-300'
            }`}
          />
          {index < stages.length - 1 && (
            <div 
              className={`w-8 h-0.5 ${
                index < currentStageIndex ? 'bg-green-500' : 'bg-gray-300'
              }`} 
            />
          )}
        </div>
      ))}
      <Badge variant="outline" className="ml-2 text-xs">
        {stages.find(s => s.key === status)?.label || status}
      </Badge>
    </div>
  );
};

export default DonationStatusTimeline;
