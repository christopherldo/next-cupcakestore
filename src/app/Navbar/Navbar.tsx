import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getAllowedUsers } from "../api/auth/allowedUsers";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

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
          <form action={searchProducts}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                placeholder="Buscar"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>

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
