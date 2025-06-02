
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const BloodBank = () => {
  const [bloodType, setBloodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [hospital, setHospital] = useState("");
  const [patientDetails, setPatientDetails] = useState("");
  const { toast } = useToast();

  const bloodBanks = [
    { name: "Red Cross Blood Bank Noida", location: "Sector 62, Noida", distance: "2.1 km", contact: "+91-120-4567890" },
    { name: "Apollo Blood Bank Delhi", location: "Sarita Vihar, Delhi", distance: "15.2 km", contact: "+91-11-2634567" },
    { name: "Fortis Blood Bank Gurgaon", location: "Sector 44, Gurgaon", distance: "25.3 km", contact: "+91-124-4567890" },
    { name: "Max Healthcare Blood Bank", location: "Patparganj, Delhi", distance: "18.7 km", contact: "+91-11-4567890" },
    { name: "Medanta Blood Bank", location: "Sector 38, Gurgaon", distance: "28.4 km", contact: "+91-124-4141414" },
    { name: "BLK Blood Bank Delhi", location: "Pusa Road, Delhi", distance: "22.1 km", contact: "+91-11-30403040" }
  ];

  const bloodAvailability = [
    { type: "A+", hospital: "Red Cross Blood Bank Noida", quantity: 45, status: "High" },
    { type: "O-", hospital: "Apollo Blood Bank Delhi", quantity: 8, status: "Low" },
    { type: "B+", hospital: "Fortis Blood Bank Gurgaon", quantity: 22, status: "Medium" },
    { type: "AB+", hospital: "Max Healthcare Blood Bank", quantity: 15, status: "Medium" },
    { type: "A-", hospital: "Medanta Blood Bank", quantity: 3, status: "Critical" },
    { type: "O+", hospital: "BLK Blood Bank Delhi", quantity: 60, status: "High" }
  ];

  const recentRequests = [
    { type: "A-", requester: "Patient R. Sharma", date: "2023-10-26", status: "Pending" },
    { type: "O-", requester: "Patient J. Khan", date: "2023-10-24", status: "Fulfilled" },
    { type: "B+", requester: "Patient A. Singh", date: "2023-10-20", status: "Pending" },
    { type: "AB+", requester: "Patient S. Reddy", date: "2023-10-18", status: "Fulfilled" },
    { type: "A+", requester: "Patient P. Gupta", date: "2023-10-16", status: "Pending" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "High": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-orange-100 text-orange-800";
      case "Critical": return "bg-red-100 text-red-800";
      case "Fulfilled": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSubmitRequest = () => {
    if (!bloodType || !quantity) {
      toast({
        title: "Missing Information",
        description: "Please select blood type and quantity.",
        variant: "destructive"
      });
      return;
    }

    // Store the request in localStorage
    const newRequest = {
      id: Date.now().toString(),
      bloodType,
      quantity: parseInt(quantity),
      hospital: hospital || "Any Available",
      patientDetails: patientDetails || "Not specified",
      status: "Pending",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    const existingRequests = JSON.parse(localStorage.getItem('bloodRequests') || '[]');
    existingRequests.unshift(newRequest);
    localStorage.setItem('bloodRequests', JSON.stringify(existingRequests));

    // Add notification
    const notification = {
      type: 'blood',
      message: `Blood request submitted: ${quantity} units of ${bloodType}`,
      time: new Date().toLocaleTimeString(),
      timestamp: Date.now(),
      details: `Hospital: ${hospital || 'Any Available'}, Patient: ${patientDetails || 'Not specified'}`
    };

    const existingNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    existingNotifications.unshift(notification);
    localStorage.setItem('userNotifications', JSON.stringify(existingNotifications.slice(0, 10)));

    toast({
      title: "Blood Request Submitted",
      description: `Request for ${quantity} units of ${bloodType} has been submitted successfully.`,
    });

    // Clear form
    setBloodType("");
    setQuantity("");
    setHospital("");
    setPatientDetails("");
  };

  const handleRequestBlood = () => {
    const element = document.querySelector('.request-section') as HTMLElement;
    window.scrollTo({ top: element?.offsetTop || 0, behavior: 'smooth' });
  };

  const findDonationCenters = () => {
    const mapsUrl = "https://www.google.com/maps/search/blood+donation+centers+near+me";
    window.open(mapsUrl, '_blank');
    toast({
      title: "Finding Donation Centers",
      description: "Opening Google Maps to show blood donation centers",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Blood Bank Management</h1>
              <p className="text-gray-600">Check blood availability and manage requests across our network.</p>
            </div>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={handleRequestBlood}
            >
              Request Blood
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 mr-4">
                    <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">258</p>
                    <p className="text-sm text-gray-600">Total Units Available</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 mr-4">
                    <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-sm text-gray-600">Urgent Needs (Critical/Low)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 mr-4">
                    <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-gray-600">Hospitals Covered</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-orange-100 mr-4">
                    <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-gray-600">Recent Requests (Pending)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blood Availability */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Availability - Delhi NCR Region</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bloodAvailability.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-red-600">{item.type}</span>
                          </div>
                          <div>
                            <p className="font-medium">{item.hospital}</p>
                            <p className="text-sm text-gray-600">{item.quantity} units available</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Blood Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRequests.map((request, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{request.type} requested by {request.requester}</p>
                          <p className="text-sm text-gray-600">on {request.date}</p>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Request Form */}
            <div>
              <Card className="sticky top-8 request-section">
                <CardHeader>
                  <CardTitle>Request Blood Unit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type Needed</label>
                    <Select value={bloodType} onValueChange={setBloodType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Units)</label>
                    <Input 
                      type="number" 
                      placeholder="1" 
                      min="1" 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Hospital/Blood Bank</label>
                    <Select value={hospital} onValueChange={setHospital}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hospital or blood bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodBanks.map((bank, index) => (
                          <SelectItem key={index} value={bank.name}>
                            {bank.name} - {bank.distance}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Details (Optional)</label>
                    <Input 
                      placeholder="e.g., Patient Name, Ward Number" 
                      value={patientDetails}
                      onChange={(e) => setPatientDetails(e.target.value)}
                    />
                  </div>

                  <Button 
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    onClick={handleSubmitRequest}
                  >
                    Submit Request
                  </Button>
                </CardContent>
              </Card>

              {/* Fixed Donation Card */}
              <Card className="mt-6 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-700">💝 Become a Lifesaver: Donate Blood Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-red-600 font-medium">Your single donation can save up to three lives!</p>
                    <div className="bg-white p-3 rounded-lg border border-red-200">
                      <p className="text-xs text-gray-600 mb-2">Donation Centers Near You:</p>
                      <div className="space-y-1">
                        {bloodBanks.slice(0, 3).map((bank, index) => (
                          <div key={index} className="text-xs text-gray-700 flex justify-between">
                            <span>{bank.name}</span>
                            <span className="text-green-600">{bank.distance}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={findDonationCenters}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Find Donation Centers
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

export default BloodBank;
