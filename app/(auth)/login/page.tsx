"use client";
import AuthForm from '@/components/forms/AuthForm'
import { FORM_TYPES } from '@/enum'
import { loginWithCredentials } from '@/lib/actions/auth.action';
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
      onSubmit={loginWithCredentials}
    />
  )
}

export default Login