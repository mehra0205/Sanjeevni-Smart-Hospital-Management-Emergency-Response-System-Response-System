
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Book, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import TestimonialSection from "@/components/TestimonialSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <Hero />
      <ServicesSection />
      <TestimonialSection />
      
      {/* Emergency Services */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-white border-red-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-red-600">Emergency Services</CardTitle>
              <CardDescription>Quick access to urgent medical care when you need it most</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/emergency">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
                  Find Nearest Hospital/Ambulance
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SH</span>
                </div>
                <span className="text-xl font-bold">Sanjeevni Healthcare</span>
              </div>
              <p className="text-gray-400">Your health, our priority. Access trusted healthcare services, book appointments, and manage your medical records easily.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/appointments" className="hover:text-white transition-colors">Appointments</Link></li>
                <li><Link to="/records" className="hover:text-white transition-colors">Medical Records</Link></li>
                <li><Link to="/emergency" className="hover:text-white transition-colors">Emergency</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Book Appointments</li>
                <li>Blood Bank Network</li>
                <li>Secure Medical Records</li>
                <li>Emergency Services</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📧 support@sanjeevni.com</li>
                <li>📞 +1 (555) 123-4567</li>
                <li>🏥 Emergency: 911</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sanjeevni Healthcare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
