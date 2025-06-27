
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings } from 'lucide-react';
import ProfileSettingsModal from './ProfileSettingsModal';

interface ProfileCardProps {
  fullName: string;
  email?: string;
  totalEcoPoints: number;
  profile: any;
  onProfileUpdate: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  fullName, 
  email, 
  totalEcoPoints,
  profile,
  onProfileUpdate
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">{fullName}</h3>
              {email && <p className="text-sm text-muted-foreground">{email}</p>}
              <p className="text-sm text-green-600 font-medium">
                {totalEcoPoints} Eco-Points
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <ProfileSettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        profile={profile}
        onProfileUpdate={onProfileUpdate}
      />
    </>
  );
};

export default ProfileCard;
