"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingIcon from "@/components/custom/Loader";
import { toast } from "sonner";
import { baseUrl } from "@/configs/config";

export default function VerifyCode() {

    const router = useRouter();
    const params = useParams<{ email: string }>();
    const email = decodeURIComponent(params.email);

    const [verifyCode, setVerifyCode] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleVerifyCode = (e: React.ChangeEvent<HTMLInputElement>) => {

        setVerifyCode(+e.target.value);
    }

    const checkVerifyCOde = async () => {
        try {
            setIsLoading(true);
            const data = { verifyCode, email };
            const res = await fetch(`${baseUrl}verify-code`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }

            });
            const resdata = await res.json();


            if (resdata.success) {
                toast.success(resdata.message);
                setTimeout(() => {
                    router.push("/sign-in")
                }, 3000);
            }
            else {
                toast.error(resdata.message);
            }

        } catch (error: any) {
            console.log(error);
            toast.error(error.message);

        }
        finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex justify-center items-center">
            <div className="flex flex-col justify-evenly w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-slate-200 h-100">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">Verify Code</h2>
                    <p className="text-slate-600 mt-2">Enter the verifycode we sent to your email {email}</p>
                </div>
                <div>
                    <div className="flex flex-col gap-4">
                        <div>

                            <Input
                                type="text"
                                value={verifyCode}
                                onChange={handleVerifyCode}

                                id="verifyCode"
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 placeholder-slate-400"
                                placeholder="Enter verify code"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
                            disabled={isLoading}
                            onClick={checkVerifyCOde}
                        >
                            {isLoading ? <LoadingIcon /> : <p>Verify</p>}
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )



}