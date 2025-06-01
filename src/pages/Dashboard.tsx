
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Book, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    // Load user's appointments
    const userAppointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');
    setAppointments(userAppointments);

    // Load notifications
    const userNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    setNotifications(userNotifications);
  }, []);

  const healthMetrics = [
    { label: "Heart Rate", value: "72 bpm", color: "text-red-600" },
    { label: "Weight", value: "75 kg", color: "text-green-600" },
    { label: "Blood Type", value: "A+", color: "text-blue-600" },
    { label: "Body Temp", value: "36.5 °C", color: "text-orange-600" }
  ];

  const healthResources = [
    {
      title: "Managing Blood Pressure",
      summary: "Learn evidence-based techniques for controlling hypertension through lifestyle modifications, dietary changes, and understanding medication timing for optimal cardiovascular health."
    },
    {
      title: "Preventive Health Screenings",
      summary: "Discover age-appropriate screenings including mammograms, colonoscopies, and cholesterol tests that help detect conditions early when treatment is most effective."
    },
    {
      title: "Diabetes Management Guide",
      summary: "Comprehensive approach to managing blood glucose levels through balanced nutrition, regular monitoring, physical activity, and medication adherence for better long-term outcomes."
    }
  ];

  const recentActivity = [
    { action: `Welcome to Sanjeevni, ${currentUser?.name || 'User'}!`, time: "Just now" },
    { action: "Profile created successfully", time: "Today" },
    { action: "Health metrics initialized", time: "Today" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {currentUser?.name || 'User'}!
            </h1>
            <p className="text-gray-600">Here's your health overview and recent activities.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/appointments">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-12">
                        Book Doctor
                      </Button>
                    </Link>
                    <Link to="/blood-bank">
                      <Button variant="outline" className="w-full h-12">
                        Request Blood
                      </Button>
                    </Link>
                    <Link to="/records">
                      <Button variant="outline" className="w-full h-12">
                        View Records
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  {appointments.length > 0 ? (
                    <div className="space-y-4">
                      {appointments.map((appointment, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{appointment.date} at {appointment.time}</p>
                            <p className="text-sm text-gray-600">Dr. {appointment.doctorName}</p>
                          </div>
                          <span className="text-sm text-indigo-600 font-medium">{appointment.department}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No upcoming appointments</p>
                      <p className="text-sm">Book your first appointment to get started</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity & Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity & Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...notifications, ...recentActivity].slice(0, 5).map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm">{item.action || item.message}</p>
                          <p className="text-xs text-gray-500">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health Overview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Health Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {healthMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">{metric.label}</p>
                        <p className={`text-lg font-bold ${metric.color}`}>{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Health Resources */}
              <Card>
                <CardHeader>
                  <CardTitle>Health Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {healthResources.map((resource, index) => (
                      <div key={index}>
                        <h4 className="font-medium text-sm mb-1">{resource.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{resource.summary}</p>
                      </div>
                    ))}
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

export default Dashboard;
