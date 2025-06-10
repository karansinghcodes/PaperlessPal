"use client";
import Header from "@/components/custom/Header";
import LoadingIcon from "@/components/custom/Loader";
import Sidebar from "@/components/custom/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { baseUrl } from "@/configs/config";
import { Download, Eye, Filter, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";




interface invoice {
    invoiceNumber: string;
    clientName: string;
    amount: string;
    IssueDate: string;
    DueDate: string;
    Status: string;

}


export default function Invoices() {

    const router = useRouter();

    const { data: session, status } = useSession();
    const [loading, setLoading] = useState<boolean>(false);
    const token = session?.accessToken;
    const [invoices, setInvoices] = useState<invoice[]>([])

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postPerPage, setPostPerPage] = useState<number>(8);

    const lastInvoiceIndex = currentPage * postPerPage;
    const firstInvoiceIndex = lastInvoiceIndex - postPerPage;




    useEffect(() => {
        const fetchClients = async () => {
            if (status === "authenticated" && token) {
                try {
                    setLoading(true);
                    const response = await fetch(`${baseUrl}get-invoices`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    const data = await response.json();

                    setInvoices(data.data);
                } catch (error) {
                    console.error("Error fetching clients:", error);

                } finally {
                    setLoading(false);
                }
            }
        };

        fetchClients();
    }, [token]);

    const currentInvoices = invoices.slice(firstInvoiceIndex, lastInvoiceIndex);
    console.log(currentInvoices)

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

                        {loading ? <div><LoadingIcon /></div> :

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
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-slate-200 text-left text-slate-500">
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
                                                {currentInvoices.map((invoice) => (
                                                    <tr key={invoice.invoiceNumber} className="border-b border-slate-100 hover:bg-slate-50">
                                                        <td className="py-3 pl-4">
                                                            <div className="font-medium text-slate-900">{invoice.invoiceNumber}</div>
                                                        </td>
                                                        <td className="py-3">
                                                            <div className="font-medium text-slate-900">{invoice.clientName}</div>
                                                        </td>
                                                        <td className="py-3">
                                                            <div className="font-medium text-slate-900">{invoice.amount}</div>
                                                        </td>
                                                        <td className="py-3 text-slate-500">{Intl.DateTimeFormat('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        }).format(new Date(invoice.IssueDate))}</td>
                                                        <td className="py-3 text-slate-500">{Intl.DateTimeFormat('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        }).format(new Date(invoice.DueDate))}</td>
                                                        <td className="py-3">
                                                            <Badge
                                                                variant="outline"
                                                            // className={`bg-${invoice.statusColor}-50 text-${invoice.statusColor}-600 border-${invoice.statusColor}-200`}
                                                            >
                                                                {invoice.Status}
                                                            </Badge>
                                                        </td>
                                                        <td className="py-3 pr-4 text-right">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                        <span className="sr-only">Actions</span>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem>
                                                                        <Eye className="mr-2 h-4 w-4" />
                                                                        View
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Download className="mr-2 h-4 w-4" />
                                                                        Download
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem className="text-rose-600">
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </td>
                                                    </tr>
                                                ))}


                                            </tbody>

                                        </table>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <p className="text-sm text-slate-500">Showing 8 of 24 invoices</p>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" onClick={() => {
                                                setCurrentPage(currentPage - 1);
                                            }} disabled={currentPage == 1}>
                                                Previous
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => {
                                                setCurrentPage(currentPage + 1);
                                            }} >
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>


                            </Card>
                        }

                    </div>

                </main>


            </div>

        </div>
    )
}