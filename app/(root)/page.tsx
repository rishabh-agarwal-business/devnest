import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import React from "react";

const Home = async () => {

  const handleLogout = async () => {
    'use server';
    await signOut({
      redirectTo: ROUTES.LOGIN
    })
  }

  return (
    <>
      <h1>Welcome to DevNext</h1>
      <form action={handleLogout}>
        <Button type="submit" className="px-10 pt-[100px]">Logout</Button>
      </form>
    </>
  );
};

export default Home;
