"use client";
import AuthForm from '@/components/forms/AuthForm'
import { FORM_TYPES } from '@/enum';
import { registerWithCredentials } from '@/lib/actions/auth.action';
import { RegisterSchema } from '@/lib/validation';
import React from 'react'

const Register = () => {
  return (
    <AuthForm
      formType={FORM_TYPES.REGISTER}
      schema={RegisterSchema}
      defaultValues={{
        name: '',
        username: '',
        email: '',
        password: ''
      }}
      onSubmit={registerWithCredentials}
    />
  )
}

export default Register