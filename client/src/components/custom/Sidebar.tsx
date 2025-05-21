"use client";
import { BarChart, FileText, House, icons, Settings, Users2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function () {

    const pathname = usePathname();



    const links = [
        { id: 'Dashboard', name: 'Dashboard', href: '/dashboard', icon: House },
        { id: 'Invoices', name: 'Invoices', href: '/invoices', icon: FileText },
        { id: 'Clients', name: 'Clients', href: '/clients', icon: Users2 },
        { id: 'Reports', name: 'Reports', href: '/reports', icon: BarChart },
    ];
    const links2 = [
        {
            id: 'Settings', name: 'Settings', href: '/setting', icon: Settings
        }
    ]

    return (
        <div className="w-75 bg-white border-r flex flex-col border-slate-200 ">
            <div className="flex items-center p-4 h-14 border-b border-slate-200 gap-2">
                <div className=" bg-emerald-500 rounded-md p-1 flex items-center justify-center">
                    <FileText className='text-white w-5 h-5' />

                </div>
                <h2 className='text-black font-semibold  text-slate-900'>PaperLessPal</h2>
            </div>
            <nav className='flex flex-col py-4 '>
                <div className='px-2 '>
                    <h2 className='text-slate-500 font-semibold tracking-wider uppercase text-xs px-4 mb-2'>Main</h2>
                    <div className='flex flex-col gap-1 text-sm font-normal'>
                        {links.map(({ id, name, href, icon: Icon }) => (
                            <Link
                                key={id}
                                href={href}
                                className={clsx(
                                    'flex gap-3 items-center rounded-md py-2 px-4',
                                    pathname === href
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : 'hover:bg-slate-100 text-slate-700'
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {name}
                            </Link>
                        ))}

                    </div>

                </div>

                <div className='px-2 mt-6'>
                    <h2 className='text-slate-500 font-semibold tracking-wider uppercase text-xs px-4 mb-2'>Settings</h2>
                    <div className='flex flex-col gap-1 text-sm font-normal'>

                        {links2.map(({ id, name, href, icon: Icon }) => (
                            <Link
                                key={id}
                                href={href}
                                className={clsx(
                                    'flex gap-3 items-center rounded-md py-2 px-4',
                                    pathname === href
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : 'hover:bg-slate-100 text-slate-700'
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {name}
                            </Link>
                        ))}

                    </div>

                </div>

            </nav>


        </div>
    )

}