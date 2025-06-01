
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">SH</span>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Enter your email and password to access your account.</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input placeholder="e.g., john.doe@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input placeholder="Enter your password" type="password" />
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="text-indigo-600 hover:underline">Forgot Password?</Link>
              </div>
              <Link to="/dashboard">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Login</Button>
              </Link>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="Enter your full name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input placeholder="e.g., john.doe@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input placeholder="Create a password" type="password" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <Input placeholder="Confirm your password" type="password" />
              </div>
              <Link to="/dashboard">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Sign Up</Button>
              </Link>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
