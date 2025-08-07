'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/url'

const filters = [
    { name: 'Newest', value: 'newest' },
    { name: 'Popular', value: 'popular' },
    { name: 'Unanswered', value: 'unanswered' },
    { name: 'Recomended', value: 'recomended' },
    { name: 'JavaScript', value: 'javascript' },
    { name: 'React', value: 'react' },
]

const HomeFilter = () => {
    const router = useRouter();
    const params = useSearchParams();
    const filterParams = params.get('filter') || '';
    const [active, setActive] = useState<string>(filterParams || '');

    const handleTypeClick = (filter: string) => {
        let newUrl: string = '';
        if (filter === active) {
            setActive('');
            newUrl = removeKeysFromQuery({
                params: params.toString(),
                keysToRemove: ['filter']
            });
        }
        else {
            setActive(filter);
            newUrl = formUrlQuery({
                params: params.toString(),
                key: 'filter',
                value: filter.toLowerCase()
            });
        }
        router.push(newUrl, { scroll: false });
    }

    const activeClass = `bg-primary-100 text-primary-900 hover:bg-primary-100 
        dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400`;
    const nonActiveClass = `bg-light-800 text-light-500 hover:bg-light-800 
        dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300`;

    return (
        <div className='mt-10 hidden flex-wrap gap-3 sm:flex'>
            {
                filters.map((filter) => (
                    <Button
                        key={filter.name}
                        className={cn(`body-medium rounded-lg px-3 py-3 
                        capitalize shadow-none`, active === filter.value
                            ? activeClass
                            : nonActiveClass)}
                        onClick={() => handleTypeClick(filter.value)}
                    >
                        {filter.name}
                    </Button>
                ))
            }
        </div>
    )
}

export default HomeFilter