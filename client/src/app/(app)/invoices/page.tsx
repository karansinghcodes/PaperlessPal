"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import z from "zod";
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { Calendar } from "@/components/ui/calendar"
import { zodResolver } from "@hookform/resolvers/zod"




export default function () {


    const FormSchema = z.object({
        dob: z.date({
            required_error: "A date of birth is required.",
        }),
    })

    const [on, seton] = useState(false);
    const clients = [
        { id: "1", name: "Acme Inc.", email: "billing@acme.com", address: "123 Main St, City, Country" },
        { id: "2", name: "Globex Corp.", email: "accounts@globex.com", address: "456 Business Ave, Town, Country" },
        { id: "3", name: "Stark Industries", email: "finance@stark.com", address: "789 Tech Blvd, Metropolis, Country" },
        { id: "4", name: "Wayne Enterprises", email: "payments@wayne.com", address: "101 Gotham Rd, Gotham, Country" },
    ]


    const [invoicenumber, setinvoicenumber] = useState<string>("Inv-001")
    const [selectedClient, setSelectedClient] = useState<string>("")
    const [date, setDate] = useState<Date | undefined>(new Date())





    return <div className="min-h-screen bg-slate-50">
        <header className="flex items-center justify-between h-14 bg-white border-b border-slate-200 px-4 sticky z-10 top-0 w-full ">
            <div className="flex items-center gap-6 ">
                <ArrowLeft className="h-4 w-4 font-bold text-black " />

                <span className="text-xl text-black font-semibold">Create New Inovoice</span>

            </div>
            <div className="flex items-center gap-5">
                <Button className=" bg-white" variant='outline'>
                    Save Draft
                </Button>
                <Button className=" bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white" variant='outline'>
                    Save Draft
                </Button>

            </div>
        </header>

        <main className="px-20">
            <div className=" grid grid-cols-2 w-full">

                <Card className="min-h-70 max-w-120 ">
                    <CardHeader>
                        <span className="text-xl font-semibold ">  Client Information</span>

                    </CardHeader>

                    <CardContent className="flex flex-col content-start gap-2">
                        <span>Select a client</span>

                        <Select value={selectedClient} onValueChange={setSelectedClient}>
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="Clients" />
                            </SelectTrigger>
                            <SelectContent>

                                {
                                    clients.map((client) => (
                                        <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>

                                    ))
                                }

                            </SelectContent>
                        </Select>
                        {selectedClient && (
                            <div className="rounded-lg border border-slate-200 p-3 text-sm">
                                <div className="font-medium text-slate-900">
                                    {clients.find((c) => c.id === selectedClient)?.name}
                                </div>
                                <div className="text-slate-500 mt-1">{clients.find((c) => c.id === selectedClient)?.email}</div>
                                <div className="text-slate-500 mt-1">
                                    {clients.find((c) => c.id === selectedClient)?.address}
                                </div>
                            </div>
                        )}



                    </CardContent>

                </Card>
                <Card className="min-h-70 max-w-120 ">
                    <CardHeader>
                        <span className="text-xl font-semibold ">  Client Information</span>

                    </CardHeader>

                    <CardContent className="flex flex-col content-start gap-2">
                        <Label>
                            Invoice number
                        </Label>
                        <Input type="text" value={invoicenumber} />


                        <div>
                            <div>
                                <Label>
                                    Issue date
                                </Label>
                                <Button onClick={() => {
                                    seton(!on)
                                }}>
                                    on
                                </Button>
                                {on && <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border"
                                />}
                            </div>


                        </div>
                    </CardContent>

                </Card>

            </div>
        </main >
    </div >
}