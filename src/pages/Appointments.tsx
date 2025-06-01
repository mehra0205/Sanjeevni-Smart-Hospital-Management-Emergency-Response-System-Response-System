
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useToast } from "@/hooks/use-toast";

const Appointments = () => {
  const [date, setDate] = useState<Date>();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const { toast } = useToast();

  const departments = [
    "Cardiology", "Neurology", "Pediatrics", "General Practice", "Orthopedics",
    "Dermatology", "Gynecology", "Ophthalmology", "ENT", "Psychiatry",
    "Pulmonology", "Gastroenterology", "Endocrinology", "Nephrology", "Oncology",
    "Anesthesiology", "Radiology", "Pathology", "Emergency Medicine", "Internal Medicine"
  ];

  const specialists = ["Any Specialist", "Senior Doctor", "Consultant", "Chief Consultant", "Director"];

  const doctors = [
    {
      name: "Rajesh Kumar Sharma",
      department: "Cardiology",
      specialist: "Senior Doctor",
      experience: "15 years",
      availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM"],
      education: "MBBS, MD Cardiology"
    },
    {
      name: "Priya Devi Gupta",
      department: "Pediatrics",
      specialist: "Consultant",
      experience: "12 years",
      availableSlots: ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
      education: "MBBS, MD Pediatrics"
    },
    {
      name: "Amit Singh Verma",
      department: "Neurology",
      specialist: "Chief Consultant",
      experience: "20 years",
      availableSlots: ["09:00 AM", "01:00 PM", "02:00 PM", "04:00 PM"],
      education: "MBBS, DM Neurology"
    },
    {
      name: "Sunita Patel",
      department: "Gynecology",
      specialist: "Senior Doctor",
      experience: "18 years",
      availableSlots: ["10:00 AM", "11:00 AM", "03:00 PM", "04:00 PM"],
      education: "MBBS, MS Gynecology"
    },
    {
      name: "Vikram Reddy",
      department: "Orthopedics",
      specialist: "Consultant",
      experience: "14 years",
      availableSlots: ["09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM"],
      education: "MBBS, MS Orthopedics"
    },
    {
      name: "Kavita Joshi",
      department: "Dermatology",
      specialist: "Senior Doctor",
      experience: "10 years",
      availableSlots: ["11:00 AM", "01:00 PM", "02:00 PM", "04:00 PM"],
      education: "MBBS, MD Dermatology"
    },
    {
      name: "Manoj Kumar Agarwal",
      department: "General Practice",
      specialist: "Senior Doctor",
      experience: "22 years",
      availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
      education: "MBBS, MD General Medicine"
    },
    {
      name: "Deepika Nair",
      department: "Ophthalmology",
      specialist: "Consultant",
      experience: "16 years",
      availableSlots: ["10:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"],
      education: "MBBS, MS Ophthalmology"
    }
  ];

  const filterDoctors = () => {
    let filtered = doctors;
    
    if (selectedDepartment) {
      filtered = filtered.filter(doctor => doctor.department === selectedDepartment);
    }
    
    if (selectedSpecialist && selectedSpecialist !== "Any Specialist") {
      filtered = filtered.filter(doctor => doctor.specialist === selectedSpecialist);
    }
    
    setFilteredDoctors(filtered);
  };

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartment(department);
    setSelectedDoctor(null);
    setSelectedSlot("");
  };

  const handleSpecialistChange = (specialist: string) => {
    setSelectedSpecialist(specialist);
    setSelectedDoctor(null);
    setSelectedSlot("");
  };

  const selectDoctor = (doctor: any) => {
    setSelectedDoctor(doctor);
    setSelectedSlot("");
  };

  const selectSlot = (slot: string) => {
    setSelectedSlot(slot);
  };

  const confirmAppointment = () => {
    if (!selectedDoctor || !selectedSlot || !date) {
      toast({
        title: "Incomplete Selection",
        description: "Please select a doctor, time slot, and date.",
        variant: "destructive"
      });
      return;
    }

    const appointment = {
      id: Date.now().toString(),
      doctorName: selectedDoctor.name,
      department: selectedDoctor.department,
      date: format(date, "PPP"),
      time: selectedSlot,
      status: "Confirmed"
    };

    // Save appointment
    const existingAppointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');
    existingAppointments.push(appointment);
    localStorage.setItem('userAppointments', JSON.stringify(existingAppointments));

    // Add notification
    const notification = {
      id: Date.now().toString(),
      message: `Appointment booked with Dr. ${selectedDoctor.name} on ${appointment.date} at ${selectedSlot}`,
      time: "Just now",
      type: "appointment"
    };

    const existingNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    existingNotifications.unshift(notification);
    localStorage.setItem('userNotifications', JSON.stringify(existingNotifications));

    toast({
      title: "Appointment Confirmed!",
      description: `Your appointment with Dr. ${selectedDoctor.name} has been booked for ${appointment.date} at ${selectedSlot}.`,
    });

    // Reset form
    setSelectedDoctor(null);
    setSelectedSlot("");
    setDate(undefined);
    setSelectedDepartment("");
    setSelectedSpecialist("");
    setFilteredDoctors([]);
  };

  // Filter doctors when department or specialist changes
  useState(() => {
    filterDoctors();
  }, [selectedDepartment, selectedSpecialist]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
            <p className="text-gray-600">Find and book appointments with qualified healthcare professionals.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filters and Booking */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Department & Specialist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specialist Level</label>
                      <Select value={selectedSpecialist} onValueChange={handleSpecialistChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialist level" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {specialists.map(specialist => (
                            <SelectItem key={specialist} value={specialist}>{specialist}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={filterDoctors} className="mt-4 bg-indigo-600 hover:bg-indigo-700">
                    Find Doctors
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="pointer-events-auto"
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>

              {/* Available Doctors */}
              {filteredDoctors.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Available Doctors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {filteredDoctors.map((doctor, index) => (
                        <div 
                          key={index} 
                          className={cn(
                            "border rounded-lg p-4 cursor-pointer transition-colors",
                            selectedDoctor?.name === doctor.name ? "border-indigo-500 bg-indigo-50" : "border-gray-200"
                          )}
                          onClick={() => selectDoctor(doctor)}
                        >
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">{doctor.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold">Dr. {doctor.name}</h3>
                              <p className="text-gray-600">{doctor.department} - {doctor.specialist}</p>
                              <p className="text-sm text-gray-500">{doctor.education} | {doctor.experience} experience</p>
                            </div>
                          </div>
                          {selectedDoctor?.name === doctor.name && (
                            <div>
                              <p className="text-sm text-gray-600 mb-2">Available Slots:</p>
                              <div className="grid grid-cols-4 gap-2">
                                {doctor.availableSlots.map((slot, slotIndex) => (
                                  <Button 
                                    key={slotIndex} 
                                    variant={selectedSlot === slot ? "default" : "outline"} 
                                    size="sm" 
                                    className="text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      selectSlot(slot);
                                    }}
                                  >
                                    {slot}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Booking Summary */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                  <CardDescription>Review your appointment details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedDoctor && selectedSlot && date ? (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">Dr. {selectedDoctor.name}</h4>
                        <p className="text-sm text-gray-600">{selectedDoctor.department}</p>
                        <p className="text-sm text-gray-600">{format(date, "PPP")}</p>
                        <p className="text-sm text-gray-600">{selectedSlot}</p>
                        <p className="text-sm font-medium text-indigo-600 mt-2">₹500 Consultation Fee</p>
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-gray-600 text-sm">Select a doctor, date and time slot to review your appointment.</p>
                      </div>
                    )}
                    <Button 
                      className="w-full bg-indigo-600 hover:bg-indigo-700" 
                      disabled={!selectedDoctor || !selectedSlot || !date}
                      onClick={confirmAppointment}
                    >
                      Confirm Appointment
                    </Button>
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

export default Appointments;
