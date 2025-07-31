import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const BUTTON_CLASS = 'background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5'

const SocialAuthForm = () => {
  return (
    <div className='mt-10 flex flex-wrap gap-2.5'>
        <Button className={BUTTON_CLASS}>
            <Image
                src="/icons/github.svg"
                alt='GitHub Logo'
                height={20}
                width={20}
                className='invert-colors mr-2.5 object-contain'
            />
            <span>Login with GitHub</span>
        </Button>

        <Button className={BUTTON_CLASS}>
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