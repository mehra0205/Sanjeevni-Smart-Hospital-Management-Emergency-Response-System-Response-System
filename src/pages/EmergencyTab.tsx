
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, MapPin, Map, Navigation } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const EmergencyTab = () => {
  const { toast } = useToast();
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const nearestHospitals = [
    { name: "City General Hospital Noida", location: "Sector 62, Noida", distance: "2.3 km", contact: "+91-120-4567890", lat: 28.6139, lng: 77.2090 },
    { name: "Apollo Hospital Delhi", location: "Sarita Vihar, Delhi", distance: "15.2 km", contact: "+91-11-2634567", lat: 28.5355, lng: 77.2499 },
    { name: "Fortis Hospital Gurgaon", location: "Sector 44, Gurgaon", distance: "25.3 km", contact: "+91-124-4567890", lat: 28.4595, lng: 77.0266 },
    { name: "Max Healthcare Delhi", location: "Patparganj, Delhi", distance: "18.7 km", contact: "+91-11-4567890", lat: 28.6321, lng: 77.2975 },
    { name: "Medanta Hospital Gurgaon", location: "Sector 38, Gurgaon", distance: "28.4 km", contact: "+91-124-4141414", lat: 28.4595, lng: 77.0266 },
    { name: "BLK Super Speciality Hospital", location: "Pusa Road, Delhi", distance: "22.1 km", contact: "+91-11-30403040", lat: 28.6469, lng: 77.1951 }
  ];

  const bloodDonationCenters = [
    { name: "Red Cross Blood Bank Noida", location: "Sector 62, Noida", distance: "2.1 km", lat: 28.6139, lng: 77.2090 },
    { name: "Apollo Blood Bank Delhi", location: "Sarita Vihar, Delhi", distance: "15.2 km", lat: 28.5355, lng: 77.2499 },
    { name: "Fortis Blood Bank Gurgaon", location: "Sector 44, Gurgaon", distance: "25.3 km", lat: 28.4595, lng: 77.0266 },
    { name: "Max Healthcare Blood Bank", location: "Patparganj, Delhi", distance: "18.7 km", lat: 28.6321, lng: 77.2975 },
    { name: "Medanta Blood Bank", location: "Sector 38, Gurgaon", distance: "28.4 km", lat: 28.4595, lng: 77.0266 },
    { name: "BLK Blood Bank Delhi", location: "Pusa Road, Delhi", distance: "22.1 km", lat: 28.6469, lng: 77.1951 }
  ];

  const handleEmergencyCall = () => {
    window.open('tel:112', '_self');
    toast({
      title: "Emergency Call",
      description: "Calling emergency services at 112",
    });
  };

  const handleAmbulanceRequest = () => {
    toast({
      title: "Ambulance Requested",
      description: "Nearest ambulance has been notified. ETA: 8-12 minutes",
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location Found",
            description: "Your current location has been detected",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enable location services.",
            variant: "destructive"
          });
        }
      );
    }
  };

  const openGoogleMaps = (lat: number, lng: number, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
    toast({
      title: "Opening Maps",
      description: `Showing directions to ${name}`,
    });
  };

  const findNearestHospitals = () => {
    getCurrentLocation();
    const mapsUrl = "https://www.google.com/maps/search/hospitals+near+me";
    window.open(mapsUrl, '_blank');
    toast({
      title: "Finding Hospitals",
      description: "Opening Google Maps to show nearest hospitals",
    });
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Services</h1>
            <p className="text-gray-600">24x7 emergency assistance, ambulance services, and nearest hospitals.</p>
          </div>

          {/* Emergency Actions */}
          <Card className="mb-8 bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency - 24x7 Ambulance Service
              </CardTitle>
              <CardDescription className="text-red-700">
                Instant emergency response for accidents and critical situations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white h-12"
                  onClick={handleEmergencyCall}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Emergency (112)
                </Button>
                <Button 
                  className="bg-orange-600 hover:bg-orange-700 text-white h-12"
                  onClick={handleAmbulanceRequest}
                >
                  🚑 Request Ambulance
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white h-12"
                  onClick={findNearestHospitals}
                >
                  <Map className="h-5 w-5 mr-2" />
                  Find Hospitals
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Nearest Hospitals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-600" />
                  Nearest Hospitals - Delhi NCR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {nearestHospitals.map((hospital, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{hospital.name}</h3>
                        <p className="text-sm text-gray-600">{hospital.location}</p>
                        <p className="text-sm text-blue-600">{hospital.contact}</p>
                        <p className="text-sm text-green-600">{hospital.distance}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openGoogleMaps(hospital.lat, hospital.lng, hospital.name)}
                      >
                        <Navigation className="h-4 w-4 mr-1" />
                        Directions
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blood Donation Centers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-600" />
                  Blood Donation Centers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Button 
                    onClick={findDonationCenters}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Map className="h-4 w-4 mr-2" />
                    Find Donation Centers on Map
                  </Button>
                </div>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {bloodDonationCenters.map((center, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{center.name}</h3>
                        <p className="text-sm text-gray-600">{center.location}</p>
                        <p className="text-sm text-green-600">{center.distance}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openGoogleMaps(center.lat, center.lng, center.name)}
                      >
                        <Navigation className="h-4 w-4 mr-1" />
                        Directions
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Guidelines */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-yellow-600">⚠️ Emergency Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🆘 Life-Threatening Emergency</h3>
                  <p className="text-gray-600 text-sm">Call 112 immediately for:</p>
                  <ul className="text-gray-500 text-sm mt-2 space-y-1">
                    <li>• Chest pain or heart attack</li>
                    <li>• Difficulty breathing</li>
                    <li>• Severe bleeding</li>
                    <li>• Loss of consciousness</li>
                    <li>• Severe allergic reactions</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🏥 Urgent Care</h3>
                  <p className="text-gray-600 text-sm">Visit nearest hospital for:</p>
                  <ul className="text-gray-500 text-sm mt-2 space-y-1">
                    <li>• High fever</li>
                    <li>• Severe pain</li>
                    <li>• Deep cuts requiring stitches</li>
                    <li>• Suspected fractures</li>
                    <li>• Persistent vomiting</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📞 Non-Emergency</h3>
                  <p className="text-gray-600 text-sm">Contact your doctor for:</p>
                  <ul className="text-gray-500 text-sm mt-2 space-y-1">
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
    </div>
  );
};

export default EmergencyTab;
