"use client";
import Sidebar from "@/components/custom/Sidebar";
import Header from "@/components/custom/Header";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowDownRight, ArrowDownToLine, ArrowUpRight, Calendar, Check, CreditCard, Eye, FileText, HandCoins, Plus, Users, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react';
import { useState } from "react";
import clsx from "clsx";


export default function () {

    const TabsItem = [
        {
            id: 'overview', name: 'Overview'
        },
        {
            id: 'analytics', name: 'Analytics'
        },
        {
            id: 'report', name: 'Report'
        }
    ]

    const statusColorClasses: { [key: string]: string } = {
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
        amber: "bg-amber-50 text-amber-600 border-amber-200",
        rose: "bg-rose-50 text-rose-600 border-rose-200",
    };

    const [activeTab, setActiveTab] = useState<string>("overview");

console.log()

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex flex-col w-full">
                <Header />
                <main className="p-6 flex flex-col gap-4">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <div className="flex gap-2">
                            <Select defaultValue="7">
                                <SelectTrigger className="w-[200px] text-black text-sx font-normal bg-white">
                                    <SelectValue placeholder="Select Date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7"> <Calendar /> Last 7 days</SelectItem>
                                    <SelectItem value="30"><Calendar /> Last 30 days</SelectItem>
                                    <SelectItem value="90"><Calendar /> Last 90 days</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button className="bg-emerald-500 text-white w-33 flex items-center justify-between hover:bg-emerald-600">
                                <Plus />
                                <span>New Invoice</span>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 w-auto grid-cols-3  p-1 rounded-sm h-10 ">
                                {
                                    TabsItem.map((tabs) => (
                                        <TabsTrigger key={tabs.id} id="tabs.id" value={tabs.id} className={clsx(

                                            activeTab === tabs.id
                                                ? 'text-black'
                                                : 'text-slate-700'
                                        )} onClick={() => {
                                            setActiveTab(tabs.id);
                                        }}>
                                            {tabs.name}
                                        </TabsTrigger>
                                    ))
                                }
                            </TabsList>
                            <TabsContent value="overview" className="space-y-5">
                                {/* stats card */}
                                <div className="grid grid-cols-4 gap-4 mt-2 ">
                                    <Card className="rounded-sm px-2 py-5 flex flex-col justify-center">
                                        <CardHeader className="flex justify-between items-center">
                                            <CardTitle className="text-sm font-medium text-slate-500">
                                                Total Revenue
                                            </CardTitle>
                                            <CreditCard className="h-4 w-4 text-slate-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-slate-900">
                                                $24,780.00
                                            </div>
                                            <div className="flex items-center text-xs text-emerald-500 mt-1">
                                                <ArrowUpRight className="mr-1 h-3 w-3" />
                                                <span>12% from last month</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="rounded-sm px-2 py-5 flex flex-col justify-center">
                                        <CardHeader className="flex justify-between items-center">
                                            <CardTitle className="text-sm font-medium text-slate-500">
                                                Pending Invoices
                                            </CardTitle>
                                            <FileText className="h-4 w-4 text-slate-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-slate-900">
                                                $12,780.00
                                            </div>
                                            <div className="flex items-center text-xs text-rose-500 mt-1">
                                                <ArrowDownRight className="mr-1 h-3 w-3" />
                                                <span>8% from last month</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="rounded-sm px-2 py-5 flex flex-col justify-center">
                                        <CardHeader className="flex justify-between items-center">
                                            <CardTitle className="text-sm font-medium text-slate-500">
                                                Total Clients
                                            </CardTitle>
                                            <Users2 className="h-4 w-4 text-slate-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-slate-900">
                                                15
                                            </div>
                                            <div className="flex items-center text-xs text-emerald-500 mt-1">
                                                <ArrowUpRight className="mr-1 h-3 w-3" />
                                                <span>3% from last month</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="rounded-sm px-2 py-5 flex flex-col justify-center">
                                        <CardHeader className="flex justify-between items-center">
                                            <CardTitle className="text-sm font-medium text-slate-500">
                                                Invoices Sent
                                            </CardTitle>
                                            <FileText className="h-4 w-4 text-slate-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-slate-900">
                                                18
                                            </div>
                                            <div className="flex items-center text-xs text-rose-500 mt-1">
                                                <ArrowDownRight className="mr-1 h-3 w-3" />
                                                <span>12% from last month</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                {/* recent invoices */}
                                <Card >
                                    <CardHeader className="flex justify-between items-centers">
                                        <div>
                                            <CardTitle>Recent Invoices</CardTitle>
                                            <CardDescription className="mt-2">Manage your recent invoices</CardDescription>
                                        </div>
                                        <div>
                                            <Button variant='outline' className="text-slate-500 ">
                                                View all
                                            </Button>
                                        </div>

                                    </CardHeader>

                                    <CardContent>
                                        <div>
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="border-b border-slate-200 text-left text-slate-500">
                                                        <th className="pb-3 pl-4 font-medium">Invoice</th>
                                                        <th className="pb-3 font-medium">Client</th>
                                                        <th className="pb-3 font-medium">Amount</th>
                                                        <th className="pb-3 font-medium">Status</th>
                                                        <th className="pb-3 pr-4 font-medium">Date</th>
                                                        <th className="pb-3 pr-4 font-medium sr-only">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        [{
                                                            id: "INV-001",
                                                            client: "Acme Inc.",
                                                            amount: "$1,200.00",
                                                            status: "Paid",
                                                            date: "Apr 12, 2023",
                                                            statusColor: "emerald",
                                                        },
                                                        {
                                                            id: "INV-002",
                                                            client: "Globex Corp.",
                                                            amount: "$2,450.00",
                                                            status: "Pending",
                                                            date: "Apr 10, 2023",
                                                            statusColor: "amber",
                                                        },
                                                        {
                                                            id: "INV-003",
                                                            client: "Stark Industries",
                                                            amount: "$3,750.00",
                                                            status: "Paid",
                                                            date: "Apr 05, 2023",
                                                            statusColor: "emerald",
                                                        },
                                                        {
                                                            id: "INV-004",
                                                            client: "Wayne Enterprises",
                                                            amount: "$1,675.00",
                                                            status: "Overdue",
                                                            date: "Mar 28, 2023",
                                                            statusColor: "rose",
                                                        },
                                                        {
                                                            id: "INV-005",
                                                            client: "Umbrella Corp",
                                                            amount: "$2,500.00",
                                                            status: "Pending",
                                                            date: "Mar 25, 2023",
                                                            statusColor: "amber",

                                                        },].map((invoice) => (
                                                            <tr key={invoice.id} className="border-b border-slate-100 hover:bg-slate-50">
                                                                <td className="py-3 pl-4">
                                                                    <div>{invoice.id}</div>
                                                                </td>
                                                                <td className="py-3">
                                                                    <div>{invoice.client}</div>
                                                                </td>
                                                                <td className="py-3">
                                                                    <div>{invoice.amount}</div>
                                                                </td>
                                                                <td className="py-3">


                                                                    <Badge
                                                                        variant="outline"
                                                                        className={statusColorClasses[invoice.statusColor]}
                                                                    >
                                                                        {invoice.status}
                                                                    </Badge>
                                                                </td>
                                                                <td className="py-3">
                                                                    <div>
                                                                        {invoice.date}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                                                                        <DropdownMenuContent>
                                                                            <DropdownMenuItem className="flex justify-between items-center">View<Eye /></DropdownMenuItem>
                                                                            <DropdownMenuItem className="flex justify-between items-center">Download<ArrowDownToLine /></DropdownMenuItem>
                                                                            <DropdownMenuItem className="flex justify-between items-center" onClick={() => {

                                                                            }}>Paid<Check /></DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>

                                                                </td>

                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>

                                    </CardContent>

                                </Card>
                                {/* {quick acitivites} */}

                                <div className="grid grid-cols-3 gap-4">

                                    <Card >
                                        <CardHeader>
                                            <CardTitle>Quick Activities</CardTitle>

                                        </CardHeader>
                                        <CardContent >
                                            <div className="space-y-3 font-normal">

                                                <Button className="bg-emerald-500 w-full bg-emerald-500 justify-start hover:bg-emerald-600">
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    <span>Create New Invoice</span>
                                                </Button>
                                                <Button variant="outline" className="bg-emerald-500 w-full bg-white justify-start  text-slate-700">
                                                    <Users className="h-4 w-4 mr-2" />
                                                    <span>Clients</span>
                                                </Button>
                                                <Button variant="outline" className="bg-emerald-500 w-full bg-white justify-start  text-slate-700">
                                                    <FileText className="h-4 w-4 mr-2" />
                                                    <span>Generate report</span>
                                                </Button>
                                            </div>


                                        </CardContent>
                                    </Card>

                                    <Card className="col-span-2">
                                        <CardHeader>
                                            <CardTitle>Recent Acitivities</CardTitle>

                                        </CardHeader>
                                        <CardContent>

                                            <div className="space-y-4">
                                                {[
                                                    {
                                                        title: "Invoice #INV-001 was paid",
                                                        description: "Acme Inc. paid $1,200.00",
                                                        time: "2 hours ago",
                                                    },
                                                    {
                                                        title: "New client added",
                                                        description: "Globex Corp. was added as a new client",
                                                        time: "5 hours ago",
                                                    },
                                                    {
                                                        title: "Invoice #INV-003 was sent",
                                                        description: "Invoice sent to Stark Industries",
                                                        time: "Yesterday",
                                                    },
                                                    {
                                                        title: "Payment reminder sent",
                                                        description: "Reminder sent to Wayne Enterprises",
                                                        time: "2 days ago",
                                                    },
                                                ].map((activity) => (
                                                    <div className="flex border justify-between p-3 rounded-md hover:bg-slate-100" key={activity.title}>
                                                        <div className="flex">
                                                            <div className="rounded-full bg-emerald-100 p-2  mr-5">
                                                                <FileText className="h-4 w-4 text-emerald-600" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <h4 className="text-sm font-normal text-slate-900">{activity.title}</h4>
                                                                <p className="text-xs text-slate-500">{activity.description}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-slate-500 ">{activity.time}</div>

                                                    </div>
                                                ))}

                                            </div>


                                        </CardContent>

                                    </Card>
                                </div>



                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>
    );
}
