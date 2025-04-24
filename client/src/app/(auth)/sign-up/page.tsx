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
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { useRouter } from "next/navigation";


export default function SignUp() {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [seePassword, setSeePassword] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",

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
        router.push(`/verify/${data.email}`);

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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex justify-center items-center ">
      <div className="flex flex-col gap-8 w-full  max-w-md p-8  bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800">Create an Account</h2>
          <p className="text-slate-600 mt-2">Start managing your invoices today</p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="firstName" className="mb-1 text-sm font-medium text-slate-700">
                First Name
              </Label>
              <Input
                type="text"
                {...register("firstName")}
                id="firstName"
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 placeholder-slate-400"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="mb-1 text-sm font-medium text-slate-700">
                Last Name
              </Label>
              <Input
                type="text"
                {...register("lastName")}
                id="lastName"
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 placeholder-slate-400"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="mb-1 text-sm font-medium text-slate-700">
                Email
              </Label>

              <Input
                type="email"
                {...register("email")}
                id="email"
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 placeholder-slate-400"
                placeholder="Enter your email"
                required
              />

            </div>
            <div>
              <Label htmlFor="password" className="mb-1 text-sm font-medium text-slate-700">
                Password
              </Label>
              <div className="flex items-center bg-white border border-slate-300 rounded-lg focus-within:ring-2 focus-within:ring-slate-300 focus-within:border-transparent transition-all duration-300">
                <Input
                  type={seePassword ? "text" : "password"}
                  {...register("password")}
                  id="password"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setSeePassword(!seePassword)}
                  className="p-2 text-slate-500 hover:text-slate-700 focus:outline-none"
                >
                  {seePassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="mt-2">
              <Button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
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
