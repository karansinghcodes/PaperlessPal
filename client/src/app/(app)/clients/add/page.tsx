"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { clientSchema } from "@/schemas/clientSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { string } from "zod";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { baseUrl } from "@/configs/config";
import { toast } from "sonner";

export default function () {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const countries = [
    { id: "india", value: "india", name: "India" },
    { id: "usa", value: "usa", name: "Usa" },
    { id: "uk", value: "uk", name: "Uk" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      contactName: "",
      address: "",
      email: "",
      phoneNumber: "",
      status: true,
      additionalNotes: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [status, setStatus] = useState<string>("active");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postalCode, setPostalCode] = useState<number | null>(null);
  const [countary, setCountary] = useState<string>("india");

  const handleStatus = (value: string) => {
    setStatus(value);
  };

  const handleStreetAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreetAddress(e.target.value);
  };
  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };
  const handlePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip: number = Number(e.target.value);
    setPostalCode(zip);
  };
  const handleCountary = (value: string) => {
    setCountary(value);
  };

  const generateAddress = (): string => {
    const realAddress = `${streetAddress}, ${city}, ${state}, ${countary}, ${postalCode}`;

    return realAddress;
  };

  const onSubmit: SubmitHandler<z.infer<typeof clientSchema>> = async (
    data
  ) => {
    try {
      setLoading(true);

      const newData = JSON.parse(JSON.stringify(data));
      data.address = generateAddress();

      data.status = status === "active" ? true : false;
      console.log(data);
      const res = await fetch(`${baseUrl}create-client`, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* header content */}
      <header className="h-14 bg-white border-b border-slate-200 flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost">
            <ArrowLeft />
          </Button>

          <h1 className="text-lg font-bold">Add New Client </h1>
        </div>
        <Button
          className="bg-emerald-500 hover:bg-emerald-600 hover:text-white text-white"
          disabled={loading}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Client
        </Button>
      </header>

      <main className="flex justify-center">
        <div className="mt-6 mb-6 min-w-3xl">
          <form>
            <Card className="rounded-md pb-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-normal text-slate-900">
                      Company Information
                    </h2>
                  </div>
                  <div className="">
                    <div>
                      <Label className="text-sm font-normal text-slate-700">
                        Company name <span className="text-rose-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="mt-1"
                        {...register("companyName")}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-normal text-slate-900">
                      Primary Contact
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-normal text-slate-700">
                        Contact name
                      </Label>
                      <Input
                        type="text"
                        className="mt-1"
                        {...register("contactName")}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-normal text-slate-700">
                        Email address <span className="text-rose-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="mt-1"
                        {...register("email")}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-normal text-slate-700">
                        Phone Number
                      </Label>
                      <Input
                        type="text"
                        className="mt-1"
                        {...register("phoneNumber")}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-normal text-slate-700">
                        Status
                      </Label>
                      <Select
                        defaultValue="active"
                        value={status}
                        onValueChange={handleStatus}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-normal text-slate-900">
                      Address
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-normal text-slate-700">
                        Street Addresss <span className="text-rose-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="mt-1"
                        onChange={handleStreetAddress}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-normal text-slate-700">
                          City <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          className="mt-1"
                          onChange={handleCity}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-normal text-slate-700">
                          State <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          className="mt-1"
                          onChange={handleState}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-normal text-slate-700">
                          Postal Code <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          className="mt-1"
                          onChange={handlePostalCode}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-normal text-slate-700">
                        Countary <span className="text-rose-500">*</span>
                      </Label>
                      <Select
                        defaultValue="india"
                        onValueChange={handleCountary}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select Countary" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((countary) => (
                            <SelectItem
                              key={countary.id}
                              id={countary.id}
                              value={countary.value}
                            >
                              {" "}
                              {countary.name}{" "}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-normal text-slate-900">
                      Additional Information
                    </h2>
                  </div>
                  <div>
                    <Label className="text-sm font-normal text-slate-700">
                      Notes
                    </Label>
                    <Textarea
                      className="mt-1 h-20"
                      {...register("additionalNotes")}
                      placeholder="add any additional notes about this client..."
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-slate-200 bg-slate-50 py-4">
                <Button variant="outline">Cancel</Button>
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Client
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    </div>
  );
}
