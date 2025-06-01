
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Sidebar from "@/components/Sidebar";

const Records = () => {
  const medicalHistory = [
    { condition: "Hypertension", date: "2023-01-15", doctor: "Dr. Smith" },
    { condition: "Type 2 Diabetes", date: "2022-08-22", doctor: "Dr. Johnson" },
    { condition: "Seasonal Allergies", date: "2022-03-10", doctor: "Dr. Brown" }
  ];

  const prescriptions = [
    { medication: "Lisinopril 10mg", prescribed: "2023-10-15", doctor: "Dr. Smith" },
    { medication: "Metformin 500mg", prescribed: "2023-09-20", doctor: "Dr. Johnson" },
    { medication: "Cetirizine 10mg", prescribed: "2023-07-05", doctor: "Dr. Brown" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Records</h1>
              <p className="text-gray-600">View and manage your personal medical history, prescriptions, lab reports, and visit logs.</p>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              + Upload Document
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Medical History */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="conditions">
                      <AccordionTrigger>Medical Conditions</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {medicalHistory.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium">{item.condition}</p>
                                <p className="text-sm text-gray-600">Diagnosed: {item.date}</p>
                              </div>
                              <p className="text-sm text-gray-600">{item.doctor}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="allergies">
                      <AccordionTrigger>Allergies</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                            <p className="font-medium text-red-800">Penicillin</p>
                            <p className="text-sm text-red-600">Severe reaction - avoid all penicillin-based antibiotics</p>
                          </div>
                          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="font-medium text-yellow-800">Pollen</p>
                            <p className="text-sm text-yellow-600">Seasonal allergic rhinitis</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="surgeries">
                      <AccordionTrigger>Surgical History</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="font-medium">Appendectomy</p>
                            <p className="text-sm text-gray-600">March 2019 - City General Hospital</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Prescriptions</CardTitle>
                    <Button variant="outline" size="sm">+ Request Refill</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prescriptions.map((prescription, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{prescription.medication}</p>
                          <p className="text-sm text-gray-600">Prescribed by {prescription.doctor}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{prescription.prescribed}</p>
                          <Button variant="outline" size="sm" className="mt-1">Refill</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">Download Complete Records</Button>
                  <Button className="w-full" variant="outline">Share with Doctor</Button>
                  <Button className="w-full" variant="outline">Request Lab Results</Button>
                  <Button className="w-full" variant="outline">Update Emergency Contacts</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Records;
