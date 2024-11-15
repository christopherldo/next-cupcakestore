"use client";

import { ShoppingCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";

interface CartProps {
  cart: ShoppingCart | null;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
  clearManyProducts: (productsIds: string[]) => Promise<void>;
}

export default function Cart({ cart, setProductQuantity }: CartProps) {
  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">Carrinho</h1>
      </div>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
    </>
  );
}
