import { signOut } from "@/auth";
import ROUTES from "@/constants/routes";
import React from "react";

const Home = async () => {

  const handleLogout = async () => {
    'use server';
    await signOut({
      redirectTo: ROUTES.LOGIN
    })
  }

  return (<>
    <h1>Welcome to DevNext</h1>
  </>)
};

export default Home;
