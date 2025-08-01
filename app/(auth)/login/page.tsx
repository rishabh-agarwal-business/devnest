"use client";
import AuthForm from '@/components/forms/AuthForm'
import { FORM_TYPES } from '@/enum'
import { LoginSchema } from '@/lib/validation';
import React from 'react'

const Login = () => {
  return (
    <AuthForm
      formType={FORM_TYPES.LOGIN}
      schema={LoginSchema}
      defaultValues={{
        email: '',
        password: ''
      }}
      onSubmit={(data) => Promise.resolve({
        success: true,
        data
      })}
    />
  )
}

export default Login