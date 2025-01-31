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

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await authApi.register(data.name, data.email, data.password);
      toast({
        title: "Success",
        description: "Registration successful! Please login.",
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Registration failed. Please try again.",
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
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500">
            Create an account and manage your finances with CashWise
          </p>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <Input
              {...form.register("name")}
              placeholder="Full Name"
              className={`bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 ${
                form.formState.errors.name ? "border-red-500" : ""
              }`}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.name.message?.toString()}
              </p>
            )}
          </div>

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

          {/* Confirm Password Field */}
          <div>
            <Input
              {...form.register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              className={`bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 ${
                form.formState.errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.confirmPassword.message?.toString()}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 transition-all"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              "Processing..."
            ) : (
              <>Create Account</>
            )}
          </Button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-500 font-medium transition-all"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
