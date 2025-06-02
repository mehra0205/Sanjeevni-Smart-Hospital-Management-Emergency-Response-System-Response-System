
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Plus, Edit, Save, Download, Share, FileText, Users, AlertTriangle } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Records = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState({
    conditions: false,
    allergies: false,
    surgeries: false
  });
  
  const [medicalData, setMedicalData] = useState({
    conditions: [
      { condition: "Hypertension", date: "2023-01-15", doctor: "Dr. Smith" },
      { condition: "Type 2 Diabetes", date: "2022-08-22", doctor: "Dr. Johnson" },
      { condition: "Seasonal Allergies", date: "2022-03-10", doctor: "Dr. Brown" }
    ],
    allergies: [
      { name: "Penicillin", severity: "Severe", reaction: "Severe reaction - avoid all penicillin-based antibiotics" },
      { name: "Pollen", severity: "Mild", reaction: "Seasonal allergic rhinitis" }
    ],
    surgeries: [
      { procedure: "Appendectomy", date: "March 2019", hospital: "City General Hospital", notes: "Routine procedure, no complications" }
    ]
  });

  const [newEntries, setNewEntries] = useState({
    condition: { condition: "", date: "", doctor: "" },
    allergy: { name: "", severity: "", reaction: "" },
    surgery: { procedure: "", date: "", hospital: "", notes: "" }
  });

  const prescriptions = [
    { medication: "Lisinopril 10mg", prescribed: "2023-10-15", doctor: "Dr. Smith" },
    { medication: "Metformin 500mg", prescribed: "2023-09-20", doctor: "Dr. Johnson" },
    { medication: "Cetirizine 10mg", prescribed: "2023-07-05", doctor: "Dr. Brown" }
  ];

  const handleSaveSection = (section: 'conditions' | 'allergies' | 'surgeries') => {
    setIsEditing(prev => ({ ...prev, [section]: false }));
    toast({
      title: "Changes Saved",
      description: `Your ${section} have been updated successfully.`,
    });
  };

  const handleAddNew = (type: 'condition' | 'allergy' | 'surgery') => {
    const entry = newEntries[type];
    
    if (type === 'condition' && entry.condition && entry.date && entry.doctor) {
      setMedicalData(prev => ({
        ...prev,
        conditions: [...prev.conditions, entry as any]
      }));
      setNewEntries(prev => ({
        ...prev,
        condition: { condition: "", date: "", doctor: "" }
      }));
    } else if (type === 'allergy' && entry.name && entry.severity && entry.reaction) {
      setMedicalData(prev => ({
        ...prev,
        allergies: [...prev.allergies, entry as any]
      }));
      setNewEntries(prev => ({
        ...prev,
        allergy: { name: "", severity: "", reaction: "" }
      }));
    } else if (type === 'surgery' && entry.procedure && entry.date && entry.hospital) {
      setMedicalData(prev => ({
        ...prev,
        surgeries: [...prev.surgeries, entry as any]
      }));
      setNewEntries(prev => ({
        ...prev,
        surgery: { procedure: "", date: "", hospital: "", notes: "" }
      }));
    }
    
    toast({
      title: "Entry Added",
      description: `New ${type} has been added to your medical records.`,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Document Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'download':
        toast({
          title: "Download Started",
          description: "Your complete medical records are being prepared for download.",
        });
        break;
      case 'share':
        toast({
          title: "Share with Doctor",
          description: "Medical records sharing interface opened.",
        });
        break;
      case 'lab':
        toast({
          title: "Lab Results Request",
          description: "Request for lab results has been sent to your healthcare provider.",
        });
        break;
      case 'emergency':
        toast({
          title: "Emergency Contacts",
          description: "Emergency contacts update form opened.",
        });
        break;
    }
  };

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
            <div className="flex gap-3">
              <label htmlFor="file-upload">
                <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </span>
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
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
                      <AccordionTrigger>
                        <div className="flex items-center justify-between w-full mr-4">
                          <span>Medical Conditions</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsEditing(prev => ({ ...prev, conditions: !prev.conditions }));
                            }}
                          >
                            {isEditing.conditions ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                          </Button>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {medicalData.conditions.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                {isEditing.conditions ? (
                                  <div className="space-y-2">
                                    <Input 
                                      value={item.condition}
                                      onChange={(e) => {
                                        const newConditions = [...medicalData.conditions];
                                        newConditions[index].condition = e.target.value;
                                        setMedicalData(prev => ({ ...prev, conditions: newConditions }));
                                      }}
                                      placeholder="Condition"
                                    />
                                    <div className="flex gap-2">
                                      <Input 
                                        value={item.date}
                                        onChange={(e) => {
                                          const newConditions = [...medicalData.conditions];
                                          newConditions[index].date = e.target.value;
                                          setMedicalData(prev => ({ ...prev, conditions: newConditions }));
                                        }}
                                        placeholder="Date"
                                      />
                                      <Input 
                                        value={item.doctor}
                                        onChange={(e) => {
                                          const newConditions = [...medicalData.conditions];
                                          newConditions[index].doctor = e.target.value;
                                          setMedicalData(prev => ({ ...prev, conditions: newConditions }));
                                        }}
                                        placeholder="Doctor"
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <p className="font-medium">{item.condition}</p>
                                    <p className="text-sm text-gray-600">Diagnosed: {item.date}</p>
                                  </>
                                )}
                              </div>
                              {!isEditing.conditions && (
                                <p className="text-sm text-gray-600">{item.doctor}</p>
                              )}
                            </div>
                          ))}
                          
                          {isEditing.conditions && (
                            <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
                              <div className="space-y-2">
                                <Input 
                                  value={newEntries.condition.condition}
                                  onChange={(e) => setNewEntries(prev => ({
                                    ...prev,
                                    condition: { ...prev.condition, condition: e.target.value }
                                  }))}
                                  placeholder="New condition"
                                />
                                <div className="flex gap-2">
                                  <Input 
                                    value={newEntries.condition.date}
                                    onChange={(e) => setNewEntries(prev => ({
                                      ...prev,
                                      condition: { ...prev.condition, date: e.target.value }
                                    }))}
                                    placeholder="Date diagnosed"
                                  />
                                  <Input 
                                    value={newEntries.condition.doctor}
                                    onChange={(e) => setNewEntries(prev => ({
                                      ...prev,
                                      condition: { ...prev.condition, doctor: e.target.value }
                                    }))}
                                    placeholder="Doctor name"
                                  />
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleAddNew('condition')}
                                  className="w-full"
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Condition
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          {isEditing.conditions && (
                            <Button 
                              onClick={() => handleSaveSection('conditions')}
                              className="w-full bg-green-600 hover:bg-green-700"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="allergies">
                      <AccordionTrigger>
                        <div className="flex items-center justify-between w-full mr-4">
                          <span>Allergies</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsEditing(prev => ({ ...prev, allergies: !prev.allergies }));
                            }}
                          >
                            {isEditing.allergies ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                          </Button>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {medicalData.allergies.map((allergy, index) => (
                            <div key={index} className={`p-3 rounded-lg border ${allergy.severity === 'Severe' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
                              {isEditing.allergies ? (
                                <div className="space-y-2">
                                  <Input 
                                    value={allergy.name}
                                    onChange={(e) => {
                                      const newAllergies = [...medicalData.allergies];
                                      newAllergies[index].name = e.target.value;
                                      setMedicalData(prev => ({ ...prev, allergies: newAllergies }));
                                    }}
                                    placeholder="Allergy name"
                                  />
                                  <Input 
                                    value={allergy.severity}
                                    onChange={(e) => {
                                      const newAllergies = [...medicalData.allergies];
                                      newAllergies[index].severity = e.target.value;
                                      setMedicalData(prev => ({ ...prev, allergies: newAllergies }));
                                    }}
                                    placeholder="Severity (Mild/Moderate/Severe)"
                                  />
                                  <Textarea 
                                    value={allergy.reaction}
                                    onChange={(e) => {
                                      const newAllergies = [...medicalData.allergies];
                                      newAllergies[index].reaction = e.target.value;
                                      setMedicalData(prev => ({ ...prev, allergies: newAllergies }));
                                    }}
                                    placeholder="Reaction description"
                                  />
                                </div>
                              ) : (
                                <>
                                  <p className={`font-medium ${allergy.severity === 'Severe' ? 'text-red-800' : 'text-yellow-800'}`}>
                                    {allergy.name}
                                  </p>
                                  <p className={`text-sm ${allergy.severity === 'Severe' ? 'text-red-600' : 'text-yellow-600'}`}>
                                    {allergy.reaction}
                                  </p>
                                </>
                              )}
                            </div>
                          ))}
                          
                          {isEditing.allergies && (
                            <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
                              <div className="space-y-2">
                                <Input 
                                  value={newEntries.allergy.name}
                                  onChange={(e) => setNewEntries(prev => ({
                                    ...prev,
                                    allergy: { ...prev.allergy, name: e.target.value }
                                  }))}
                                  placeholder="Allergy name"
                                />
                                <Input 
                                  value={newEntries.allergy.severity}
                                  onChange={(e) => setNewEntries(prev => ({
                                    ...prev,
                                    allergy: { ...prev.allergy, severity: e.target.value }
                                  }))}
                                  placeholder="Severity (Mild/Moderate/Severe)"
                                />
                                <Textarea 
                                  value={newEntries.allergy.reaction}
                                  onChange={(e) => setNewEntries(prev => ({
                                    ...prev,
                                    allergy: { ...prev.allergy, reaction: e.target.value }
                                  }))}
                                  placeholder="Reaction description"
                                />
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleAddNew('allergy')}
                                  className="w-full"
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Allergy
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          {isEditing.allergies && (
                            <Button 
                              onClick={() => handleSaveSection('allergies')}
                              className="w-full bg-green-600 hover:bg-green-700"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="surgeries">
                      <AccordionTrigger>
                        <div className="flex items-center justify-between w-full mr-4">
                          <span>Surgical History</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsEditing(prev => ({ ...prev, surgeries: !prev.surgeries }));
                            }}
                          >
                            {isEditing.surgeries ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                          </Button>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {medicalData.surgeries.map((surgery, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              {isEditing.surgeries ? (
                                <div className="space-y-2">
                                  <Input 
                                    value={surgery.procedure}
                                    onChange={(e) => {
                                      const newSurgeries = [...medicalData.surgeries];
                                      newSurgeries[index].procedure = e.target.value;
                                      setMedicalData(prev => ({ ...prev, surgeries: newSurgeries }));
                                    }}
                                    placeholder="Procedure name"
                                  />
                                  <div className="flex gap-2">
                                    <Input 
                                      value={surgery.date}
                                      onChange={(e) => {
                                        const newSurgeries = [...medicalData.surgeries];
                                        newSurgeries[index].date = e.target.value;
                                        setMedicalData(prev => ({ ...prev, surgeries: newSurgeries }));
                                      }}
                                      placeholder="Date"
                                    />
                                    <Input 
                                      value={surgery.hospital}
                                      onChange={(e) => {
                                        const newSurgeries = [...medicalData.surgeries];
                                        newSurgeries[index].hospital = e.target.value;
                                        setMedicalData(prev => ({ ...prev, surgeries: newSurgeries }));
                                      }}
                                      placeholder="Hospital"
                                    />
                                  </div>
                                  <Textarea 
                                    value={surgery.notes}
                                    onChange={(e) => {
                                      const newSurgeries = [...medicalData.surgeries];
                                      newSurgeries[index].notes = e.target.value;
                                      setMedicalData(prev => ({ ...prev, surgeries: newSurgeries }));
                                    }}
                                    placeholder="Additional notes"
                                  />
                                </div>
                              ) : (
                                <>
                                  <p className="font-medium">{surgery.procedure}</p>
                                  <p className="text-sm text-gray-600">{surgery.date} - {surgery.hospital}</p>
                                  {surgery.notes && (
                                    <p className="text-sm text-gray-500 mt-1">{surgery.notes}</p>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                          
                          {isEditing.surgeries && (
                            <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
                              <div className="space-y-2">
                                <Input 
                                  value={newEntries.surgery.procedure}
                                  onChange={(e) => setNewEntries(prev => ({
                                    ...prev,
                                    surgery: { ...prev.surgery, procedure: e.target.value }
                                  }))}
                                  placeholder="Procedure name"
                                />
                                <div className="flex gap-2">
                                  <Input 
                                    value={newEntries.surgery.date}
                                    onChange={(e) => setNewEntries(prev => ({
                                      ...prev,
                                      surgery: { ...prev.surgery, date: e.target.value }
                                    }))}
                                    placeholder="Date"
                                  />
                                  <Input 
                                    value={newEntries.surgery.hospital}
                                    onChange={(e) => setNewEntries(prev => ({
                                      ...prev,
                                      surgery: { ...prev.surgery, hospital: e.target.value }
                                    }))}
                                    placeholder="Hospital"
                                  />
                                </div>
                                <Textarea 
                                  value={newEntries.surgery.notes}
                                  onChange={(e) => setNewEntries(prev => ({
                                    ...prev,
                                    surgery: { ...prev.surgery, notes: e.target.value }
                                  }))}
                                  placeholder="Additional notes"
                                />
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleAddNew('surgery')}
                                  className="w-full"
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Surgery
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          {isEditing.surgeries && (
                            <Button 
                              onClick={() => handleSaveSection('surgeries')}
                              className="w-full bg-green-600 hover:bg-green-700"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                          )}
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
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleQuickAction('download')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Complete Records
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleQuickAction('share')}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share with Doctor
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleQuickAction('lab')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Request Lab Results
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleQuickAction('emergency')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Update Emergency Contacts
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

export default Records;
