"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { authApi } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await authApi.login(data.email, data.password);
      const token = response.data.token;
      authApi.setAuthToken(token);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 p-6">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-300">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            alt="CashWise Logo"
            width={60}
            height={60}
            src="/assets/cashwise-logo.png"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <Input
              {...form.register("email")}
              type="email"
              placeholder="Email"
              className={`bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 ${
                form.formState.errors.email ? "border-red-500" : ""
              }`}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message?.toString()}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <Input
              {...form.register("password")}
              type="password"
              placeholder="Password"
              className={`bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 ${
                form.formState.errors.password ? "border-red-500" : ""
              }`}
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message?.toString()}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 transition-all"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Processing..." : <>Sign In</>}
          </Button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-500 font-medium transition-all"
          >
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
}
