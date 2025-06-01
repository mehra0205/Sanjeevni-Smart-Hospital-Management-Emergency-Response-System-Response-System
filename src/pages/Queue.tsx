
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Bell } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";

const Queue = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [queueData, setQueueData] = useState([
    {
      id: 1,
      department: "Cardiology",
      doctor: "Dr. Rajesh Kumar",
      appointmentTime: "10:00 AM",
      currentPosition: 3,
      estimatedWait: "25 minutes",
      status: "waiting",
      location: "Room 201, 2nd Floor"
    },
    {
      id: 2,
      department: "General Medicine",
      doctor: "Dr. Priya Sharma", 
      appointmentTime: "02:30 PM",
      currentPosition: 1,
      estimatedWait: "5 minutes",
      status: "next",
      location: "Room 105, 1st Floor"
    }
  ]);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
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
                    <div className="space-y-4">
                      {queueData.map((appointment) => (
                        <div key={appointment.id} className="p-4 border rounded-lg bg-white shadow-sm">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{appointment.doctor}</h3>
                              <p className="text-gray-600">{appointment.department}</p>
                              <p className="text-sm text-gray-500 flex items-center mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                {appointment.location}
                              </p>
                            </div>
                            <Badge className={getStatusColor(appointment.status)}>
                              {getStatusText(appointment.status)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-center">
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
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <p className="text-green-800 font-medium">🔔 You're next! Please be ready.</p>
                            </div>
                          )}
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

              {/* Queue Statistics */}
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
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Check In for Appointment
                  </Button>
                  <Button variant="outline" className="w-full">
                    Request Wait Time Update
                  </Button>
                  <Button variant="outline" className="w-full">
                    Reschedule Appointment
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Reception
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">Queue Update</p>
                      <p className="text-xs text-blue-600">Your position in Cardiology queue has moved up</p>
                      <p className="text-xs text-blue-500 mt-1">2 minutes ago</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-medium text-green-800">Ready Soon</p>
                      <p className="text-xs text-green-600">Dr. Priya Sharma will see you in ~5 minutes</p>
                      <p className="text-xs text-green-500 mt-1">5 minutes ago</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm font-medium text-yellow-800">Delay Notice</p>
                      <p className="text-xs text-yellow-600">Cardiology running 10 minutes behind schedule</p>
                      <p className="text-xs text-yellow-500 mt-1">15 minutes ago</p>
                    </div>
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
                    <p>• Update your contact info for SMS alerts</p>
                    <p>• Check in using the app to save time</p>
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
