'use client';
import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import Input from "@/utils/Input";
import Button from "@/utils/Button";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBEBB5] to-[#F5D491]">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
         Login Here
        </h2>

        <form className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            prefix={<FiMail className="text-gray-500" />}
            inputClassName="bg-transparent outline-none"
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            prefix={<FiLock className="text-gray-500" />}
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 focus:outline-none"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-xl" />
                ) : (
                  <AiOutlineEye className="text-xl" />
                )}
              </button>
            }
            inputClassName="bg-transparent outline-none"
          />

          <div className="flex justify-between items-center text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-yellow-400" />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:text-yellow-500">
              Forgot password?
            </a>
          </div>

          <Button
            type="button"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-xl hover:bg-yellow-500 transition"
          >
            Login
          </Button>

          {/* Signup Text */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/Register" className="font-semibold text-yellow-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default page;
