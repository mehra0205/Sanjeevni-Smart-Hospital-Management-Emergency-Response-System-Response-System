
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Emergency = () => {
  const nearestHospitals = [
    { name: "City General Hospital", distance: "2.3 km", address: "123 Oak Ave, Metropolis", contact: "(555) 123-4567" },
    { name: "County Medical Center", distance: "4.1 km", address: "456 Pine Ln, Suburbia", contact: "(555) 234-5678" },
    { name: "St. Luke's Clinic", distance: "5.5 km", address: "789 Elm St, Downtown", contact: "(555) 345-6789" },
    { name: "Community Health Center", distance: "6.8 km", address: "101 Maple Dr, Uptown", contact: "(555) 456-7890" },
    { name: "University Teaching Hospital", distance: "8.0 km", address: "202 Birch Blvd, Campus Area", contact: "(555) 567-8901" },
    { name: "Emergency Care Unit", distance: "9.2 km", address: "303 Cedar Rd, Industrial Park", contact: "(555) 678-9012" },
    { name: "Children's Hospital", distance: "10.5 km", address: "404 Spruce Ct, Residential Area", contact: "(555) 789-0123" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SH</span>
            </div>
            <span className="text-xl font-bold">Sanjeevni Healthcare</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">Emergency Hotline: 911</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Request */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center space-x-2">
                <span>🚨</span>
                <span>Request Emergency Assistance</span>
              </CardTitle>
              <CardDescription className="text-gray-300">
                Tap the button below to request an ambulance to your current location.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Location</label>
                <Input 
                  placeholder="Detecting location..." 
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold">
                🚑 Request Ambulance Now
              </Button>
              
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  For life-threatening emergencies, call <strong className="text-red-400">911</strong> immediately
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Nearest Hospitals */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center space-x-2">
                <span>🏥</span>
                <span>Nearest Hospitals</span>
              </CardTitle>
              <CardDescription className="text-gray-300">
                List of hospitals near your current location.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {nearestHospitals.map((hospital, index) => (
                  <div key={index} className="flex justify-between items-start p-4 bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{hospital.name}</h3>
                      <p className="text-sm text-gray-300">{hospital.distance} - {hospital.address}</p>
                      <p className="text-sm text-blue-400">{hospital.contact}</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-600">
                      Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Instructions */}
        <Card className="mt-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-400">⚠️ Emergency Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-white mb-2">🆘 Life-Threatening Emergency</h3>
                <p className="text-gray-300 text-sm">Call 911 immediately for:</p>
                <ul className="text-gray-400 text-sm mt-2 space-y-1">
                  <li>• Chest pain or heart attack</li>
                  <li>• Difficulty breathing</li>
                  <li>• Severe bleeding</li>
                  <li>• Loss of consciousness</li>
                  <li>• Severe allergic reactions</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-2">🏥 Urgent Care</h3>
                <p className="text-gray-300 text-sm">Visit nearest hospital for:</p>
                <ul className="text-gray-400 text-sm mt-2 space-y-1">
                  <li>• High fever</li>
                  <li>• Severe pain</li>
                  <li>• Deep cuts requiring stitches</li>
                  <li>• Suspected fractures</li>
                  <li>• Persistent vomiting</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-2">📞 Non-Emergency</h3>
                <p className="text-gray-300 text-sm">Contact your doctor for:</p>
                <ul className="text-gray-400 text-sm mt-2 space-y-1">
                  <li>• Minor injuries</li>
                  <li>• Mild symptoms</li>
                  <li>• Prescription refills</li>
                  <li>• Routine concerns</li>
                  <li>• Follow-up questions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Emergency;
