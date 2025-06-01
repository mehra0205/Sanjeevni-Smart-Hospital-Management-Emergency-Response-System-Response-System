
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Book, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  const healthMetrics = [
    { label: "Heart Rate", value: "72 bpm", color: "text-red-600" },
    { label: "Weight", value: "75 kg", color: "text-green-600" },
    { label: "Blood Type", value: "A+", color: "text-blue-600" },
    { label: "Body Temp", value: "36.5 °C", color: "text-orange-600" }
  ];

  const upcomingAppointments = [
    { date: "Dec 5, 10:00 AM", doctor: "Dr. Sarah Lee", specialty: "Cardiology" },
    { date: "Dec 8, 02:30 PM", doctor: "Dr. John Smith", specialty: "General Practice" },
    { date: "Dec 10, 11:00 AM", doctor: "Dr. Emily Chen", specialty: "Pediatrics" }
  ];

  const recentActivity = [
    { action: "Booked an appointment with Dr. Sarah Lee", time: "Just now" },
    { action: "Uploaded a new prescription file", time: "1 hour ago" },
    { action: "Requested blood unit (Type O+)", time: "5 hours ago" },
    { action: "Updated profile picture", time: "1 day ago" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your health overview.</p>
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
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{appointment.date}</p>
                          <p className="text-sm text-gray-600">{appointment.doctor}</p>
                        </div>
                        <span className="text-sm text-indigo-600 font-medium">{appointment.specialty}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
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
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">Understanding Your Blood Pressure</h4>
                      <p className="text-xs text-gray-600">Learn about managing hypertension and keeping your heart healthy.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">The Importance of Annual Checkups</h4>
                      <p className="text-xs text-gray-600">Why regular checkups are crucial for early detection and prevention.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Healthy Eating Tips for Diabetics</h4>
                      <p className="text-xs text-gray-600">Guidance on diet and nutrition to manage blood sugar levels.</p>
                    </div>
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
