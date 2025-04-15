"use client"
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/schemas/signUpSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eye } from 'lucide-react';

export default function SignUp() {

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",

            //optional
            businessName: "",
            businessAddress: "",
            phoneNumber: ""


        },
    });

    const onSubmit: SubmitHandler<z.infer<typeof signUpSchema>> = (data) => {
        console.log(data);
    }

    return <div className="min-h-screen bg-gray-900 text-gray-100 p-10 flex items-center justify-center">
        <div className="flex flex-col gap-8 w-120">
            <div className="text-center">
                <h2 className="text-4xl font-bold tracking-tight">Create an Account</h2>
                <p className="mt-2 text-sm text-gray-400">Enter your details</p>
            </div>

            <div>

                <Form {...form}>
                    <form className="flex flex-col gap-4">
                        <FormField
                            name="fullName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="fullName" >Full Name</FormLabel>
                                    <Input {...field} required placeholder="Enter your full name" name="fullName" type="text" id="fullName" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20" />


                                </FormItem>
                            )}
                        />

                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input {...field} placeholder="Enter your email" required name="email" type="text" id="email" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20" />

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Input {...field} required placeholder="create password" name="password" type="password" id="password" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20" />

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="businessName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="businessName">Business Name (optional)</FormLabel>
                                    <Input {...field} placeholder="your@companyname" name="businessName" type="text" id="businessName" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20" />

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="businessAddress"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="businessAddress">Business Address (optional)</FormLabel>
                                    <Input {...field} placeholder="company address" name="businessAddress" type="text" id="businessAddress" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20" />

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="phoneNumber"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="phoneNumber">Phone Number (optional)</FormLabel>
                                    <Input {...field} placeholder="phone number" type="tel" name="phoneNumber" id="phoneNumber" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20" />

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

            </div>
            <Button
                type="submit"


                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
            >
                <Loader2 className="animate-spin" />
            </Button>
        </div>



    </div>

}



