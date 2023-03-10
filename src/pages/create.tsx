'use client'
import { useYupValidationResolver } from '@/hook/useValidationResolver';
import axiosInstance from '@/lib/axios';
import { InformationCircleIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";



type FormData = {
    hours: number;
    minutes: number;
    seconds: number;
    webhookUrl: string;
};

export default function Create() {
    const [id, setId] = useState<number>();

    const router = useRouter()
    const validationSchema = yup.object({
        hours: yup.number().typeError('you must specify a number').required("Required"),
        minutes: yup.number().typeError('you must specify a number').required("Required"),
        seconds: yup.number().typeError('you must specify a number').required("Required"),
        webhookUrl: yup.string().typeError('you must specify a string').matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        ).required("Required"),
    });
    const resolver = useYupValidationResolver(validationSchema);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver });
    const createNewHookCaller = async (data) => {
        axiosInstance.post("/hooks-caller", data).then((res) => {
            console.log(res.data.id)
            setId(res.data.id);
        }).catch((err) => {
            console.log(err)
        })
    }
    return (

        <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
            <Head>
                <title>Create page</title>
            </Head>
            <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                <div className="sm:flex sm:items-center mb-4">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Create new</h1>
                        <p className="mt-2 text-sm text-gray-700">Create new hook caller.</p>

                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button type="button" onClick={() => {
                            router.push('/')
                        }} className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Lists</button>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">

                    <form onSubmit={handleSubmit(createNewHookCaller)}>
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                {id ? (
                                    <div className="rounded-md bg-blue-50 p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                                            </div>
                                            <div className="ml-3 flex-1 md:flex md:justify-between">
                                                <p className="text-sm text-blue-700">HookCaller created successfully with id {id}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                                            Hours
                                        </label>
                                        <input
                                            type="number"
                                            {...register('hours')}
                                            className={`mt-1  block w-full shadow-sm sm:text-sm  rounded-md ${errors.hours ? " border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
                                        />
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                            {errors.hours && errors.hours.message}
                                        </span>

                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="minutes" className="block text-sm font-medium text-gray-700">
                                            Minutes
                                        </label>
                                        <input
                                            type="number"
                                            {...register('minutes')}
                                            className={`mt-1  block w-full shadow-sm sm:text-sm  rounded-md ${errors.minutes ? " border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
                                        />
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                            {errors.minutes && errors.minutes.message}
                                        </span>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="seconds" className="block text-sm font-medium text-gray-700">
                                            Seconds
                                        </label>
                                        <input
                                            type="number"
                                            {...register('seconds')}
                                            className={`mt-1  block w-full shadow-sm sm:text-sm  rounded-md ${errors.seconds ? " border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
                                        />
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                            {errors.seconds && errors.seconds.message}
                                        </span>
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700">
                                            Webhook Url
                                        </label>
                                        <input
                                            type="text"
                                            {...register('webhookUrl')}
                                            className={`mt-1  block w-full shadow-sm sm:text-sm  rounded-md ${errors.webhookUrl ? " border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
                                        />
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                            {errors.webhookUrl && errors.webhookUrl.message}
                                        </span>
                                    </div>

                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Create new
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
