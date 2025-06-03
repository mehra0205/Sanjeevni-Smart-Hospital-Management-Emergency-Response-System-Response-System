
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Users, MapPin, Phone, Star, Calendar, AlertCircle } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Progress } from "@/components/ui/progress";

const Queue = () => {
  const queueData = [
    {
      id: 1,
      doctorName: "Dr. Sarah Smith",
      specialty: "Cardiologist",
      currentQueue: 8,
      totalAppointments: 15,
      avgWaitTime: "25 min",
      nextAvailable: "2:30 PM",
      patients: [
        { name: "John Doe", appointmentTime: "2:00 PM", status: "waiting", estimatedWait: "15 min" },
        { name: "Jane Smith", appointmentTime: "2:15 PM", status: "in-progress", estimatedWait: "0 min" },
        { name: "Mike Johnson", appointmentTime: "2:30 PM", status: "scheduled", estimatedWait: "30 min" },
        { name: "Sarah Wilson", appointmentTime: "2:45 PM", status: "scheduled", estimatedWait: "45 min" },
        { name: "David Brown", appointmentTime: "3:00 PM", status: "scheduled", estimatedWait: "60 min" }
      ],
      rating: 4.8,
      location: "Room 204, Cardiology Wing",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Johnson",
      specialty: "Endocrinologist",
      currentQueue: 5,
      totalAppointments: 12,
      avgWaitTime: "18 min",
      nextAvailable: "3:15 PM",
      patients: [
        { name: "Emily Davis", appointmentTime: "3:00 PM", status: "in-progress", estimatedWait: "0 min" },
        { name: "Robert Taylor", appointmentTime: "3:15 PM", status: "scheduled", estimatedWait: "15 min" },
        { name: "Lisa Garcia", appointmentTime: "3:30 PM", status: "scheduled", estimatedWait: "30 min" },
        { name: "Tom Anderson", appointmentTime: "3:45 PM", status: "scheduled", estimatedWait: "45 min" }
      ],
      rating: 4.6,
      location: "Room 102, Endocrinology Department",
      phone: "+1 (555) 234-5678"
    },
    {
      id: 3,
      doctorName: "Dr. Emily Brown",
      specialty: "General Practitioner",
      currentQueue: 12,
      totalAppointments: 20,
      avgWaitTime: "35 min",
      nextAvailable: "4:00 PM",
      patients: [
        { name: "Alex Thompson", appointmentTime: "3:30 PM", status: "waiting", estimatedWait: "10 min" },
        { name: "Maria Rodriguez", appointmentTime: "3:45 PM", status: "in-progress", estimatedWait: "0 min" },
        { name: "James Wilson", appointmentTime: "4:00 PM", status: "scheduled", estimatedWait: "25 min" },
        { name: "Anna Lee", appointmentTime: "4:15 PM", status: "scheduled", estimatedWait: "40 min" },
        { name: "Peter Kim", appointmentTime: "4:30 PM", status: "scheduled", estimatedWait: "55 min" },
        { name: "Grace Chen", appointmentTime: "4:45 PM", status: "scheduled", estimatedWait: "70 min" }
      ],
      rating: 4.9,
      location: "Room 301, General Medicine",
      phone: "+1 (555) 345-6789"
    },
    {
      id: 4,
      doctorName: "Dr. David Wilson",
      specialty: "Orthopedic Surgeon",
      currentQueue: 3,
      totalAppointments: 8,
      avgWaitTime: "20 min",
      nextAvailable: "2:45 PM",
      patients: [
        { name: "Kevin Martinez", appointmentTime: "2:30 PM", status: "in-progress", estimatedWait: "0 min" },
        { name: "Helen Clark", appointmentTime: "2:45 PM", status: "scheduled", estimatedWait: "15 min" },
        { name: "Ryan Walker", appointmentTime: "3:00 PM", status: "scheduled", estimatedWait: "30 min" }
      ],
      rating: 4.7,
      location: "Room 405, Orthopedic Department",
      phone: "+1 (555) 456-7890"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-green-500';
      case 'waiting': return 'bg-yellow-500';
      case 'scheduled': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress': return 'In Progress';
      case 'waiting': return 'Waiting';
      case 'scheduled': return 'Scheduled';
      default: return 'Unknown';
    }
  };

  const getQueueStatus = (current: number, total: number) => {
    const percentage = (current / total) * 100;
    if (percentage < 50) return { text: 'Light', color: 'text-green-600' };
    if (percentage < 80) return { text: 'Moderate', color: 'text-yellow-600' };
    return { text: 'Heavy', color: 'text-red-600' };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Queue Management</h1>
            <p className="text-gray-600">Real-time view of doctor appointments and patient queues</p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                    <p className="text-2xl font-bold text-gray-900">{queueData.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Patients in Queue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {queueData.reduce((sum, doctor) => sum + doctor.currentQueue, 0)}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Wait Time</p>
                    <p className="text-2xl font-bold text-gray-900">24 min</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {queueData.reduce((sum, doctor) => sum + doctor.totalAppointments, 0)}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Doctor Queue Cards */}
          <div className="space-y-6">
            {queueData.map((doctor) => {
              const queueStatus = getQueueStatus(doctor.currentQueue, doctor.totalAppointments);
              const completionPercentage = ((doctor.totalAppointments - doctor.currentQueue) / doctor.totalAppointments) * 100;
              
              return (
                <Card key={doctor.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={`/placeholder-doctor-${doctor.id}.jpg`} />
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                            {doctor.doctorName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-xl">{doctor.doctorName}</CardTitle>
                          <CardDescription className="text-base">{doctor.specialty}</CardDescription>
                          <div className="flex items-center mt-2 space-x-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm font-medium">{doctor.rating}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              {doctor.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-4 w-4 mr-1" />
                              {doctor.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={queueStatus.color}>
                          {queueStatus.text} Queue
                        </Badge>
                        <p className="text-sm text-gray-600 mt-2">Next available: {doctor.nextAvailable}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Queue Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">Patients in Queue</p>
                        <p className="text-2xl font-bold text-blue-600">{doctor.currentQueue}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                        <p className="text-2xl font-bold text-green-600">{doctor.totalAppointments}</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">Avg Wait Time</p>
                        <p className="text-2xl font-bold text-yellow-600">{doctor.avgWaitTime}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">Completion</p>
                        <p className="text-2xl font-bold text-purple-600">{Math.round(completionPercentage)}%</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Daily Progress</span>
                        <span className="text-sm text-gray-600">{Math.round(completionPercentage)}% Complete</span>
                      </div>
                      <Progress value={completionPercentage} className="h-2" />
                    </div>

                    {/* Patient List */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Current Patients ({doctor.patients.length})</h4>
                      <div className="space-y-3">
                        {doctor.patients.slice(0, 5).map((patient, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-sm font-medium">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{patient.name}</p>
                                <p className="text-sm text-gray-600">Appointment: {patient.appointmentTime}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(patient.status)}>
                                {getStatusText(patient.status)}
                              </Badge>
                              <p className="text-sm text-gray-600 mt-1">Wait: {patient.estimatedWait}</p>
                            </div>
                          </div>
                        ))}
                        {doctor.patients.length > 5 && (
                          <div className="text-center pt-2">
                            <Button variant="outline" size="sm">
                              View All {doctor.patients.length} Patients
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-6">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Clock className="h-4 w-4 mr-2" />
                        Update Queue
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Appointments
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Doctor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;
