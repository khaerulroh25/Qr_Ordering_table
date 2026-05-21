import { Suspense } from "react";

import MenuContent from "@/components/menu/MenuContent";

export const dynamic = "force-dynamic";

export default function MenuPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MenuContent />
    </Suspense>
  );
}
