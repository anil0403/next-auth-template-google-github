import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";

// route protection
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
  const { data } = useCurrentUser();
  console.log(data);
  return (
    <div className="w-full mx-auto margin-10">
      <div>
        <h1 className="text-sky-500">Next Js Template</h1>
        <h1>Current User :</h1>
        <p>{data?.name}</p>
        <p>{data?.email}</p>
        <button
          onClick={() => {
            signOut();
          }}
          className="bg-sky-500 p-5 border-none rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}


