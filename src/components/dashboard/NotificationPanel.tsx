
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';

const NotificationPanel = () => {
  const [notifications] = useState([
    { id: 1, message: "Your donation has been verified!", time: "2 hours ago", unread: true },
    { id: 2, message: "Pickup scheduled for tomorrow", time: "1 day ago", unread: true },
    { id: 3, message: "You earned 50 eco-points!", time: "2 days ago", unread: false }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-3">
          <h4 className="font-medium">Notifications</h4>
          {notifications.map((notification) => (
            <div key={notification.id} className={`p-3 rounded border ${notification.unread ? 'bg-blue-50' : ''}`}>
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
            </div>
          ))}
          <Button variant="outline" className="w-full" size="sm">
            View All
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPanel;
