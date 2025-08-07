"use client";
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image';
import { SearchProps } from '@/type';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/url';

const LocalSearch = ({ route, imgSrc, placeholder, otherClasses }: SearchProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';

    const [searchQuery, setSearchQuery] = useState(query);

    useEffect(() => {
        const searchQueryFn = () => {
            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'query',
                    value: searchQuery
                });

                router.push(newUrl, { scroll: false })
            } else {
                if (pathname === route) {
                    const newUrl = removeKeysFromQuery({
                        params: searchParams.toString(),
                        keysToRemove: ['query']
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }

        const debounced = setTimeout(() => searchQueryFn(), 500);

        return () => clearTimeout(debounced);
    }, [searchParams, router, route, searchQuery, pathname]);

    return (
        <div className={`background-light800_darkgradient flex min-h-[56px]
        grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}>
            <Image
                src={imgSrc}
                height={24}
                width={24}
                alt='Search'
                className='cursor-pointer'
            />
            <Input
                type='text'
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value) }}
                className='paragraph-regular no-focus placeholder border-none
                text-dark400_light700 shadow-none outline-none'
            />

        </div>
    )
}

export default LocalSearch