"use client";
import { useState } from "react";
import { API } from "@/lib/api";

export default function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const login = async () => {
    const res = await fetch(`${API}/admin/login`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({email,password})
    });

    const data = await res.json();

    if(data.success){
      localStorage.setItem("token", data.token);
      window.location.href="/admin/dashboard";
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white p-8 shadow rounded">
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)} className="border p-2 mb-2 w-full"/>
        <input type="password" onChange={e=>setPassword(e.target.value)} className="border p-2 mb-2 w-full"/>
        <button onClick={login} className="bg-black text-white px-4 py-2 w-full">
          Login
        </button>
      </div>
    </div>
  );
}