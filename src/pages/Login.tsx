import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("login");
  const [loginMethod, setLoginMethod] = useState("email"); // "email" or "otp"
  const [signupMethod, setSignupMethod] = useState("email"); // "email" or "otp"
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPhone, setLoginPhone] = useState("");

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup') {
      setActiveTab('signup');
    }
  }, [searchParams]);

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  // Free OTP API simulation (using a mock service)
  const sendOTP = async (phoneNumber: string) => {
    try {
      // Simulate OTP sending with a free service (mock implementation)
      // In real implementation, you'd use services like:
      // - Twilio (has free tier)
      // - TextLocal (free SMS)
      // - MSG91 (free SMS for India)
      console.log(`Sending OTP to ${phoneNumber}`);
      
      // Mock OTP generation
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem(`otp_${phoneNumber}`, otp);
      localStorage.setItem(`otp_timestamp_${phoneNumber}`, Date.now().toString());
      
      toast({
        title: "OTP Sent!",
        description: `OTP sent to ${phoneNumber}. For demo: ${otp}`,
      });
      
      setOtpSent(true);
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const verifyOTP = (phoneNumber: string, enteredOTP: string) => {
    const storedOTP = localStorage.getItem(`otp_${phoneNumber}`);
    const timestamp = localStorage.getItem(`otp_timestamp_${phoneNumber}`);
    
    if (!storedOTP || !timestamp) {
      return false;
    }
    
    // Check if OTP is expired (5 minutes)
    const isExpired = Date.now() - parseInt(timestamp) > 5 * 60 * 1000;
    if (isExpired) {
      localStorage.removeItem(`otp_${phoneNumber}`);
      localStorage.removeItem(`otp_timestamp_${phoneNumber}`);
      return false;
    }
    
    return storedOTP === enteredOTP;
  };

  const handleGoogleLogin = async () => {
    try {
      // Mock Google OAuth implementation
      // In real implementation, you'd use Google OAuth 2.0 API
      // or libraries like @google-cloud/oauth2 or google-auth-library
      
      toast({
        title: "Google Login",
        description: "Google login feature will be implemented with OAuth 2.0",
      });
      
      // Mock successful Google login
      const mockGoogleUser = {
        id: "google_" + Date.now(),
        name: "Google User",
        email: "user@gmail.com",
        provider: "google"
      };
      
      localStorage.setItem('currentUser', JSON.stringify(mockGoogleUser));
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Google login failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOTPLogin = async () => {
    if (!otpSent) {
      if (!loginPhone.trim()) {
        setLoginError("Please enter your phone number");
        return;
      }
      await sendOTP(loginPhone);
    } else {
      if (!otpValue || otpValue.length !== 6) {
        setLoginError("Please enter the 6-digit OTP");
        return;
      }
      
      if (verifyOTP(loginPhone, otpValue)) {
        // Check if user exists
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        let user = existingUsers.find((u: any) => u.phone === loginPhone);
        
        if (!user) {
          // Create new user with phone
          user = {
            id: Date.now().toString(),
            name: "User",
            phone: loginPhone,
            createdAt: new Date().toISOString()
          };
          existingUsers.push(user);
          localStorage.setItem('users', JSON.stringify(existingUsers));
        }
        
        localStorage.setItem('currentUser', JSON.stringify({ id: user.id, name: user.name, phone: user.phone }));
        
        toast({
          title: "Login successful!",
          description: `Welcome, ${user.name}!`,
        });
        
        navigate('/dashboard');
      } else {
        setLoginError("Invalid or expired OTP");
      }
    }
  };

  const handleOTPSignup = async () => {
    if (!otpSent) {
      if (!signupName.trim() || !signupPhone.trim()) {
        setSignupError("Please enter your name and phone number");
        return;
      }
      await sendOTP(signupPhone);
    } else {
      if (!otpValue || otpValue.length !== 6) {
        setSignupError("Please enter the 6-digit OTP");
        return;
      }
      
      if (verifyOTP(signupPhone, otpValue)) {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = existingUsers.find((user: any) => user.phone === signupPhone);

        if (userExists) {
          setSignupError("Account with this phone number already exists.");
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          name: signupName.trim(),
          phone: signupPhone.trim(),
          createdAt: new Date().toISOString()
        };

        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        localStorage.setItem('currentUser', JSON.stringify({ id: newUser.id, name: newUser.name, phone: newUser.phone }));

        toast({
          title: "Account created successfully!",
          description: "Welcome to Sanjeevni. You are now logged in.",
        });

        navigate('/dashboard');
      } else {
        setSignupError("Invalid or expired OTP");
      }
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");

    if (signupMethod === "email") {
      // ... keep existing code (email signup validation)
      if (!signupName.trim()) {
        setSignupError("Full name is required");
        return;
      }

      if (!signupEmail.trim()) {
        setSignupError("Email is required");
        return;
      }

      const passwordError = validatePassword(signupPassword);
      if (passwordError) {
        setSignupError(passwordError);
        return;
      }

      if (signupPassword !== confirmPassword) {
        setSignupError("Passwords do not match");
        return;
      }

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.find((user: any) => user.email === signupEmail);

      if (userExists) {
        setSignupError("Account with this email already exists. Please login instead.");
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: signupName.trim(),
        email: signupEmail.trim(),
        password: signupPassword,
        createdAt: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      localStorage.setItem('currentUser', JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email }));

      toast({
        title: "Account created successfully!",
        description: "Welcome to Sanjeevni. You are now logged in.",
      });

      navigate('/dashboard');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (loginMethod === "email") {
      // ... keep existing code (email login logic)
      if (!loginEmail.trim() || !loginPassword.trim()) {
        setLoginError("Please enter both email and password");
        return;
      }

      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = existingUsers.find((user: any) => user.email === loginEmail && user.password === loginPassword);

      if (!user) {
        setLoginError("Invalid email or password");
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify({ id: user.id, name: user.name, email: user.email }));

      toast({
        title: "Login successful!",
        description: `Welcome back, ${user.name}!`,
      });

      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <CardTitle className="text-2xl">Welcome to Sanjeevni</CardTitle>
          <CardDescription>Access your healthcare dashboard</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              {/* Login Method Selection */}
              <div className="flex gap-2 mb-4">
                <Button
                  type="button"
                  variant={loginMethod === "email" ? "default" : "outline"}
                  onClick={() => {
                    setLoginMethod("email");
                    setOtpSent(false);
                    setLoginError("");
                  }}
                  className="flex-1"
                >
                  Email
                </Button>
                <Button
                  type="button"
                  variant={loginMethod === "otp" ? "default" : "outline"}
                  onClick={() => {
                    setLoginMethod("otp");
                    setOtpSent(false);
                    setLoginError("");
                  }}
                  className="flex-1"
                >
                  OTP
                </Button>
              </div>

              {loginError && (
                <Alert variant="destructive">
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}

              {loginMethod === "email" ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input 
                      placeholder="e.g., john.doe@example.com" 
                      type="email" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input 
                      placeholder="Enter your password" 
                      type="password" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Login
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input 
                      placeholder="Enter your phone number" 
                      type="tel" 
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      disabled={otpSent}
                    />
                  </div>
                  
                  {otpSent && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Enter OTP</label>
                      <InputOTP value={otpValue} onChange={setOtpValue} maxLength={6}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  )}
                  
                  <Button onClick={handleOTPLogin} className="w-full bg-indigo-600 hover:bg-indigo-700">
                    {otpSent ? "Verify OTP" : "Send OTP"}
                  </Button>
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              {/* Signup Method Selection */}
              <div className="flex gap-2 mb-4">
                <Button
                  type="button"
                  variant={signupMethod === "email" ? "default" : "outline"}
                  onClick={() => {
                    setSignupMethod("email");
                    setOtpSent(false);
                    setSignupError("");
                  }}
                  className="flex-1"
                >
                  Email
                </Button>
                <Button
                  type="button"
                  variant={signupMethod === "otp" ? "default" : "outline"}
                  onClick={() => {
                    setSignupMethod("otp");
                    setOtpSent(false);
                    setSignupError("");
                  }}
                  className="flex-1"
                >
                  OTP
                </Button>
              </div>

              {signupError && (
                <Alert variant="destructive">
                  <AlertDescription>{signupError}</AlertDescription>
                </Alert>
              )}

              {signupMethod === "email" ? (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input 
                      placeholder="Enter your full name" 
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input 
                      placeholder="e.g., john.doe@example.com" 
                      type="email" 
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input 
                      placeholder="Create a strong password" 
                      type="password" 
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Password must be 8+ characters with uppercase, lowercase, number & special character
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm Password</label>
                    <Input 
                      placeholder="Confirm your password" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Sign Up
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input 
                      placeholder="Enter your full name" 
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      disabled={otpSent}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input 
                      placeholder="Enter your phone number" 
                      type="tel" 
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      disabled={otpSent}
                    />
                  </div>
                  
                  {otpSent && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Enter OTP</label>
                      <InputOTP value={otpValue} onChange={setOtpValue} maxLength={6}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  )}
                  
                  <Button onClick={handleOTPSignup} className="w-full bg-indigo-600 hover:bg-indigo-700">
                    {otpSent ? "Verify OTP & Sign Up" : "Send OTP"}
                  </Button>
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
