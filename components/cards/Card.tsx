import ROUTES from '@/constants/routes'
import { TagProps } from '@/types/global'
import Link from 'next/link'
import React from 'react'
import { Badge } from '../ui/badge'
import { getDeviconClassName } from '@/lib/utils'
import Image from 'next/image'

const TagCard = ({ _id, name, questions, compact, remove, handleRemove, isButton, showCount }: TagProps) => {
    const iconClass = `${getDeviconClassName(name)} text-sm`;

    const preventButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
    }

    const content = (
        <>
            <Badge className='subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 
            uppercase flex flex-row gap-2'>
                <div className='flex-center space-x-2'>
                    <i className={iconClass}></i>
                    <span>{name}</span>
                </div>

                {remove && (
                    <Image
                        src={'/icons/close.svg'}
                        width={12}
                        height={12}
                        alt='Close Icon'
                        className='cursor-pointer object-contain invert-0 dark:invert'
                        onClick={handleRemove}
                    />
                )}
            </Badge>
            {
                showCount && (
                    <p className='small-medium text-dark500_light700'>{questions}</p>
                )
            }
        </>
    )

    if (compact) {
        return isButton ? (
            <button onClick={(e) => preventButtonClick(e)} className='flex justify-between gap-2'>
                {content}
            </button>
        ) : (
            <Link href={ROUTES.TAG_WITH_ID(_id)} className='flex justify-between gap-2'>
                {content}
            </Link >
        )
    }
}

export default TagCard