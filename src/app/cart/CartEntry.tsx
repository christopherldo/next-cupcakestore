"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity,
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0) {
      startTransition(async () => {
        await setProductQuantity(product.id, newQuantity);
      });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Link href={`/products/${product.id}`} className="font-bold">
            {product.name}
          </Link>
          <div className="mt-3">Preço: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantidade:
            <div className="flex items-center gap-2">
              <button
                className="btn btn-outline btn-sm"
                disabled={isPending || quantity <= 0}
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="btn btn-outline btn-sm"
                disabled={isPending}
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div
            className={`flex items-center gap-3 ${isPending && "opacity-50"}`}
          >
            Total: {formatPrice(product.price * quantity)}
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
