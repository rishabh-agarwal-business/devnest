"use client";
import AuthForm from '@/components/forms/AuthForm'
import { FORM_TYPES } from '@/enum';
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
      onSubmit={(data) => Promise.resolve({
        success: true,
        data
      })}
    />
  )
}

export default Register