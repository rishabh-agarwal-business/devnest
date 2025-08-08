"use client"
import { AskQuestion } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { SIDEBAR_LABELS } from '@/enum'
import { appendText } from '@/lib/utils'
import { Button } from '../ui/button'
import { MDXEditorMethods } from '@mdxeditor/editor'
import dynamic from 'next/dynamic'
import z from 'zod';
import TagCard from '../cards/Card'
import { Tag } from '@/types/global'

const Editor = dynamic(() => import('@/components/editor'), {
    ssr: false
});

const QuestionForm = () => {
    const editorRef = useRef<MDXEditorMethods>(null);
    const form = useForm<z.infer<typeof AskQuestion>>({
        resolver: zodResolver(AskQuestion),
        defaultValues: {
            title: '',
            content: '',
            tags: []
        }
    });

    const handleTagRemove = (tag: string, field: { value: string[] }) => {
        const newTags = field.value.filter((currentTag) => currentTag !== tag);
        form.setValue('tags', newTags);

        if (newTags.length === 0) {
            form.setError('tags', {
                type: 'manual',
                message: 'Tags are required.'
            })
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>,
        field: { value: string[] }) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const tagInput = e.currentTarget.value.trim();

            if (tagInput && tagInput.length <= 15 && !field.value.includes(tagInput)) {
                form.setValue('tags', [...field.value, tagInput]);
                e.currentTarget.value = '';
                form.clearErrors('tags');
            } else if (tagInput.length > 15) {
                form.setError('tags', {
                    type: 'manual',
                    message: 'Tag should be less than 15 characters.'
                })
            } else if (field.value.includes(tagInput)) {
                form.setError('tags', {
                    type: 'manual',
                    message: 'Tag already exists.'
                })
            }
        }
    }

    const createQuestion = (data: z.infer<typeof AskQuestion>) => {
        console.log(data)
    }

    return <Form {...form}>
        <form
            className='flex w-full flex-col gap-10'
            onSubmit={form.handleSubmit(createQuestion)}
        >
            <FormField
                control={form.control}
                name={'title'}
                render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                        <FormLabel className="paragraph-semibold text-dark400_light800">
                            Question Title <span className='text-primary-500'>*</span>
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder={appendText(field.name)}
                                {...field}
                                className="paragraph-regular background-light700_dark300 
                                light-border-2 text-dark300_light700 no-focus min-h-[56px] 
                                border italic"
                            />
                        </FormControl>
                        <FormDescription className='body-regular text-light-500 mt-2.5'>
                            Provide enough detail so the person reading knows exactly what you’re asking.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField control={form.control}
                name={'content'}
                render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                        <FormLabel className="paragraph-semibold text-dark400_light800">
                            Detailed explanation of your problem {" "}
                            <span className='text-primary-500'>*</span>
                        </FormLabel>
                        <FormControl>
                            <Editor
                                editorRef={editorRef}
                                value={field.value}
                                fieldChange={field.onChange}
                            />
                        </FormControl>
                        <FormDescription className='body-regular text-light-500 mt-2.5'>
                            Give background, context, and any relevant examples or code so others can fully understand your situation.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField control={form.control}
                name={'tags'}
                render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                        <FormLabel className="paragraph-semibold text-dark400_light800">
                            Tags <span className='text-primary-500'>*</span>
                        </FormLabel>
                        <FormControl>
                            <div>
                                <Input
                                    placeholder={'Add tags...'}
                                    className="paragraph-regular background-light700_dark300 
                                light-border-2 text-dark300_light700 no-focus min-h-[56px] 
                                border italic"
                                    onKeyDown={(e) => handleKeyDown(e, field)}
                                />
                                {
                                    field.value.length > 0 && (
                                        <div className='flex-start mt-2.5 flex-wrap gap-2.5'>
                                            {
                                                field.value.map((tag: string) => <TagCard
                                                    key={tag}
                                                    _id={tag}
                                                    name={tag}
                                                    compact
                                                    remove
                                                    isButton
                                                    handleRemove={() => handleTagRemove(tag, field)}
                                                />)
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </FormControl>
                        <FormDescription className='body-regular text-light-500 mt-2.5'>
                            Add up to 3 tags to describe what your question is about. You need
                            to press enter to add tag.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className='mt-2 flex justify-end'>
                <Button
                    type='submit'
                    className='primary-gradient !text-light-900 w-fit'
                >
                    {SIDEBAR_LABELS.ASK_QUESTION}
                </Button>
            </div>
        </form>
    </Form>
}

export default QuestionForm