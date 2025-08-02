"use client";

import { SheetClose } from '@/components/ui/sheet';
import { sideBarLinks } from '@/constants'
import ROUTES from '@/constants/routes';
import { cn } from '@/lib/utils';
import { NavLinkProps, SideBarLink } from '@/type'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const NavLinks = ({ isMobileNav = false }: NavLinkProps) => {
    const pathName = usePathname();
    const userId = 1;

    return (
        <>
            {sideBarLinks.map((sideBarItem: SideBarLink) => {
                const { label, imageUrl } = sideBarItem;
                let { route } = sideBarItem;

                const isActive = (pathName.includes(route) && route.length > 1) || pathName === route;

                if (route === ROUTES.PROFILE) {
                    if (userId) route = `${ROUTES.PROFILE}/${userId}`
                    else return null;
                }

                const linkClass = cn(isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900')

                const LinkComponent = (
                    <Link href={route} key={label} className={`${linkClass} flex justify-start items-center gap-4 p-4 bg-transparent`}>
                        <Image
                            src={imageUrl}
                            height={20}
                            width={20}
                            alt={label}
                            className={cn({ "invert-colors": !isActive })}
                        />
                        <p className={cn(
                            isActive ? "base-bold" : "base-medium", !isMobileNav && "max-lg:hidden"
                        )}>{label}</p>
                    </Link>
                )

                return isMobileNav ? (
                    <SheetClose asChild key={route}>
                        {LinkComponent}
                    </SheetClose>
                ) : <React.Fragment key={route}>
                    {LinkComponent}
                </React.Fragment>;
            })}
        </>
    )
}

export default NavLinks