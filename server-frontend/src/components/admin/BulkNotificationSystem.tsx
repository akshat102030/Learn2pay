import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Switch } from "../../components/ui/Switch";
import { Badge } from "../../components/ui/Badge";
import { Textarea } from "../../components/ui/Textarea";
import { Bell, Phone, Mail, MessageSquare, Send } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select";
import { useToast } from "../../hooks/use-toast";

// Define interfaces for TypeScript
interface NotificationChannels {
  push: boolean;
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
}

interface NotificationData {
  title: string;
  message: string;
  type: string;
  channels: NotificationChannels;
  scheduled: boolean;
  scheduleDate: string;
  urgent: boolean;
}

interface TargetGroup {
  id: string;
  label: string;
  count: string;
}

interface NotificationStat {
  label: string;
  value: string;
  change: string;
  color: string;
}

interface RecentNotification {
  id: number;
  title: string;
  message: string;
  sentTo: string;
  channels: string[];
  sent: string;
  delivered: string;
  timestamp: string;
}

const BulkNotificationSystem: React.FC = () => {
  const { toast } = useToast();
  const [notificationData, setNotificationData] = useState<NotificationData>({
    title: "",
    message: "",
    type: "all-users",
    channels: {
      push: true,
      email: true,
      sms: false,
      whatsapp: false
    },
    scheduled: false,
    scheduleDate: "",
    urgent: false
  });

  const targetGroups: TargetGroup[] = [
    { id: "all-users", label: "All Users", count: "45,290" },
    { id: "active-users", label: "Active Users", count: "42,156" },
    { id: "inactive-users", label: "Inactive Users", count: "3,134" },
    { id: "vendors", label: "All Vendors", count: "134" },
    { id: "franchises", label: "All Franchises", count: "56" },
    { id: "pending-kyc", label: "Pending KYC", count: "89" },
    { id: "new-users", label: "New Users (Last 30 days)", count: "1,245" }
  ];

  const notificationStats: NotificationStat[] = [
    {
      label: "Notifications Sent",
      value: "12.5K",
      change: "+15% this month",
      color: "text-success"
    },
    {
      label: "Delivery Rate",
      value: "98.2%",
      change: "+1.5% improvement",
      color: "text-success"
    },
    {
      label: "Engagement",
      value: "42.7%",
      change: "+5.3% this month",
      color: "text-success"
    },
    {
      label: "Push Enabled",
      value: "38.9K",
      change: "85.9% of users",
      color: "text-secondary"
    }
  ];

  const recentNotifications: RecentNotification[] = [
    {
      id: 1,
      title: "Fee Payment Reminder",
      message: "Your fee payment is due in 3 days",
      sentTo: "All Students",
      channels: ["Email", "Push"],
      sent: "45,290",
      delivered: "44,982",
      timestamp: "2024-01-16 14:30"
    },
    {
      id: 2,
      title: "New Course Available",
      message: "Check out our new Data Science course",
      sentTo: "Active Users",
      channels: ["Email", "Push", "SMS"],
      sent: "42,156",
      delivered: "41,890",
      timestamp: "2024-01-16 10:45"
    },
    {
      id: 3,
      title: "KYC Reminder",
      message: "Complete your KYC verification",
      sentTo: "Pending KYC",
      channels: ["SMS", "WhatsApp"],
      sent: "890",
      delivered: "876",
      timestamp: "2024-01-15 09:15"
    }
  ];

  const handleChannelChange = (channel: string, enabled: boolean) => {
    setNotificationData(prev => ({
      ...prev,
      channels: { ...prev.channels, [channel]: enabled }
    }));
  };

  const handleSendNotification = () => {
    if (!notificationData.title || !notificationData.message) {
      toast({
        title: "Notification Error",
        description: "Please enter a title and message.",
        variant: "destructive"
      });
      return;
    }
    if (notificationData.scheduled && !notificationData.scheduleDate) {
      toast({
        title: "Scheduling Error",
        description: "Please select a schedule date and time.",
        variant: "destructive"
      });
      return;
    }
    const action = notificationData.scheduled ? "scheduled" : "sent";
    toast({
      title: `Notification ${action === "sent" ? "Sent" : "Scheduled"}`,
      description: `Notification "${notificationData.title}" ${action} to ${notificationData.type} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    setNotificationData(prev => ({
      ...prev,
      title: "",
      message: "",
      scheduleDate: ""
    }));
  };

  const handlePreview = () => {
    toast({
      title: "Preview Generated",
      description: `Preview for "${notificationData.title}" generated at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Mock: Implement preview logic (e.g., show a modal with formatted notification)
  };

  return (
    <Card className="bg-card-bg border-card-border">
      <CardHeader>
        <CardTitle className="flex items-center text-text-color">
          <MessageSquare className="h-5 w-5 mr-2 text-primary" />
          Bulk Notification System
        </CardTitle>
        <CardDescription className="text-text-secondary">Send notifications to users, vendors, and franchises</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {notificationStats.map((stat, index) => (
            <Card key={index} className="bg-surface-color border-border-color">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-text-color">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
                <div className={`text-xs ${stat.color}`}>{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Notification */}
        <Card className="bg-surface-color border-border-color">
          <CardHeader>
            <CardTitle className="text-lg text-text-color">Create New Notification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-secondary mb-2 block">Notification Title</label>
              <Input
                placeholder="Enter notification title"
                value={notificationData.title}
                onChange={(e) => setNotificationData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-input-bg border-input-border text-input-text placeholder-text-secondary/70"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-text-secondary mb-2 block">Message</label>
              <Textarea
                placeholder="Enter your message"
                value={notificationData.message}
                onChange={(e) => setNotificationData(prev => ({ ...prev, message: e.target.value }))}
                className="bg-input-bg border-input-border text-input-text placeholder-text-secondary/70"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-text-secondary mb-2 block">Target Group</label>
              <Select
                value={notificationData.type}
                onValueChange={(value) => setNotificationData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="bg-input-bg border-input-border text-input-text">
                  <SelectValue placeholder="Select target group" />
                </SelectTrigger>
                <SelectContent className="bg-surface-color border-border-color">
                  {targetGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id} className="text-text-color">
                      {group.label} ({group.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Channels */}
            <div>
              <label className="text-sm font-medium text-text-secondary mb-3 block">Delivery Channels</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2 text-text-color">
                  <Switch
                    checked={notificationData.channels.push}
                    onCheckedChange={(checked) => handleChannelChange('push', checked)}
                  />
                  <Bell className="h-4 w-4 text-text-secondary" />
                  <span>Push</span>
                </div>
                <div className="flex items-center space-x-2 text-text-color">
                  <Switch
                    checked={notificationData.channels.email}
                    onCheckedChange={(checked) => handleChannelChange('email', checked)}
                  />
                  <Mail className="h-4 w-4 text-text-secondary" />
                  <span>Email</span>
                </div>
                <div className="flex items-center space-x-2 text-text-color">
                  <Switch
                    checked={notificationData.channels.sms}
                    onCheckedChange={(checked) => handleChannelChange('sms', checked)}
                  />
                  <Phone className="h-4 w-4 text-text-secondary" />
                  <span>SMS</span>
                </div>
                <div className="flex items-center space-x-2 text-text-color">
                  <Switch
                    checked={notificationData.channels.whatsapp}
                    onCheckedChange={(checked) => handleChannelChange('whatsapp', checked)}
                  />
                  <MessageSquare className="h-4 w-4 text-text-secondary" />
                  <span>WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between p-3 bg-surface-color rounded-md border border-border-color">
              <div>
                <h4 className="font-medium text-text-color">Schedule for Later</h4>
                <p className="text-sm text-text-secondary">Send at a specific time</p>
              </div>
              <Switch
                checked={notificationData.scheduled}
                onCheckedChange={(checked) => setNotificationData(prev => ({ ...prev, scheduled: checked }))}
              />
            </div>

            {notificationData.scheduled && (
              <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">Schedule Date & Time</label>
                <Input
                  type="datetime-local"
                  value={notificationData.scheduleDate}
                  onChange={(e) => setNotificationData(prev => ({ ...prev, scheduleDate: e.target.value }))}
                  className="bg-input-bg border-input-border text-input-text"
                />
              </div>
            )}

            <div className="flex items-center justify-between p-3 bg-surface-color rounded-md border border-border-color">
              <div>
                <h4 className="font-medium text-text-color">Urgent Notification</h4>
                <p className="text-sm text-text-secondary">High priority delivery</p>
              </div>
              <Switch
                checked={notificationData.urgent}
                onCheckedChange={(checked) => setNotificationData(prev => ({ ...prev, urgent: checked }))}
              />
            </div>

            <div className="flex space-x-2 pt-2">
              <Button className="flex-1 bg-primary hover:bg-primary-hover text-white" onClick={handleSendNotification}>
                <Send className="h-4 w-4 mr-2" />
                {notificationData.scheduled ? 'Schedule Notification' : 'Send Now'}
              </Button>
              <Button variant="outline" className="border-border-color text-text-color hover:bg-surface-color" onClick={handlePreview}>
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="bg-surface-color border-border-color">
          <CardHeader>
            <CardTitle className="text-lg text-text-color">Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-4 bg-card-bg border border-border-color rounded-md">
                  <div className="flex-1">
                    <div className="font-medium text-text-color">{notification.title}</div>
                    <div className="text-sm text-text-secondary">{notification.message}</div>
                    <div className="flex items-center space-x-4 text-xs text-text-secondary/70 mt-1">
                      <span>To: {notification.sentTo}</span>
                      <span>Sent: {notification.sent}</span>
                      <span>Delivered: {notification.delivered}</span>
                      <span>{notification.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {notification.channels.map((channel, index) => (
                      <Badge key={index} variant="outline" className="border-border-color text-text-secondary">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default BulkNotificationSystem;