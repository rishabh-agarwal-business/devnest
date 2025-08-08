import ROUTES from '@/constants/routes'
import { TagProps } from '@/types/global'
import Link from 'next/link'
import React from 'react'
import { Badge } from '../ui/badge'
import { getDeviconClassName } from '@/lib/utils'

const TagCard = ({ _id, name, questions, compact, showCount }: TagProps) => {
    const iconClass = `${getDeviconClassName(name)} text-sm`;
    return (
        <Link
            href={ROUTES.TAG_WITH_ID(_id)}
            className='flex justify-between gap-2'
        >
            <Badge className='subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase'>
                <div className='flex-center space-x-2'>
                    <i className={iconClass}></i>
                    <span>{name}</span>
                </div>
            </Badge>

            {
                showCount && (
                    <p className='small-medium text-dark500_light700'>{questions}</p>
                )
            }
        </Link>
    )
}

export default TagCard