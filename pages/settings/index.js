import {signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";


export default function Settings() {
  const { data: session } = useSession();
  const router = useRouter()

  async function LogOut() {
    await router.push('/')
    await signOut()
  }
  if (session) {
    return (
      <>
        <header className="bg-white">
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-6 lg:px-8">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div className="sm:flex sm:gap-4 my-4 flex gap-6 items-center">
                <div className="flex items-center gap-6">
                  <div className="h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      alt=""
                      src={session.user.image}
                    />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {session.user.name}
                </h1>
              </div>
              <p className="mt-1.5 px-6 text-md text-gray-500 max-w-lg">
                {session.user.email}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <button
                  className="inline-flex items-center justify-center gap-1.5 rounded border border-red-200 bg-white px-5 py-3 text-red-900 transition hover:text-red-700 focus:outline-none focus:ring"
                  onClick={LogOut}
                >
                  <span className="text-sm font-medium">Log out</span>
                </button>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}
