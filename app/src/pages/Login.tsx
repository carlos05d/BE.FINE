import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
});

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmitLogin = async (data: LoginForm) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(data);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/role-select");
    }
  };

  const onSubmitSignup = async (data: SignupForm) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.name },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your email for confirmation");
      navigate("/role-select");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl">{isLogin ? "Sign In" : "Sign Up"}</CardTitle>
          <CardDescription>
            {isLogin ? "Enter your credentials to login" : "Create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLogin ? (
            <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...loginForm.register("email")} />
                {loginForm.formState.errors.email && <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...loginForm.register("password")} />
                {loginForm.formState.errors.password && <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Sign In"}
              </Button>
            </form>
          ) : (
            <form onSubmit={signupForm.handleSubmit(onSubmitSignup)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...signupForm.register("name")} />
                {signupForm.formState.errors.name && <p className="text-sm text-destructive">{signupForm.formState.errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...signupForm.register("email")} />
                {signupForm.formState.errors.email && <p className="text-sm text-destructive">{signupForm.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...signupForm.register("password")} />
                {signupForm.formState.errors.password && <p className="text-sm text-destructive">{signupForm.formState.errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Create Account"}
              </Button>
            </form>
          )}
          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary underline-offset-4 hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

