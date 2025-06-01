
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Bell, Phone } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Queue = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [queueData, setQueueData] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    // Load user's appointments for queue
    const userAppointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');
    const today = new Date().toDateString();
    
    // Filter appointments for today and create queue data
    const todayAppointments = userAppointments.filter((apt: any) => 
      new Date(apt.date).toDateString() === today
    );

    // Transform appointments to queue format with realistic queue positions
    const queueAppointments = todayAppointments.map((apt: any, index: number) => {
      const currentTime = new Date();
      const appointmentTime = new Date(`${apt.date} ${apt.time}`);
      const timeDiff = appointmentTime.getTime() - currentTime.getTime();
      const minutesDiff = Math.floor(timeDiff / (1000 * 60));
      
      let status = 'waiting';
      let position = Math.floor(Math.random() * 5) + 1; // Random position 1-5
      let estimatedWait = `${Math.max(5, position * 8)} minutes`;
      
      if (minutesDiff <= 15 && minutesDiff > 0) {
        status = 'next';
        position = 1;
        estimatedWait = '5 minutes';
      } else if (minutesDiff < 0) {
        status = 'delayed';
        estimatedWait = '10 minutes';
      }

      return {
        id: apt.id,
        department: apt.department,
        doctor: `Dr. ${apt.doctorName}`,
        appointmentTime: apt.time,
        currentPosition: position,
        estimatedWait: estimatedWait,
        status: status,
        location: `Room ${200 + index + 1}, ${Math.floor(Math.random() * 3) + 1}${index > 0 ? 'st' : 'nd'} Floor`,
        specialty: apt.specialty || 'General Consultation'
      };
    });

    setQueueData(queueAppointments);

    // Load notifications
    const userNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    setNotifications(userNotifications);

    // Simulate queue updates every 30 seconds
    const interval = setInterval(() => {
      setQueueData(prevQueue => 
        prevQueue.map(apt => {
          if (apt.status === 'waiting' && apt.currentPosition > 1) {
            const newPosition = Math.max(1, apt.currentPosition - 1);
            const newWait = `${Math.max(5, newPosition * 8)} minutes`;
            
            // Add notification for position update
            if (newPosition !== apt.currentPosition) {
              const newNotification = {
                type: 'queue',
                message: `Your position for ${apt.doctor} has moved to #${newPosition}`,
                time: new Date().toLocaleTimeString(),
                timestamp: Date.now()
              };
              
              setNotifications(prev => [newNotification, ...prev].slice(0, 10));
              
              // Update localStorage
              const updatedNotifications = [newNotification, ...userNotifications].slice(0, 10);
              localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
            }
            
            return {
              ...apt,
              currentPosition: newPosition,
              estimatedWait: newWait,
              status: newPosition === 1 ? 'next' : 'waiting'
            };
          }
          return apt;
        })
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'next': return 'bg-green-100 text-green-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'next': return 'Next in Line';
      case 'waiting': return 'Waiting';
      case 'delayed': return 'Delayed';
      default: return 'Unknown';
    }
  };

  const handleCheckIn = (appointmentId: string) => {
    toast({
      title: "Checked In Successfully",
      description: "You have been checked in for your appointment.",
    });
    
    const newNotification = {
      type: 'appointment',
      message: 'Successfully checked in for your appointment',
      time: new Date().toLocaleTimeString(),
      timestamp: Date.now()
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    const updatedNotifications = [newNotification, ...notifications].slice(0, 10);
    localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
  };

  const handleRequestWaitUpdate = (appointmentId: string) => {
    const appointment = queueData.find(apt => apt.id === appointmentId);
    if (appointment) {
      toast({
        title: "Wait Time Update Requested",
        description: `Current estimated wait: ${appointment.estimatedWait}`,
      });
      
      const newNotification = {
        type: 'queue',
        message: `Wait time update: ${appointment.estimatedWait} for ${appointment.doctor}`,
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now()
      };
      
      setNotifications(prev => [newNotification, ...prev].slice(0, 10));
      const updatedNotifications = [newNotification, ...notifications].slice(0, 10);
      localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
    }
  };

  const handleReschedule = (appointmentId: string) => {
    toast({
      title: "Reschedule Request Sent",
      description: "Reception will contact you shortly to reschedule your appointment.",
    });
    
    const newNotification = {
      type: 'appointment',
      message: 'Reschedule request submitted. Reception will contact you soon.',
      time: new Date().toLocaleTimeString(),
      timestamp: Date.now()
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    const updatedNotifications = [newNotification, ...notifications].slice(0, 10);
    localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
  };

  const handleContactReception = () => {
    const phoneNumber = "tel:12345678910";
    window.open(phoneNumber, '_self');
    
    toast({
      title: "Calling Reception",
      description: "Connecting you to reception at 12345678910",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Queue Management</h1>
            <p className="text-gray-600">Track your appointment status and queue position in real-time.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Queue Status */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Appointments Today</CardTitle>
                  <CardDescription>Real-time queue status for your scheduled appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  {queueData.length > 0 ? (
                    <div className="space-y-6">
                      {queueData.map((appointment) => (
                        <div key={appointment.id} className="p-6 border rounded-lg bg-white shadow-sm">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">{appointment.doctor}</h3>
                              <p className="text-gray-600">{appointment.department}</p>
                              <p className="text-sm text-gray-500">{appointment.specialty}</p>
                              <p className="text-sm text-gray-500 flex items-center mt-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                {appointment.location}
                              </p>
                            </div>
                            <Badge className={getStatusColor(appointment.status)}>
                              {getStatusText(appointment.status)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-center mb-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <Clock className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                              <p className="text-sm font-medium">Appointment</p>
                              <p className="text-lg font-bold text-blue-600">{appointment.appointmentTime}</p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                              <Users className="h-5 w-5 mx-auto mb-1 text-orange-600" />
                              <p className="text-sm font-medium">Position</p>
                              <p className="text-lg font-bold text-orange-600">#{appointment.currentPosition}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                              <Bell className="h-5 w-5 mx-auto mb-1 text-green-600" />
                              <p className="text-sm font-medium">Est. Wait</p>
                              <p className="text-lg font-bold text-green-600">{appointment.estimatedWait}</p>
                            </div>
                          </div>
                          
                          {appointment.status === 'next' && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <p className="text-green-800 font-medium">🔔 You're next! Please be ready.</p>
                            </div>
                          )}
                          
                          <div className="flex gap-2 flex-wrap">
                            <Button 
                              size="sm" 
                              onClick={() => handleCheckIn(appointment.id)}
                              className="bg-indigo-600 hover:bg-indigo-700"
                            >
                              Check In
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleRequestWaitUpdate(appointment.id)}
                            >
                              Request Wait Update
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleReschedule(appointment.id)}
                            >
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No appointments in queue today</p>
                      <p className="text-sm">Your future appointments will appear here</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Department Queue Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Queue Status</CardTitle>
                  <CardDescription>Current wait times across different departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { dept: "Cardiology", wait: "15-20 min", patients: 8, status: "normal" },
                      { dept: "General Medicine", wait: "5-10 min", patients: 3, status: "fast" },
                      { dept: "Orthopedics", wait: "30-35 min", patients: 12, status: "busy" },
                      { dept: "Dermatology", wait: "10-15 min", patients: 5, status: "normal" }
                    ].map((dept, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{dept.dept}</h4>
                          <Badge variant="outline" className={
                            dept.status === 'fast' ? 'text-green-600 border-green-600' :
                            dept.status === 'busy' ? 'text-red-600 border-red-600' : 
                            'text-yellow-600 border-yellow-600'
                          }>
                            {dept.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{dept.patients} patients waiting</p>
                        <p className="text-lg font-semibold">{dept.wait}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Notifications */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2"
                    onClick={handleContactReception}
                  >
                    <Phone className="h-4 w-4" />
                    Contact Reception
                  </Button>
                  <p className="text-xs text-gray-500 text-center">Call: 12345678910</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {notifications.slice(0, 8).map((notification, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${
                        notification.type === 'queue' ? 'bg-blue-50 border-blue-200' :
                        notification.type === 'appointment' ? 'bg-green-50 border-green-200' :
                        'bg-yellow-50 border-yellow-200'
                      }`}>
                        <p className={`text-sm font-medium ${
                          notification.type === 'queue' ? 'text-blue-800' :
                          notification.type === 'appointment' ? 'text-green-800' :
                          'text-yellow-800'
                        }`}>
                          {notification.type === 'queue' ? 'Queue Update' :
                           notification.type === 'appointment' ? 'Appointment' : 'System'}
                        </p>
                        <p className={`text-xs ${
                          notification.type === 'queue' ? 'text-blue-600' :
                          notification.type === 'appointment' ? 'text-green-600' :
                          'text-yellow-600'
                        }`}>
                          {notification.message}
                        </p>
                        <p className={`text-xs mt-1 ${
                          notification.type === 'queue' ? 'text-blue-500' :
                          notification.type === 'appointment' ? 'text-green-500' :
                          'text-yellow-500'
                        }`}>
                          {notification.time}
                        </p>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No recent notifications</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Arrive 15 minutes before your appointment</p>
                    <p>• Bring your ID and insurance card</p>
                    <p>• Check in using the app to save time</p>
                    <p>• Call reception for urgent changes</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;
