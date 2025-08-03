'use client'
import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Panel from "@/components/ui/panel";
import Header from "@/components/ui/header";

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (ev:React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    try {
      const response = await axios.post('api/users', {name,email});
      console.log(response, "RESP")
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Panel className="fixed w-[30%] top-[50%] translate-y-[-50%]">
      <Header title="Welcome Back!" desc="Sign in to continue your quizz journey"/>
      <form onSubmit={handleSubmit}>
        <div>
          <Label className="mb-3">Name:</Label>
          <Input 
            type='text' 
            value={name}
            placeholder="Your fullname"
            onChange={(ev) => setName(ev.target.value)}
            className="mb-3"
          />
        </div>
        <div>
          <Label className="mb-3">Email:</Label>
          <Input 
            type='email' 
            value={email}
            placeholder="Your email"
            onChange={(ev) => setEmail(ev.target.value)}
            className="mb-3"
          />
        </div>
        <div>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </Panel>
  );
}
