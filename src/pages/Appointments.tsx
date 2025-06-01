
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

const Appointments = () => {
  const [date, setDate] = useState<Date>();
  
  const doctors = [
    {
      name: "Dr. Elara Vance",
      specialty: "Cardiology",
      avatar: "/placeholder.svg",
      availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM"]
    },
    {
      name: "Dr. Kaelen Rhys",
      specialty: "Neurology",
      avatar: "/placeholder.svg",
      availableSlots: ["01:00 PM", "02:00 PM", "03:00 PM"]
    },
    {
      name: "Dr. Seraphina Cai",
      specialty: "Pediatrics",
      avatar: "/placeholder.svg",
      availableSlots: ["10:00 AM", "11:00 AM", "02:00 PM"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
            <p className="text-gray-600">Find and book appointments with healthcare professionals.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filters and Booking */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Filter Doctors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="general">General Practice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specialist</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialist" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Specialist</SelectItem>
                          <SelectItem value="senior">Senior Doctor</SelectItem>
                          <SelectItem value="consultant">Consultant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
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
                      />
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Doctors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {doctors.map((doctor, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">{doctor.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{doctor.name}</h3>
                            <p className="text-gray-600">{doctor.specialty}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Available Slots:</p>
                          <div className="grid grid-cols-3 gap-2">
                            {doctor.availableSlots.map((slot, slotIndex) => (
                              <Button key={slotIndex} variant="outline" size="sm" className="text-xs">
                                {slot}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-gray-600 text-sm">Select a slot from the left to review your appointment.</p>
                    </div>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700" disabled>
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
