"use client";
import Header from "@/components/custom/Header";
import Sidebar from "@/components/custom/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownToLine,
  Building,
  Check,
  Edit,
  Ellipsis,
  Eye,
  FileText,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function () {
  const clientsData = [
    {
      id: "1",
      name: "Acme Inc.",
      email: "billing@acme.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, Country",
      status: "Active",
      invoiceCount: 12,
      totalBilled: 24680,
      contactName: "John Smith",
    },
    {
      id: "2",
      name: "Globex Corp.",
      email: "accounts@globex.com",
      phone: "+1 (555) 234-5678",
      address: "456 Business Ave, Town, Country",
      status: "Active",
      invoiceCount: 8,
      totalBilled: 18750,
      contactName: "Jane Doe",
    },
    {
      id: "3",
      name: "Stark Industries",
      email: "finance@stark.com",
      phone: "+1 (555) 345-6789",
      address: "789 Tech Blvd, Metropolis, Country",
      status: "Active",
      invoiceCount: 15,
      totalBilled: 42300,
      contactName: "Tony Stark",
    },
    {
      id: "4",
      name: "Wayne Enterprises",
      email: "payments@wayne.com",
      phone: "+1 (555) 456-7890",
      address: "101 Gotham Rd, Gotham, Country",
      status: "Inactive",
      invoiceCount: 5,
      totalBilled: 9800,
      contactName: "Bruce Wayne",
    },
    {
      id: "5",
      name: "Umbrella Corp.",
      email: "billing@umbrella.com",
      phone: "+1 (555) 567-8901",
      address: "202 Science Dr, Raccoon City, Country",
      status: "Active",
      invoiceCount: 7,
      totalBilled: 15400,
      contactName: "Albert Wesker",
    },
    {
      id: "6",
      name: "Cyberdyne Systems",
      email: "accounts@cyberdyne.com",
      phone: "+1 (555) 678-9012",
      address: "303 Future Blvd, Los Angeles, Country",
      status: "Active",
      invoiceCount: 9,
      totalBilled: 27500,
      contactName: "Miles Dyson",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-col  w-full">
        <Header />

        <main className=" p-4 ">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">Clients</h1>
              <div className="flex gap-2">
              <Button variant="outline"  className=" text-slate-700">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>

                <Button className="bg-emerald-500 text-white w-33 flex items-center justify-between hover:bg-emerald-600">
                  <Plus />
                  <span>New Invoice</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value="all">
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {clientsData.map((client) => (
                <Card key={client.id} className="pt-0">
                  <CardHeader className=" border-b  border-slate-200 bg-slate-50 ">
                    <div className="flex items-center justify-between pt-2">
                      <CardTitle className="text-lg font-semibold ">
                        {client.name}
                      </CardTitle>
                      <Badge
                        variant={
                          client.status === "Active" ? "outline" : "secondary"
                        }
                        className={
                          client.status === "Active"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                            : "bg-slate-100 text-slate-500"
                        }
                      >
                        {client.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Mail className="mt-0.5 h-4 w-4 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium">{client.email}</p>
                          <p className="text-xs text-slate-500">Email</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="mt-0.5 h-4 w-4 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium">{client.phone}</p>
                          <p className="text-xs text-slate-500">Phone</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Building className="mt-0.5 h-4 w-4 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium">
                            {client.address}
                          </p>
                          <p className="text-xs text-slate-500">Address</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="mt-0.5 h-4 w-4 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium">
                            {client.contactName}
                          </p>
                          <p className="text-xs text-slate-500">Contact Name</p>
                        </div>
                      </div>
                      <div className="pt-2 flex justify-between items-center border-t border-slate-100 mt-3">
                        <div>
                          <p className="text-sm font-medium">
                            {client.invoiceCount} Invoices
                          </p>
                          <p className="text-xs text-slate-500">
                            ${client.totalBilled.toLocaleString()} Total Billed
                          </p>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Invoices
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-rose-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
