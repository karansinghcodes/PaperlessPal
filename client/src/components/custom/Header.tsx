"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Bell, Search } from "lucide-react";
import { Input } from "../ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function () {
    return (
        <header className="flex items-center justify-between h-14 bg-white border-b border-slate-200 px-4 sticky z-10 top-0 w-full ">
            <div>
                <Search className="absolute left-7 top-4 h-5 w-5 text-slate-500 " />
                <Input
                    type="search"
                    placeholder="Search..."
                    className=" placeholder:text-slate-500 placeholder:text-sm  py-5 px-10 font-normal  text-slate-900 rounded-md w-64 focus-visible:ring-1 focus-visible:ring-emerald-500"
                />
            </div>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="bg-white hover:bg-slate-100 text-slate-700 border p-2 border-slate-200 rounded-md flex items-center justify-center"
                >
                    <Bell className=" text-sm font-medium w-5 h-5" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="bg-white hover:bg-slate-100 text-slate-700 border p-1 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-white flex gap-2 items-center">

                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAGMAmAMBIgACEQEDEQH/xAAUAAEAAAAAAAAAAAAAAAAAAAAA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2Q=="
                                className="w-8 h-8 rounded-full bg-slate-200"
                                alt="Avatar"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-slate-700">Jhon d</span>
                        <ChevronDown />

                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Setting</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            signOut();
                        }}>Log Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
