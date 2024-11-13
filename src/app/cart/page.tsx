import { getCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";

import { clearManyProducts, setProductQuantity } from "./actions";
import Cart from "./Cart";

export const metadata = {
  title: "Seu Carrinho - Doce Mania",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div className="flex w-full flex-col justify-center">
      <Cart
        cart={cart}
        setProductQuantity={setProductQuantity}
        clearManyProducts={clearManyProducts}
      />
      {!cart?.items.length && <p>Seu carrinho está vazio.</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button
          className="btn btn-primary sm:w-[200px]"
          disabled={!cart?.subtotal || !cart?.items.length}
        >
          Finalizar a Compra
        </button>
      </div>
    </div>
  );
}
