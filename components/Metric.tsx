import { MetricProps } from '@/types/global'
import Image from 'next/image'
import Link from 'next/link'
import { title } from 'process'
import React from 'react'

const Metric = ({
    imageUrl,
    alt,
    value,
    title,
    href,
    textStyles,
    imgStyles,
    isAuthor
}: MetricProps) => {
    const metricContent = <>
        <Image
            src={imageUrl}
            alt={alt}
            height={16}
            width={16}
            className={`rounded-full object-contain ${imgStyles}`}
        />

        <p className={`${textStyles} flex items-center gap-1`}>
            {value}
            <span className={`small-regular line-clamp-1 
            ${isAuthor ? 'max-sm:hidden' : ''}`}>
                {title}
            </span>
        </p>
    </>

    const commonClass = `flex-center gap-1`;

    return href ? (
        <Link
            href={href}
            className={commonClass}
        >
            {metricContent}
        </Link>
    ) : (
        <div className={commonClass}>{metricContent}</div>
    );
}

export default Metric