"use server"
import Link from "next/link"
import Image from "next/image"
import { FolderOpen, LogOut } from "lucide-react"
import { auth, signIn, signOut } from "auth"
import { signOutAction, signInGoogleAction } from "@/lib/authFunctions"
import { checkUserExistAndReturn } from "@/lib/queries/checkUserExistAndReturn"
import { redirect } from "next/dist/server/api-utils"
import { notFound } from "next/navigation"

export default async function Navbar() {
  const session = await auth()
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              {/* <Link href="/deck/create">
                <span className="max-sm:hidden">Create</span>
                <FolderOpen  className="size-6 sm:hidden" />
              </Link> */}
              <Link href={`/user/${session.user.id}`}>
                <span className="max-sm:hidden">My Decks</span>
                <FolderOpen className="size-6 sm:hidden" />
              </Link>

              <form action={signOutAction}>
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              {/* <Link href={`/user/${session?.user?.name}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link> */}
            </>
          ) : (
            <form action={signInGoogleAction}>
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}
