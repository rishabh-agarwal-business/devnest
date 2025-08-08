import ROUTES from '@/constants/routes';
import { getTimeStamp } from '@/lib/utils';
import { QuestionProps, Tag } from '@/types/global'
import Link from 'next/link';
import React from 'react';
import TagCard from './Card';
import Metric from '../Metric';

const QuestionCard = ({ question }: QuestionProps) => {
    const { _id, title, description, upvotes, downvotes, answers,
        author, createdAt, tags, views } = question;
    return (
        <div className='card-wrapper rounded-[10px] p-9
        sm:px-11'>
            <div className='flex flex-col-reverse items-start
            justify-between gap-5 sm:flex-row'>
                <div>
                    <span className='subtle-regular text-dark400_light700 
                    line-clamp-1 flex sm:hidden'>
                        {getTimeStamp(createdAt)}
                    </span>

                    <Link
                        href={ROUTES.QUESTION(_id)}
                        className='cursor-pointer'
                    >
                        <h3 className='sm:h3-semibold base-semibold 
                    text-dark200_light900 line-clamp-1 flex-1'>
                            {title}
                        </h3>
                    </Link>
                </div>
            </div>

            <div className='mt-3.5 flex w-full flex-wrap gap-2'>
                {tags.map((tag: Tag) => (
                    <TagCard
                        key={tag._id}
                        _id={tag._id}
                        name={tag.name}
                        compact
                    />
                ))}
            </div>

            <div className='flex-between mt-6 w-full flex-wrap gap-3'>
                <Metric
                    imageUrl={author.image ?? ''}
                    alt={author.name}
                    value={author.name}
                    title={`asked ${getTimeStamp(createdAt)} ago`}
                    href={ROUTES.PROFILE_WITH_ID(author._id)}
                    textStyles='body-medium text-dark400_light700'
                    isAuthor
                />

                <div className='flex items-center gap-3 max-sm:flex-wrap 
                max-sm:justify-start'>
                    <Metric
                        imageUrl={'/icons/like.svg'}
                        alt={'Like'}
                        title='Votes'
                        value={upvotes}
                        textStyles='small-medium text-dark400_light800'
                    />

                    <Metric
                        imageUrl={'/icons/message.svg'}
                        alt={'Answers'}
                        title='Answers'
                        value={answers}
                        textStyles='small-medium text-dark400_light800'
                    />

                    <Metric
                        imageUrl={'/icons/eye.svg'}
                        alt={'eye'}
                        title='Views'
                        value={views}
                        textStyles='small-medium text-dark400_light800'
                    />
                </div>
            </div>
        </div>
    )
}

export default QuestionCard