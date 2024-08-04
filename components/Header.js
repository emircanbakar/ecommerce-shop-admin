import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const { pathname } = router;

  const active =
    "text-blue-500 transtition hover:text-blue-600 p-2 rounded bg-gray-200";
  const inactive = "text-gray-500";

  if (session) {
    return (
      <>
        <header className="border-b border-gray-200 sticky top-0">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="md:flex md:items-center md:gap-12">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  NOON-Admin
                </h1>
              </div>

              <div className="hidden md:block">
                <nav aria-label="Global">
                  <ul className="flex items-center gap-6 text-sm">
                    <li>
                      <Link
                        href="#"
                        className={
                          location.pathname === "/" ? active : inactive
                        }
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className={
                          location.pathname === "/products" ? active : inactive
                        }
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className={
                          location.pathname === "/categories"
                            ? active
                            : inactive
                        }
                      >
                        Categories
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className={
                          location.pathname === "/orders" ? active : inactive
                        }
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className={
                          location.pathname === "/settings" ? active : inactive
                        }
                      >
                        Settings
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="flex items-center gap-4">
                <div class="h-10 w-10">
                  <img
                    class="h-full w-full rounded-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1645378999013-95abebf5f3c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    // src={session.user.image}
                  />
                </div>
              </div>
              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}
