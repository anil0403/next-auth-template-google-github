import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default function Home() {
  return (
    <div>
      <h1 className="text-sky-500">Next Js Template</h1>
      <button
        onClick={() => {
          signOut();
        }}
        className="bg-sky-500 p-5 border-none rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
