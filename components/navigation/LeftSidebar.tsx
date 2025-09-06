// "use client";
import React from 'react'
import NavLinks from './navbar/NavLinks'
import { Button } from '../ui/button'
import ROUTES from '@/constants/routes'
import { FORM_TYPES } from '@/enum'
import Link from 'next/link';
import Image from 'next/image';
import { auth, signOut } from '@/auth';
import { LogOut } from 'lucide-react'

const LeftSidebar = async () => {
    const session = await auth(); // Await the auth function to get the session
    const userId = session?.user?.id; // Extract user ID if session exists
    return (
        <section className='custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 h-screen flex flex-col 
        justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]'>
            <div className='flex flex-1 flex-col gap-4'>
                <NavLinks userId={userId} />
            </div>

            <div className='flex flex-col gap-3'>
                {
                    userId ? (
                        <form action={async () => {
                            'use server'
                            await signOut();
                        }}>
                            <Button type='submit' className='base-medium w-fit !bg-transparent px-4 py-3'>
                                <LogOut className='size-5 text-black dark:text-white' />
                                <span className='text-dark300_light900 max-lg:hidden'>Logout</span>
                            </Button>
                        </form>
                    ) : (
                        <>
                            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none" asChild>
                                <Link href={ROUTES.LOGIN}>
                                    <Image
                                        src={'/icons/account.svg'}
                                        width={20}
                                        height={20}
                                        alt='Account'
                                        className="invert-colors lg:hidden"
                                        title='Login'
                                    />
                                    <span className="primary-text-gradient max-lg:hidden" title={FORM_TYPES.LOGIN}>{FORM_TYPES.LOGIN}</span>
                                </Link>
                            </Button>

                            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none" asChild>
                                <Link href={ROUTES.REGISTER}>
                                    <Image
                                        src={'/icons/sign-up.svg'}
                                        width={20}
                                        height={20}
                                        alt='Register'
                                        className='invert-colors lg:hidden'
                                    />
                                    <span className='max-lg:hidden' title={FORM_TYPES.REGISTER}>{FORM_TYPES.REGISTER}</span>
                                </Link>
                            </Button>
                        </>
                    )
                }
            </div>
        </section>
    )
}

export default LeftSidebar