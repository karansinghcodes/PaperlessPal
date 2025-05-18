"use client";



export default function () {



    return <div className="min-h-screen bg-white flex justify-center">
        <div className="w-4xl flex flex-col gap-8">
            <div className="flex justify-between">
                <div>
                    <img src="https://plus.unsplash.com/premium_photo-1701090939615-1794bbac5c06?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="h-18 w-18" />
                    <div className="flex flex-col justify-start">
                        <h2>Comapny name</h2>
                        <span>123 Business Ave, Suite 100, City, State 12345</span>
                        <span>billing@acmeinc.com</span>
                        <span>+1 (555) 123-4567</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h2>INVOICE</h2>
                    <div className="flex flex-col">
                        <span>
                            Invoice Number: INV-2023-001
                        </span>
                        <span>
                            Invoice Number: INV-2023-001
                        </span>
                        <span>
                            Invoice Number: INV-2023-001
                        </span>
                    </div>
                </div>



            </div>
            <div className="bg-slate-100">
                <div>
                    <h3>Bill to</h3>
                </div>
                <div className="flex flex-col justify-start">
                    <h2>Comapny name</h2>
                    <span>123 Business Ave, Suite 100, City, State 12345</span>
                    <span>billing@acmeinc.com</span>
                    <span>+1 (555) 123-4567</span>
                </div>

            </div>

            <div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-emerald-100 text-emerald-800">
                            <th className="py-3 px-4 text-left">Description</th>
                            <th className="py-3 px-4 text-right">Quantity</th>
                            <th className="py-3 px-4 text-right">Unit Price</th>
                            <th className="py-3 px-4 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className=" text-slate-900 font-normal text-large border-b">
                            <td className="py-3 px-4 text-left">Description</td>
                            <td className="py-3 px-4 text-right">Quantity</td>
                            <td className="py-3 px-4 text-right">Unit Price</td>
                            <td className="py-3 px-4 text-right">Total</td>
                        </tr>
                        <tr className=" text-slate-900 font-normal text-large border-b">
                            <td className="py-3 px-4 text-left">Description</td>
                            <td className="py-3 px-4 text-right">Quantity</td>
                            <td className="py-3 px-4 text-right">Unit Price</td>
                            <td className="py-3 px-4 text-right">Total</td>
                        </tr>
                        <tr className=" text-slate-900 font-normal text-large border-b">
                            <td className="py-3 px-4 text-left">Description</td>
                            <td className="py-3 px-4 text-right">Quantity</td>
                            <td className="py-3 px-4 text-right">Unit Price</td>
                            <td className="py-3 px-4 text-right">Total</td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div className="flex justify-end border-b pb-2">
                <div className="w-50">
                    <div className="flex justify-between border-b">
                        <span>Subtotal</span>
                        <span>40000</span>
                    </div>


                    <div className="flex justify-between border-b">
                        <span>Subtotal</span>
                        <span>40000</span>
                    </div>


                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>40000</span>
                    </div>




                </div>
            </div>
            <div className="flex flex-col border-b">
                <h3>Notes</h3>
                <span>Payment is due within 30 days. Please make checks payable to Acme Inc. or pay online at billing.acmeinc.com

                </span>
            </div>
            <div className="text-center">
                <span>Thank you</span>

            </div>
        </div>
    </div>
}