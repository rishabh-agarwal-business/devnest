"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthFormProps } from "@/types/global"
import { BUTTON_STATES, FORM_TYPES, INPUT_TYPES, RENDER_TYPES } from "@/enum"
import { appendText, capitalizeFirstLetter } from "@/lib/utils"
import Link from "next/link"
import ROUTES from "@/constants/routes"

const AuthForm = <T extends FieldValues>({
    formType,
    schema,
    defaultValues,
    onSubmit
}: AuthFormProps<T>) => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>
    })

    const handleSubmit: SubmitHandler<T> = async => {
        // TODO: Authenticate User
    };

    const buttonText = formType === FORM_TYPES.LOGIN ? FORM_TYPES.LOGIN : FORM_TYPES.REGISTER;

    const isLogin = formType === FORM_TYPES.LOGIN;

    const authToggleText = isLogin ? "Don't have an account?" : "Already have an account?";
    const authToggleLink = isLogin ? FORM_TYPES.REGISTER : FORM_TYPES.LOGIN;
    const authToggleRoute = isLogin ? ROUTES.REGISTER : ROUTES.LOGIN;

    const toggleAuthLink = (
        <p>
            {authToggleText}{" "}
            <Link className="paragraph-semibold primary-text-gradient" href={authToggleRoute}>
                {capitalizeFirstLetter(authToggleLink)}
            </Link>
        </p>
    );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-4 space-y-4">
                {
                    Object.keys(defaultValues).map((field, i) => (
                        <FormField
                            key={field}
                            control={form.control}
                            name={field as Path<T>}
                            render={({ field }) => (
                                <FormItem className="flex w-full flex-col gap-2.5">
                                    <FormLabel className="paragraph-medium text-dark400_light700">
                                        {field.name === INPUT_TYPES.EMAIL ? RENDER_TYPES.EMAIL : capitalizeFirstLetter(field.name)}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type={field.name === INPUT_TYPES.PASSWORD ? RENDER_TYPES.PASSWORD : RENDER_TYPES.TEXT}
                                            placeholder={appendText(field.name)}
                                            {...field}
                                            className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border italic"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))
                }
                <Button
                    disabled={form.formState.isSubmitting}
                    className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
                >
                    {
                        form.formState.isSubmitting
                            ? buttonText === FORM_TYPES.LOGIN ? BUTTON_STATES.LOGIN : BUTTON_STATES.REGISTER
                            : buttonText.toLocaleUpperCase()
                    }
                </Button>
                {toggleAuthLink}
            </form>
        </Form>
    )
}

export default AuthForm;