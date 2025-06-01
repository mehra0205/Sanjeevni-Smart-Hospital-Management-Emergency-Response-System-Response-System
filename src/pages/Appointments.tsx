import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, User, MapPin } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/Sidebar";
import { useToast } from "@/hooks/use-toast";

const Appointments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const departments = [
    "Cardiology", "Dermatology", "Emergency Medicine", "Family Medicine", "Gastroenterology",
    "General Surgery", "Gynecology", "Internal Medicine", "Neurology", "Oncology",
    "Ophthalmology", "Orthopedics", "Pediatrics", "Psychiatry", "Pulmonology",
    "Radiology", "Rheumatology", "Urology", "ENT (Ear, Nose, Throat)", "Endocrinology"
  ];

  const doctors = {
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

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM"
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmAppointment = () => {
    const appointment = {
      department: selectedDepartment,
      doctorName: selectedDoctor,
      date: format(selectedDate!, "PPP"),
      time: selectedTime,
      status: "Confirmed"
    };

    // Save to localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');
    existingAppointments.push(appointment);
    localStorage.setItem('userAppointments', JSON.stringify(existingAppointments));

    // Add notification
    const notification = {
      message: `Appointment booked with ${selectedDoctor} on ${format(selectedDate!, "PPP")} at ${selectedTime}`,
      time: "Just now",
      type: "appointment"
    };
    
    const existingNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    existingNotifications.unshift(notification);
    localStorage.setItem('userNotifications', JSON.stringify(existingNotifications));

    toast({
      title: "Appointment Confirmed!",
      description: `Your appointment with ${selectedDoctor} has been scheduled for ${format(selectedDate!, "PPP")} at ${selectedTime}.`,
    });

    // Reset form
    setSelectedDepartment("");
    setSelectedSpecialist("");
    setSelectedDate(undefined);
    setSelectedDoctor("");
    setSelectedTime("");
    setCurrentStep(1);
  };

  const getAvailableDoctors = () => {
    return doctors[selectedDepartment as keyof typeof doctors] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
            <p className="text-gray-600">Schedule your appointment with our expert doctors.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Appointment Booking - Step {currentStep} of 5</CardTitle>
              <CardDescription>Please follow the steps to complete your appointment booking.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Select Department */}
              {currentStep === 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Department</h3>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a medical department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Step 2: Select Specialist Type */}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Specialist</h3>
                  <p className="text-sm text-gray-600 mb-4">Department: {selectedDepartment}</p>
                  <Select value={selectedSpecialist} onValueChange={setSelectedSpecialist}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose specialist type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="senior">Senior Specialist</SelectItem>
                      <SelectItem value="consultant">Consultant</SelectItem>
                      <SelectItem value="resident">Resident Doctor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Step 3: Select Date */}
              {currentStep === 3 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                  <p className="text-sm text-gray-600 mb-4">Specialist: {selectedSpecialist} in {selectedDepartment}</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {/* Step 4: Select Doctor */}
              {currentStep === 4 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Available Doctors</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedSpecialist} in {selectedDepartment} on {selectedDate && format(selectedDate, "PPP")}
                  </p>
                  <div className="grid gap-4">
                    {getAvailableDoctors().map((doctor, index) => (
                      <div
                        key={index}
                        className={cn(
                          "p-4 border rounded-lg cursor-pointer transition-colors",
                          selectedDoctor === doctor.name
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                        onClick={() => setSelectedDoctor(doctor.name)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{doctor.name}</h4>
                            <p className="text-sm text-gray-600">Experience: {doctor.experience}</p>
                            <p className="text-sm text-gray-600">Rating: ⭐ {doctor.rating}/5</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-600">Available</p>
                            <p className="text-xs text-gray-500">Multiple slots</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Select Time */}
              {currentStep === 5 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Time Slot</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedDoctor} on {selectedDate && format(selectedDate, "PPP")}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="h-12"
                        onClick={() => setSelectedTime(time)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                
                {currentStep < 5 ? (
                  <Button
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && !selectedDepartment) ||
                      (currentStep === 2 && !selectedSpecialist) ||
                      (currentStep === 3 && !selectedDate) ||
                      (currentStep === 4 && !selectedDoctor)
                    }
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleConfirmAppointment}
                    disabled={!selectedTime}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Confirm Appointment
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
