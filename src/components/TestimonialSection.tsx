
import { Card, CardContent } from "@/components/ui/card";

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Patient",
      content: "Sanjeevni Healthcare transformed how I manage my health. Booking appointments is a breeze!",
      avatar: "PS"
    },
    {
      name: "Dr. Alok Verma",
      role: "Cardiologist",
      content: "Finding a doctor and managing patient records is so much more efficient now. Highly recommend!",
      avatar: "AV"
    },
    {
      name: "Rajesh Singh",
      role: "Caregiver",
      content: "The Blood Bank feature is a lifesaver. I could quickly find the required blood type for my relative.",
      avatar: "RS"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600">Real experiences from patients and healthcare professionals</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
