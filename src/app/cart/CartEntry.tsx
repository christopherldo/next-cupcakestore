"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
  handleSelectProduct: (productId: string) => void;
  isSelected: boolean;
}

export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity,
  handleSelectProduct,
  isSelected,
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
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleSelectProduct(product.id)}
            className="checkbox-primary checkbox rounded-full border-2"
          />
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={200}
            height={200}
            className="w-full max-w-xs rounded-lg"
          />
        </div>
        <div>
          <Link href={`/products/${product.id}`} className="font-bold">
            {product.name}
          </Link>
          <div className="mt-3">Preço: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantidade:
            <div className="flex items-center gap-2">
              <button
                className="btn btn-xs"
                onClick={() => {
                  startTransition(() => handleQuantityChange(quantity - 1));
                }}
                disabled={isPending}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="btn btn-xs"
                onClick={() => {
                  startTransition(() => handleQuantityChange(quantity + 1));
                }}
                disabled={isPending}
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
