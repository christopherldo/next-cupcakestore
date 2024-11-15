import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getAllowedUsers } from "../api/auth/allowedUsers";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const allowedUsers = await getAllowedUsers();

  const userEmail = session?.user.email ?? "";

  const isAllowedToCreate = allowedUsers.includes(userEmail);

  const cart = await getCart();

  return (
    <div className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image
              src={logo}
              height={40}
              width={40}
              alt="Doce Mania logo"
              priority
            />
            Doce Mania
          </Link>
        </div>

        <div className="flex-none gap-2">
          <ShoppingCartButton cart={cart} />
          <UserMenuButton
            session={session}
            isAllowedToCreate={isAllowedToCreate}
          />
        </div>
      </div>
    </div>
  );
}
