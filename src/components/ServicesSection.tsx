
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Book, User } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Calendar,
      title: "Book Appointments",
      description: "Easily find and book appointments with specialists online.",
      color: "bg-blue-500"
    },
    {
      icon: User,
      title: "Blood Bank Network",
      description: "Check blood availability and find donation centers nearby.",
      color: "bg-red-500"
    },
    {
      icon: Book,
      title: "Secure Medical Records",
      description: "Access your health history, reports, and prescriptions securely.",
      color: "bg-green-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Seamless Healthcare Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed to make your medical journey smooth and efficient
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
