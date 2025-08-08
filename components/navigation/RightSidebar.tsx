import ROUTES from '@/constants/routes';
import { PopularTag, TopQuestion } from '@/types/global'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import TagCard from '../cards/Card';

const topQuestions: TopQuestion[] = [
    { _id: "1", title: "How to create a custom hook in React?" },
    { _id: "2", title: "How to use React Query?" },
    { _id: "3", title: "How to use Redux?" },
    { _id: "4", title: "How to use React Router?" },
    { _id: "5", title: "How to use React Context?" },
];

const popularTags: PopularTag[] = [
    { _id: "1", name: "react", questions: 100 },
    { _id: "2", name: "javascript", questions: 200 },
    { _id: "3", name: "typescript", questions: 150 },
    { _id: "4", name: "nextjs", questions: 50 },
    { _id: "5", name: "react-query", questions: 75 },
    { _id: "6", name: "redux", questions: 750 },
];

const RightSidebar = () => {
    return (
        <section className='custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 h-screen flex w-[350px]
        flex-col gap-6 justify-between overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
            <div>
                <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>

                <div className='mt-7 flex w-full flex-col gap-[30px]'>
                    {
                        topQuestions.map(({ _id, title }: TopQuestion) => (
                            <Link
                                key={_id}
                                href={ROUTES.QUESTION(_id)}
                                className='flex cursor-pointer justify-between items-center gap-7'
                            >
                                <p className='body-medium text-dark500_light700'>{title}</p>
                                <Image
                                    src={"/icons/chevron-right.svg"}
                                    alt='Chrvron'
                                    height={20}
                                    width={20}
                                    className='invert-colors'
                                />
                            </Link>
                        ))
                    }
                </div>
            </div>

            <div className='mt-2'>
                <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>

                <div className='mt-4 flex flex-col gap-5'>
                    {
                        popularTags.map(({ _id, name, questions }: PopularTag) => (
                            <TagCard
                                key={_id}
                                _id={_id}
                                name={name}
                                questions={questions}
                                showCount={true}
                                compact={true}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default RightSidebar