import Table from "@/components/Table";
import axiosInstance from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'



const index = () => {
    const [hooksCallers, setHooksCallers] = useState([]);
    const router = useRouter()
    useEffect(() => {
        async function getHooksCallers() {
            axiosInstance.get("/hooks-caller").then((res) => {
                setHooksCallers(res.data.hooksCallers)
            }).catch((err) => {
                console.log(err)
            })
        }
        getHooksCallers();
    }, [])

    const columns = React.useMemo(() => [
        {
            Header: "Id",
            accessor: 'id',
        },
        {
            Header: "Status",
            accessor: 'status',
        },
        {
            Header: "Expire Time",
            accessor: 'date',
        },
        {
            Header: "Webhook Url",
            accessor: 'webhookUrl',
        },
    ], [])

    const data = React.useMemo(() => hooksCallers, [hooksCallers])
    return (
        <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
            <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                <div className="sm:flex sm:items-center mb-4">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Hook Callers</h1>
                        <p className="mt-2 text-sm text-gray-700">A list of all the hook callers.</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button type="button" onClick={() => {
                            router.push('/create')
                        }} className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add new</button>
                    </div>
                </div>
                <Table columns={columns} data={data} />
            </div>
        </div>
    )
}
export default index;