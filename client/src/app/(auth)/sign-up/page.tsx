"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUpSchema } from "@/schemas/signUpSchema";
import z from "zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingIcon from "@/components/custom/Loader";
import { useState } from "react";
import { baseUrl } from "@/configs/config";
import { toast } from "sonner";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      businessName: "",
      businessAddress: "",
      phoneNumber: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof signUpSchema>> = async (
    data
  ) => {
    try {


      setIsLoading(true);
      const res = await fetch(`${baseUrl}sign-up`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        }
      });

      const resData = await res.json();

      if (resData.success) {
        toast.success(resData.message);
      }
      else {
        toast.error(resData.message);
      }



    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex justify-center items-center ">
      <div className="flex flex-col gap-10 min-w-100 ">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create an Account</h2>
          <p className="text-1xl italic">Enter your details </p>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div>
              <Label htmlFor="fullName" className="mb-1 text-1xl">
                Full Name
              </Label>
              <Input
                type="text"
                {...register("fullName")}
                id="fullName"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20"
                placeholder="Enter your name"
                required
              />

            </div>
            <div>
              <Label htmlFor="email" className="mb-1 text-1xl">
                Email
              </Label>
              <Input
                type="email"
                {...register("email")}
                id="email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20"
                placeholder="Enter your email"
                required
              />


            </div>
            <div>
              <Label htmlFor="password" className="mb-1 text-1xl">
                Password
              </Label>

              <Input
                type="password"
                {...register("password")}
                id="password"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20"
                placeholder="Create a password"
                required
              />
            </div>
            <div>
              <Label htmlFor="businessName" className="mb-1 text-1xl">
                Business Name (optional)
              </Label>

              <Input
                type="text"
                {...register("businessName")}
                id="businessName"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20"
                placeholder="Your business name"
              />
            </div>
            <div>
              <Label htmlFor="businessAddress" className="mb-1 text-1xl">
                Business Address (optional)
              </Label>

              <Input
                type="text"
                {...register("businessAddress")}
                id="businessAddress"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20"
                placeholder="Your business address"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber" className="mb-1 text-1xl">
                Phone Number(optional)
              </Label>

              <Input
                type="text"
                {...register("phoneNumber")}
                id="phoneNumber"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20"
                placeholder="Your phone number"
              />
            </div>
            <div className="mt-2">
              <Button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? <LoadingIcon /> : <p>Sign Up</p>}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
