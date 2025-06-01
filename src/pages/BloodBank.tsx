
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Sidebar";

const BloodBank = () => {
  const bloodAvailability = [
    { type: "A+", hospital: "City General Hospital", quantity: 45, status: "High" },
    { type: "O-", hospital: "District Emergency Center", quantity: 8, status: "Low" },
    { type: "B+", hospital: "City General Hospital", quantity: 22, status: "Medium" },
    { type: "AB+", hospital: "Central Blood Bank", quantity: 15, status: "Medium" },
    { type: "A-", hospital: "District Emergency Center", quantity: 3, status: "Critical" },
    { type: "O+", hospital: "Central Blood Bank", quantity: 60, status: "High" }
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
            <Button className="bg-indigo-600 hover:bg-indigo-700">
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
                  <CardTitle>Detailed Availability by Hospital & Type</CardTitle>
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
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Request Blood Unit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type Needed</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a-positive">A+</SelectItem>
                        <SelectItem value="a-negative">A-</SelectItem>
                        <SelectItem value="b-positive">B+</SelectItem>
                        <SelectItem value="b-negative">B-</SelectItem>
                        <SelectItem value="ab-positive">AB+</SelectItem>
                        <SelectItem value="ab-negative">AB-</SelectItem>
                        <SelectItem value="o-positive">O+</SelectItem>
                        <SelectItem value="o-negative">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Units)</label>
                    <Input type="number" placeholder="1" min="1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Hospital/Location</label>
                    <Input placeholder="e.g., City General Hospital" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Details (Optional)</label>
                    <Input placeholder="e.g., Patient Name, Ward Number" />
                  </div>

                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Submit Request
                  </Button>
                </CardContent>
              </Card>

              {/* Donation Card */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Become a Lifesaver: Donate Blood Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Your single donation can save up to three lives. Find out how you can donate blood at a center near you or during an upcoming blood drive.</p>
                  <Button className="w-full" variant="outline">
                    Find Donation Centers
                  </Button>
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
