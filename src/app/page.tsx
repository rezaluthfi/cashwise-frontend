"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck, BarChart, Clock, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <a href="/">
              <Image
                alt="logo"
                width={52}
                height={52}
                src="/assets/cashwise-logo.png"
              />
            </a>
            <span className="text-2xl font-bold text-blue-600">CashWise</span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <Link href="#" className="hover:text-blue-500 transition-colors">
              Home
            </Link>
            <Link
              href="#features"
              className="hover:text-blue-500 transition-colors"
            >
              Why CashWise?
            </Link>

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white ml-4"
              asChild
            >
              <Link href="/dashboard">Login</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 container mx-auto px-6 h-screen flex items-center">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Take Charge of Your <span className="text-blue-500">Money</span>{" "}
              Today!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Effortlessly track spending, set smart budgets, and make better
              financial decisions with CashWise.
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              asChild
            >
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/assets/preview.png"
              alt="Dashboard Preview"
              width={700}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose CashWise?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
              <BarChart className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Instant Insights</h3>
              <p className="text-gray-600">
                Understand your finances at a glance with real-time analytics
                and smart reporting.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
              <Shield className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your financial data is encrypted and stored securely, ensuring
                complete privacy.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
              <Clock className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Effortless Budgeting
              </h3>
              <p className="text-gray-600">
                Create custom budgets and let CashWise help you stick to them
                seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white from-blue-50 to-blue-100 border-t border-gray-300">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <a href="/">
                  <Image
                    alt="logo"
                    width={42}
                    height={42}
                    src="/assets/cashwise-logo.png"
                  />
                </a>
                <span className="text-xl font-bold text-blue-600">
                  CashWise
                </span>
              </div>
              <p className="text-gray-700">
                Your financial partner for a smarter tomorrow.
              </p>
            </div>

            {/* Product Section */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Our Features</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Instant Insights
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Secure & Private
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Effortless Budgeting
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="hover:text-blue-500 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media Section */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Link
                  href="https://twitter.com"
                  className="hover:scale-110 transition-transform"
                >
                  <Image
                    src="/assets/twitter.svg"
                    alt="Twitter"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  href="https://facebook.com"
                  className="hover:scale-110 transition-transform"
                >
                  <Image
                    src="/assets/facebook.svg"
                    alt="Facebook"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  href="https://linkedin.com"
                  className="hover:scale-110 transition-transform"
                >
                  <Image
                    src="/assets/linkedin.svg"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-300 mt-12 pt-8 text-center text-gray-600">
            <p>© {new Date().getFullYear()} CashWise. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
