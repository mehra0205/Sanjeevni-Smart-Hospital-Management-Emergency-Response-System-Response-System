
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Your Health, Our Priority
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100">
            Access trusted healthcare services, book appointments, manage records, and find critical resources easily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login?tab=signup">
              <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 px-8 py-4 text-lg font-semibold">
                Get Started
              </Button>
            </Link>
            <Link to="/appointments">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-900 px-8 py-4 text-lg font-semibold bg-transparent">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
