import { Suspense } from "react";

import CartContent from "@/components/cart/CartContent";

export const dynamic = "force-dynamic";

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartContent />
    </Suspense>
  );
}
