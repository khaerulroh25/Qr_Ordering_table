type Menu = {
  id: number;
  name: string;
  price: number;
  image?: string;
  categoryId: number;
  category?: {
    name: string;
  };
};

type MenuCardProps = {
  menu: Menu;

  onEdit: (menu: Menu) => void;

  onDelete: (id: number) => void;
};

export default function MenuCard({ menu, onEdit, onDelete }: MenuCardProps) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-sm
        border border-gray-100
        hover:shadow-lg
        transition
      "
    >
      {/* IMAGE */}
      <div className="h-48 bg-gray-200">
        <img
          src={menu.image || "https://placehold.co/600x400"}
          alt={menu.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800">{menu.name}</h2>

          <p className="text-sm text-gray-500 mt-1">{menu.category?.name}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-orange-500">
            Rp {menu.price.toLocaleString("id-ID")}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(menu)}
              className="
                px-4 py-2
                rounded-2xl
                bg-gray-100
                hover:bg-gray-200
                text-sm
                font-medium
                transition
              "
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(menu.id)}
              className="
                px-4 py-2
                rounded-2xl
                bg-red-100
                hover:bg-red-200
                text-red-600
                text-sm
                font-medium
                transition
              "
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
