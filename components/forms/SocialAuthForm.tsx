"use client";
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { AUTH_TYPE } from '@/type'
import { LOGIN_TYPES } from '@/enum'
import { signIn } from 'next-auth/react';
import ROUTES from '@/constants/routes';
import { toast } from 'sonner';

const BUTTON_CLASS = 'background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5'

const SocialAuthForm = () => {
    const handleLogin = async (provider: AUTH_TYPE) => {
        try {
            await signIn(provider, {
                callbackUrl: ROUTES.HOME
            });
        } catch (error) {
            console.log(error);
            toast.error("Login Failed", {
                description: error instanceof Error ? error.message : 'An error occurred during login',
            })
        }
    }

    return (
        <div className='mt-10 flex flex-wrap gap-2.5'>
            <Button className={BUTTON_CLASS} onClick={() => handleLogin(LOGIN_TYPES.GITHUB)}>
                <Image
                    src="/icons/github.svg"
                    alt='GitHub Logo'
                    height={20}
                    width={20}
                    className='invert-colors mr-2.5 object-contain'
                />
                <span>Login with GitHub</span>
            </Button>

            <Button className={BUTTON_CLASS} onClick={() => handleLogin(LOGIN_TYPES.GOOGLE)}>
                <Image
                    src="/icons/google.svg"
                    alt='Google Logo'
                    height={20}
                    width={20}
                    className='mr-2.5 object-contain'
                />
                <span>Login with Google</span>
            </Button>
        </div>
    )
}

export default SocialAuthForm