
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Download, Share2, Edit, Trash2, Calendar, Clock, User } from "lucide-react";

interface Prescription {
  id: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medications: Medication[];
  instructions: string;
  followUp?: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

const Prescriptions = () => {
  const { toast } = useToast();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isAddingPrescription, setIsAddingPrescription] = useState(false);
  const [isAddingMedication, setIsAddingMedication] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState<string | null>(null);

  // Form states
  const [newPrescription, setNewPrescription] = useState<Partial<Prescription>>({
    doctorName: "",
    date: "",
    diagnosis: "",
    medications: [],
    instructions: "",
    followUp: ""
  });

  const [newMedication, setNewMedication] = useState<Medication>({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: ""
  });

  const addPrescription = () => {
    if (!newPrescription.doctorName || !newPrescription.date || !newPrescription.diagnosis) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const prescription: Prescription = {
      id: Date.now().toString(),
      doctorName: newPrescription.doctorName || "",
      date: newPrescription.date || "",
      diagnosis: newPrescription.diagnosis || "",
      medications: newPrescription.medications || [],
      instructions: newPrescription.instructions || "",
      followUp: newPrescription.followUp || ""
    };

    setPrescriptions([...prescriptions, prescription]);
    setNewPrescription({
      doctorName: "",
      date: "",
      diagnosis: "",
      medications: [],
      instructions: "",
      followUp: ""
    });
    setIsAddingPrescription(false);

    toast({
      title: "Success",
      description: "Prescription added successfully",
    });
  };

  const addMedication = () => {
    if (!newMedication.name || !newMedication.dosage || !newMedication.frequency) {
      toast({
        title: "Error",
        description: "Please fill in medication name, dosage, and frequency",
        variant: "destructive",
      });
      return;
    }

    setNewPrescription(prev => ({
      ...prev,
      medications: [...(prev.medications || []), newMedication]
    }));

    setNewMedication({
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      notes: ""
    });
    setIsAddingMedication(false);

    toast({
      title: "Success",
      description: "Medication added to prescription",
    });
  };

  const deletePrescription = (id: string) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
    toast({
      title: "Success",
      description: "Prescription deleted successfully",
    });
  };

  const downloadPrescription = (prescription: Prescription) => {
    const content = `
PRESCRIPTION

Doctor: ${prescription.doctorName}
Date: ${prescription.date}
Diagnosis: ${prescription.diagnosis}

MEDICATIONS:
${prescription.medications.map(med => 
  `- ${med.name} (${med.dosage}) - ${med.frequency} for ${med.duration}${med.notes ? ` - ${med.notes}` : ''}`
).join('\n')}

INSTRUCTIONS:
${prescription.instructions}

${prescription.followUp ? `FOLLOW-UP: ${prescription.followUp}` : ''}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prescription-${prescription.doctorName}-${prescription.date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Prescription downloaded successfully",
    });
  };

  const sharePrescription = (prescription: Prescription) => {
    const shareText = `Prescription from Dr. ${prescription.doctorName} on ${prescription.date}`;
    
    if (navigator.share) {
      navigator.share({
        title: shareText,
        text: `Diagnosis: ${prescription.diagnosis}\nMedications: ${prescription.medications.length} items`,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Success",
        description: "Prescription details copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Prescriptions</h1>
          <p className="text-gray-600">Manage and track your medical prescriptions</p>
        </div>

        <Tabs defaultValue="prescriptions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="prescriptions">My Prescriptions</TabsTrigger>
            <TabsTrigger value="add">Add New</TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions">
            <div className="space-y-4">
              {prescriptions.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions yet</h3>
                      <p className="text-gray-500 mb-4">Start by adding your first prescription</p>
                      <Button 
                        onClick={() => setIsAddingPrescription(true)}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Prescription
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {prescriptions.map((prescription) => (
                    <Card key={prescription.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <User className="h-5 w-5 text-indigo-600" />
                              Dr. {prescription.doctorName}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {prescription.date}
                              </span>
                              <Badge variant="outline">{prescription.diagnosis}</Badge>
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadPrescription(prescription)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => sharePrescription(prescription)}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingPrescription(prescription.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deletePrescription(prescription.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Medications</h4>
                            <div className="space-y-2">
                              {prescription.medications.map((med, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                  <div className="font-medium">{med.name}</div>
                                  <div className="text-sm text-gray-600">
                                    {med.dosage} • {med.frequency} • {med.duration}
                                  </div>
                                  {med.notes && (
                                    <div className="text-sm text-gray-500 mt-1">{med.notes}</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {prescription.instructions && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
                              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                                {prescription.instructions}
                              </p>
                            </div>
                          )}

                          {prescription.followUp && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Follow-up</h4>
                              <p className="text-gray-600 flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {prescription.followUp}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Add New Prescription</CardTitle>
                <CardDescription>Enter prescription details and medications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Doctor Name *</label>
                    <Input
                      placeholder="e.g., Dr. Rajesh Kumar"
                      value={newPrescription.doctorName || ""}
                      onChange={(e) => setNewPrescription(prev => ({ ...prev, doctorName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date *</label>
                    <Input
                      type="date"
                      value={newPrescription.date || ""}
                      onChange={(e) => setNewPrescription(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Diagnosis *</label>
                  <Input
                    placeholder="e.g., Acute bronchitis"
                    value={newPrescription.diagnosis || ""}
                    onChange={(e) => setNewPrescription(prev => ({ ...prev, diagnosis: e.target.value }))}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Medications</h3>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddingMedication(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Medication
                    </Button>
                  </div>

                  {isAddingMedication && (
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Medicine Name *</label>
                            <Input
                              placeholder="e.g., Amoxicillin"
                              value={newMedication.name}
                              onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Dosage *</label>
                            <Input
                              placeholder="e.g., 500mg"
                              value={newMedication.dosage}
                              onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Frequency *</label>
                            <Input
                              placeholder="e.g., 3 times a day"
                              value={newMedication.frequency}
                              onChange={(e) => setNewMedication(prev => ({ ...prev, frequency: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Duration</label>
                            <Input
                              placeholder="e.g., 7 days"
                              value={newMedication.duration}
                              onChange={(e) => setNewMedication(prev => ({ ...prev, duration: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Notes</label>
                          <Input
                            placeholder="e.g., Take after meals"
                            value={newMedication.notes}
                            onChange={(e) => setNewMedication(prev => ({ ...prev, notes: e.target.value }))}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={addMedication}>Add Medication</Button>
                          <Button variant="outline" onClick={() => setIsAddingMedication(false)}>
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {(newPrescription.medications || []).map((med, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg flex items-start justify-between">
                      <div>
                        <div className="font-medium">{med.name}</div>
                        <div className="text-sm text-gray-600">
                          {med.dosage} • {med.frequency} • {med.duration}
                        </div>
                        {med.notes && (
                          <div className="text-sm text-gray-500 mt-1">{med.notes}</div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const meds = [...(newPrescription.medications || [])];
                          meds.splice(index, 1);
                          setNewPrescription(prev => ({ ...prev, medications: meds }));
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Instructions</label>
                  <Textarea
                    placeholder="Special instructions from the doctor..."
                    value={newPrescription.instructions || ""}
                    onChange={(e) => setNewPrescription(prev => ({ ...prev, instructions: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Follow-up Date</label>
                  <Input
                    placeholder="e.g., Follow up in 1 week"
                    value={newPrescription.followUp || ""}
                    onChange={(e) => setNewPrescription(prev => ({ ...prev, followUp: e.target.value }))}
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={addPrescription} className="bg-indigo-600 hover:bg-indigo-700">
                    Save Prescription
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setNewPrescription({
                        doctorName: "",
                        date: "",
                        diagnosis: "",
                        medications: [],
                        instructions: "",
                        followUp: ""
                      });
                      setIsAddingPrescription(false);
                      setIsAddingMedication(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Prescriptions;
