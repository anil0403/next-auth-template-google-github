import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import Form from "@/components/Auth/Form";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Auth = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="m-10 border-2  py-1 px-3  shadow-lg shadow-gray-200 bg-white w-[70%] md:w-[40%] lg:w-[40%] rounded-md hover:shadow-sky-500">
        <h1 className="text-center font-lg font-semibold text-gray-700 pt-5 underline">
          Next Js Template
        </h1>
        <Form />
      </div>
    </div>
  );
};

export default Auth;
