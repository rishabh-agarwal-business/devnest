import ROUTES from '@/constants/routes'
import { UserProps } from '@/types/global'
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import Image from 'next/image'
import Link from 'next/link'

const UserAvatar = ({ id, name, imageUrl, className = 'h-9 w-9' }: UserProps) => {
    const initials = name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    return (
        <Link href={ROUTES.PROFILE_WITH_ID(id)}>
            <Avatar className={className}>
                {
                    imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={name || 'User Avatar'}
                            width={36}
                            height={36}
                            quality={100}
                            className='rounded-full object-cover' />
                    ) : (
                        <AvatarFallback className='primary-gradient font-space-grotesk font-bold tracking-wider text-white'>
                            {initials}
                        </AvatarFallback>
                    )
                }
            </Avatar>
        </Link>)
}

export default UserAvatar