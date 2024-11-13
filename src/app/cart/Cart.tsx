"use client";

import { ShoppingCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { useState, useTransition } from "react";

interface CartProps {
  cart: ShoppingCart | null;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
  clearManyProducts: (productsIds: string[]) => Promise<void>;
}

export default function Cart({
  cart,
  setProductQuantity,
  clearManyProducts,
}: CartProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductsIds((prevIds) =>
      prevIds.includes(productId)
        ? prevIds.filter((id) => id !== productId)
        : [...prevIds, productId],
    );
  };

  const handleClearSelectedProducts = () => {
    startTransition(async () => {
      await clearManyProducts(selectedProductsIds);
      setSelectedProductsIds([]);
    });
  };

  const toggleSelectAll = () => {
    if (selectedProductsIds.length === cart?.items.length) {
      setSelectedProductsIds([]);
    } else {
      setSelectedProductsIds(cart?.items.map((item) => item.product.id) || []);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">Carrinho</h1>
        <div className="flex justify-between">
          {cart && cart.items.length > 0 && (
            <button
              className="flex flex-row items-center gap-2"
              onClick={toggleSelectAll}
            >
              <input
                type="checkbox"
                checked={selectedProductsIds.length === cart?.items.length}
                onChange={() => {}}
                className="checkbox-error checkbox rounded-full"
              />
              <span className="w-32">Selecionar Tudo</span>
            </button>
          )}
          {selectedProductsIds.length > 0 && (
            <>
              <div className="divider divider-horizontal" />
              <button
                className="btn btn-outline flex max-w-xs flex-1 items-center gap-2"
                onClick={handleClearSelectedProducts}
                disabled={isPending}
              >
                {isPending ? (
                  <svg
                    className="h-5 w-5 animate-spin text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.411 2.865 8.166 6.835 9.709l1.165-2.418z"
                    ></path>
                  </svg>
                ) : (
                  "Limpar Selecionados"
                )}
              </button>
            </>
          )}
        </div>
      </div>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
          handleSelectProduct={handleSelectProduct}
          isSelected={selectedProductsIds.includes(cartItem.product.id)}
        />
      ))}
    </>
  );
}
