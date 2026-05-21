import Link from "next/link";

type HeaderProps = {
  table: string | null;
  totalCart?: number;
  onCartClick?: () => void;
};

export default function Header({ table, totalCart, onCartClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Nama */}
        <Link href={`/menu?table=${table}`} className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              R
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800">RestoKu</h1>

              <p className="text-sm text-gray-500">Meja #{table}</p>
            </div>
          </div>
        </Link>

        {/* Cart */}
        {totalCart !== undefined && (
          <button
            onClick={onCartClick}
            className="
              bg-orange-500 
              hover:bg-orange-600 
              active:scale-95
              text-white 
              px-5 
              py-2.5 
              rounded-2xl 
              font-semibold 
              shadow-md 
              transition-all 
              duration-200
              flex items-center gap-2
            "
          >
            <span className="text-lg">🛒</span>
            <span>{totalCart}</span>
          </button>
        )}
      </div>
    </header>
  );
}
