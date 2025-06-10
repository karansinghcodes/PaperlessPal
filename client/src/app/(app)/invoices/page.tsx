"use client";
import Header from "@/components/custom/Header";
import Sidebar from "@/components/custom/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, Plus } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Invoices() {

    const router = useRouter();



    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex flex-col  w-full">
                <Header />

                <main className="p-[24px]">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-2xl font-bold text-slate-90">Invoices</h1>
                            <div className="flex gap-2">
                                <Button variant="outline" className=" text-slate-700">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>

                                <Button className="bg-emerald-500 text-white w-33 flex items-center justify-between hover:bg-emerald-600" onClick={() => {
                                    router.push("/invoices/add");
                                }}>
                                    <Plus />
                                    <span>New Invoice</span>
                                </Button>
                            </div>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex justify-between">
                                    <h3 className="font-semibold text-lg text-slate-90">All Invoices</h3>
                                    <div className="flex gap-2 items-center">
                                        <Select value="all">
                                            <SelectTrigger className="w-[180px] bg-white">
                                                <SelectValue placeholder="Filter by status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Statuses</SelectItem>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Paid">Paid</SelectItem>
                                                <SelectItem value="OverDue">OverDue</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button variant="outline" className="">
                                            <Download className="h-4 w-4" />

                                        </Button>

                                    </div>
                                </CardTitle>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr>
                                                    <th className="pb-3 pl-4 font-medium">Invoice</th>
                                                    <th className="pb-3 font-medium">Client</th>
                                                    <th className="pb-3 font-medium">Amount</th>
                                                    <th className="pb-3 font-medium">Issue Date</th>
                                                    <th className="pb-3 font-medium">Due Date</th>
                                                    <th className="pb-3 font-medium">Status</th>
                                                    <th className="pb-3 pr-4 font-medium sr-only">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                

                                            </tbody>

                                        </table>
                                    </div>
                                </CardContent>
                            </CardHeader>

                        </Card>

                    </div>

                </main>


            </div>

        </div>
    )
}