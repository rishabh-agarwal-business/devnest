import { FieldValues } from "react-hook-form";
import { ZodType } from "zod";
// import ROUTES from "@/constants/routes";
import ROUTES from "@/constants/routes";

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
    questions?: number,
}

export type TagProps = PopularTag & {
    showCount?: boolean,
    compact?: boolean
}

export interface SearchProps {
    route: RouteType;
    imgSrc: string;
    placeholder: string;
    otherClasses?: string;
}

type StaticRouteKeys = {
    [K in keyof typeof ROUTES]: typeof ROUTES[K] extends string ? K : never;
}[keyof typeof ROUTES];

export type RouteType = typeof ROUTES[StaticRouteKeys];

export type UrlFormQUeryParams = {
    params: string;
    key: string;
    value: string;
}

export type UrlRemoveQueryParams = {
    params: string;
    keysToRemove: string[];
}

export interface SearchParams {
    searchParams: Promise<{ [key: string]: string }>
}

export type Author = {
    _id: string;
    name: string;
    image?: string;
}

export type Tag = {
    _id: string;
    name: string;
    image?: string;
}

export interface Question {
    _id: string;
    title: string;
    description: string;
    author: Author;
    tags: Tag[];
    upvotes: number;
    downvotes: number;
    views: number;
    answers: number;
    createdAt: Date;
}

export type QuestionProps = {
    question: Question;
}

export interface MetricProps {
    imageUrl: string;
    alt: string;
    value: number | string;
    title: string;
    href?: string;
    textStyles: string;
    imgStyles?: string;
    isAuthor?: boolean;
}