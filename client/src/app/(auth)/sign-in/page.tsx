"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingIcon from "@/components/custom/Loader";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schemas/singInSchema";
import { signIn } from "next-auth/react";


export default function SignIn() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit } = useForm<z.infer<typeof signInSchema>>({
        defaultValues: {
            email: "",
            password: "",

        },
    });
    const onSubmit: SubmitHandler<z.infer<typeof signInSchema>> = async (data) => {

        try {
            const { email, password } = data;
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });


            if (res?.error) {
                toast.error("Invalid credetials")
            }
            else if (res?.url) {
                toast.success("Sign In successfull");
                router.push('/dashboard');

               
            }

        }
        catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false);
        }



    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex justify-center items-center">
            <div className="flex flex-col gap-8 w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-slate-200">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">Sign In</h2>
                    <p className="text-slate-600 mt-2">Enter your credentials</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

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
                            <Input
                                type="password"
                                {...register("password")}
                                id="password"
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 placeholder-slate-400"
                                placeholder="Create a password"
                                required
                            />
                        </div>




                        <div className="mt-2">
                            <Button
                                type="submit"
                                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
                                disabled={isLoading}
                            >
                                {isLoading ? <LoadingIcon /> : <p>Sign In</p>}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}


