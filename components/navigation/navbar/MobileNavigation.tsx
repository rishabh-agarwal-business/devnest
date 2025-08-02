import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FORM_TYPES } from '@/enum'
import ROUTES from '@/constants/routes'
import NavLinks from './NavLinks'

const MobileNavigation = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Image
                    src={'/icons/hamburger.svg'}
                    height={36}
                    width={36}
                    alt='Menu'
                    className='invert-colors sm:hidden'
                />
            </SheetTrigger>
            <SheetContent side={'left'} className='background-light900_dark200 border-none'>
                <SheetTitle className='hidden'>Navigation</SheetTitle>
                <Link href={"/"} className='flex items-center gap-1'>
                    <Image
                        src={'/images/site-logo.svg'}
                        height={23}
                        width={23}
                        alt='Logo'
                    />
                    <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
                        Dev<span className="text-primary-500">Nest</span>
                    </p>
                </Link>

                <div className='no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto'>
                    <SheetClose asChild>
                        <section className='flex h-full flex-col gap-6 pt-16'>
                            <NavLinks isMobileNav />
                        </section>
                    </SheetClose>

                    <div className='flex flex-col gap-3'>
                        <SheetClose asChild>
                            <Link href={ROUTES.LOGIN}>
                                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                                    <span className="primary-text-gradient">{FORM_TYPES.LOGIN}</span>
                                </Button>
                            </Link>
                        </SheetClose>

                        <SheetClose asChild>
                            <Link href={ROUTES.REGISTER}>
                                <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                                    {FORM_TYPES.REGISTER}
                                </Button>
                            </Link>
                        </SheetClose>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNavigation