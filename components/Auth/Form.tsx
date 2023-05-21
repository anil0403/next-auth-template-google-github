"use client";
import { useCallback, useState } from "react";
import Input from "./Input";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { z } from "zod";

import { AiOutlineGoogle, AiOutlineGithub } from "react-icons/ai";
import axios from "axios";

const Form = () => {
  const router = useRouter();
  const [variant, setVariant] = useState("login");
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  // const errorMessage: Array<string> = [];

  const formSchema = z.object({
    name: z
      .string()
      .min(2, "Username should have at least 2 characters")
      .max(50, "Username should not exceed 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password should have at least 6 characters"),
  });

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      const status = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      console.log(status);
      if (!status?.error) router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  //register

  const register = useCallback(async () => {
    try {
      const validatedData = formSchema.parse({ name, email, password });
      console.log(validatedData);
      await axios.post("api/register", validatedData);
      setErrorMessage([]);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Extract the individual field errors
        const fieldErrors = error.errors.map(
          (validationError) => validationError.message
        );
        setErrorMessage(fieldErrors);
      }
    }
    setUsername("");
    setEmail("");
    setPassword("");
  }, [email, name, password]);

  return (
    <div className=" px-5 py-5 transition">
      <h1 className="text-3xl font-bold text-sky-500 pb-5">
        {variant === "login" ? "Login" : "Sign Up"}{" "}
      </h1>
      <div className="flex flex-col gap-5">
        {variant === "register" && (
          <Input
            label="Username"
            id="username"
            type="text"
            value={name}
            onChange={(e: any) => {
              setUsername(e.target.value);
            }}
          />
        )}

        <Input
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        <div className="-mt-2 -mb-3">
          {variant !== "login" &&
            errorMessage &&
            errorMessage.map((error, i) => (
              <p
                className="text-[12px] font-semibold  text-red-600 m-0 p-0 "
                key={i + 1}
              >
                {" "}
                {error}{" "}
              </p>
            ))}
        </div>

        <button
          onClick={variant === "login" ? login : register}
          className="w-full bg-sky-500 py-2 mt-3 rounded-md text-lg font-semibold text-white hover:bg-sky-600"
        >
          {variant === "login" ? "Login" : "Register"}
        </button>
        <div className="flex flex-row gap-5 justify-center">
          <AiOutlineGoogle
            className="hover:bg-gray-500 cursor-pointer rounded-full mt-1 p-2 "
            size={40}
            onClick={() => {
              signIn("google", { callbackUrl: "/" });
            }}
          />
          <AiOutlineGithub
            className="hover:bg-gray-500 cursor-pointer rounded-full p-2"
            size={40}
            onClick={() => {
              signIn("github", { callbackUrl: "/" });
            }}
          />
        </div>
        <p
          onClick={toggleVariant}
          className="text-center text-sm hover:underline cursor-pointer"
        >
          {variant === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="font-semibold">
            {variant === "login" ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Form;
