'use client'
import { useState } from "react";
import axios from "axios";

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
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type='text' 
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type='email' 
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}
