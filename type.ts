import { FieldValues } from "react-hook-form";
import { ZodType } from "zod";

export type AuthType = 'github' | 'google';

export type FormType = 'LOGIN' | 'REGISTER';

export type LoginDefaultValues = {
    email: string,
    password: string,
}

export type RegisterDefaultValues = {
    name: string,
    username: string,
    email: string,
    password: string
}

export interface AuthFormProps<T extends FieldValues> {
    schema: ZodType<T, T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ success: boolean }>;
    formType: FormType;
}

export type NavLinkProps = {
    isMobileNav?: boolean
}

export type SideBarLink = {
    imageUrl: string,
    label: string,
    route: string
}

export type TopQuestion = {
    _id: string,
    title: string
}

export type PopularTag = {
    _id: string,
    name: string,
    questions: number,
}

export type TagProps = PopularTag & {
    showCount?: boolean,
    compact?: boolean
}