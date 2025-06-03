
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Users, MapPin, Phone, Star, Calendar, AlertCircle } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

const Queue = () => {
  const [appointmentData, setAppointmentData] = useState<any[]>([]);

  // Doctors data from appointments section with Indian names
  const doctorsDatabase = {
    "Cardiology": [
      { name: "Dr. Rajesh Kumar", experience: "15 years", rating: 4.8 },
      { name: "Dr. Priya Sharma", experience: "12 years", rating: 4.7 },
      { name: "Dr. Amit Patel", experience: "18 years", rating: 4.9 }
    ],
    "Dermatology": [
      { name: "Dr. Sunita Singh", experience: "10 years", rating: 4.6 },
      { name: "Dr. Vikram Mehta", experience: "14 years", rating: 4.8 },
      { name: "Dr. Kavya Reddy", experience: "8 years", rating: 4.5 }
    ],
    "Emergency Medicine": [
      { name: "Dr. Arjun Nair", experience: "20 years", rating: 4.9 },
      { name: "Dr. Meera Joshi", experience: "16 years", rating: 4.7 },
      { name: "Dr. Ravi Gupta", experience: "22 years", rating: 4.8 }
    ],
    "Family Medicine": [
      { name: "Dr. Sanjay Verma", experience: "13 years", rating: 4.6 },
      { name: "Dr. Anjali Kapoor", experience: "11 years", rating: 4.7 },
      { name: "Dr. Rohit Agarwal", experience: "9 years", rating: 4.5 }
    ],
    "Gastroenterology": [
      { name: "Dr. Deepak Rao", experience: "17 years", rating: 4.8 },
      { name: "Dr. Neha Bansal", experience: "12 years", rating: 4.6 },
      { name: "Dr. Kiran Kumar", experience: "19 years", rating: 4.9 }
    ],
    "General Surgery": [
      { name: "Dr. Manoj Tiwari", experience: "21 years", rating: 4.9 },
      { name: "Dr. Rekha Pillai", experience: "15 years", rating: 4.7 },
      { name: "Dr. Ashok Malhotra", experience: "25 years", rating: 4.8 }
    ],
    "Gynecology": [
      { name: "Dr. Shweta Agarwal", experience: "14 years", rating: 4.8 },
      { name: "Dr. Ritu Krishnan", experience: "16 years", rating: 4.7 },
      { name: "Dr. Madhuri Shah", experience: "12 years", rating: 4.6 }
    ],
    "Internal Medicine": [
      { name: "Dr. Suresh Menon", experience: "18 years", rating: 4.8 },
      { name: "Dr. Pooja Jain", experience: "13 years", rating: 4.6 },
      { name: "Dr. Vinod Saxena", experience: "20 years", rating: 4.9 }
    ],
    "Neurology": [
      { name: "Dr. Raghav Iyer", experience: "22 years", rating: 4.9 },
      { name: "Dr. Smita Desai", experience: "17 years", rating: 4.8 },
      { name: "Dr. Nitin Chandra", experience: "19 years", rating: 4.7 }
    ],
    "Oncology": [
      { name: "Dr. Harish Bhatt", experience: "24 years", rating: 4.9 },
      { name: "Dr. Lakshmi Nair", experience: "18 years", rating: 4.8 },
      { name: "Dr. Siddharth Rao", experience: "16 years", rating: 4.7 }
    ]
  };

  const generatePatientQueue = (doctorName: string, appointmentCount: number) => {
    const indianPatientNames = [
      "Rahul Sharma", "Priya Patel", "Amit Singh", "Sneha Reddy", "Vikash Kumar",
      "Anita Joshi", "Rajesh Gupta", "Kavya Nair", "Suresh Agarwal", "Meera Shah",
      "Arjun Verma", "Deepika Malhotra", "Rohan Kapoor", "Nisha Bansal", "Karan Tiwari"
    ];
    
    const patients = [];
    const currentTime = new Date();
    
    for (let i = 0; i < appointmentCount; i++) {
      const appointmentTime = new Date(currentTime.getTime() + i * 15 * 60000);
      const timeString = appointmentTime.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });
      
      let status = 'scheduled';
      let estimatedWait = `${i * 15} min`;
      
      if (i === 0) {
        status = 'in-progress';
        estimatedWait = '0 min';
      } else if (i === 1) {
        status = 'waiting';
        estimatedWait = '15 min';
      }
      
      patients.push({
        name: indianPatientNames[i % indianPatientNames.length],
        appointmentTime: timeString,
        status,
        estimatedWait
      });
    }
    
    return patients;
  };

  useEffect(() => {
    // Get appointments from localStorage
    const appointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');
    
    // Group appointments by doctor and create queue data
    const doctorAppointments: any = {};
    
    appointments.forEach((appointment: any) => {
      const doctorName = appointment.doctorName;
      if (!doctorAppointments[doctorName]) {
        doctorAppointments[doctorName] = {
          doctor: appointment.doctorName,
          department: appointment.department,
          appointments: []
        };
      }
      doctorAppointments[doctorName].appointments.push(appointment);
    });

    // Create queue data for doctors with appointments
    const queueData: any[] = [];
    let idCounter = 1;

    Object.keys(doctorAppointments).forEach(doctorName => {
      const doctorInfo = doctorAppointments[doctorName];
      const department = doctorInfo.department as keyof typeof doctorsDatabase;
      const doctorDetails = doctorsDatabase[department]?.find(doc => doc.name === doctorName);
      
      if (doctorDetails) {
        const appointmentCount = Math.max(doctorInfo.appointments.length, 3) + Math.floor(Math.random() * 5);
        const currentQueue = Math.floor(appointmentCount * 0.6);
        
        queueData.push({
          id: idCounter++,
          doctorName: doctorDetails.name,
          specialty: department,
          currentQueue,
          totalAppointments: appointmentCount,
          avgWaitTime: `${15 + Math.floor(Math.random() * 20)} min`,
          nextAvailable: new Date(Date.now() + (currentQueue * 15 * 60000)).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
          }),
          patients: generatePatientQueue(doctorDetails.name, appointmentCount),
          rating: doctorDetails.rating,
          location: `Room ${100 + idCounter}, ${department} Department`,
          phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          experience: doctorDetails.experience
        });
      }
    });

    // If no appointments, show some default doctors with Indian names
    if (queueData.length === 0) {
      const defaultDoctors = [
        { name: "Dr. Rajesh Kumar", department: "Cardiology" },
        { name: "Dr. Priya Sharma", department: "Dermatology" },
        { name: "Dr. Amit Patel", department: "General Surgery" }
      ];

      defaultDoctors.forEach((doctor, index) => {
        const department = doctor.department as keyof typeof doctorsDatabase;
        const doctorDetails = doctorsDatabase[department]?.find(doc => doc.name === doctor.name);
        
        if (doctorDetails) {
          const appointmentCount = 8 + Math.floor(Math.random() * 7);
          const currentQueue = Math.floor(appointmentCount * 0.6);
          
          queueData.push({
            id: index + 1,
            doctorName: doctorDetails.name,
            specialty: department,
            currentQueue,
            totalAppointments: appointmentCount,
            avgWaitTime: `${15 + Math.floor(Math.random() * 20)} min`,
            nextAvailable: new Date(Date.now() + (currentQueue * 15 * 60000)).toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit', 
              hour12: true 
            }),
            patients: generatePatientQueue(doctorDetails.name, appointmentCount),
            rating: doctorDetails.rating,
            location: `Room ${200 + index + 1}, ${department} Department`,
            phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            experience: doctorDetails.experience
          });
        }
      });
    }

    setAppointmentData(queueData);
  }, []);

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
                    <p className="text-2xl font-bold text-gray-900">{appointmentData.length}</p>
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
                      {appointmentData.reduce((sum, doctor) => sum + doctor.currentQueue, 0)}
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
                    <p className="text-2xl font-bold text-gray-900">
                      {appointmentData.length > 0 
                        ? Math.round(appointmentData.reduce((sum, doctor) => 
                            sum + parseInt(doctor.avgWaitTime), 0) / appointmentData.length) + ' min'
                        : '0 min'
                      }
                    </p>
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
                      {appointmentData.reduce((sum, doctor) => sum + doctor.totalAppointments, 0)}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Doctor Queue Cards */}
          <div className="space-y-6">
            {appointmentData.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500 text-lg">No appointments booked yet.</p>
                  <p className="text-gray-400">Book an appointment to see queue management.</p>
                </CardContent>
              </Card>
            ) : (
              appointmentData.map((doctor) => {
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
                              {doctor.doctorName.split(' ').map((n: string) => n[0]).join('')}
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
                          {doctor.patients.slice(0, 5).map((patient: any, index: number) => (
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
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;
