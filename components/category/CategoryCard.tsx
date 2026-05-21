type Category = {
  id: number;
  name: string;
};

type CategoryCardProps = {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
};

export default function CategoryCard({
  category,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border border-gray-100
        p-4
        flex items-center justify-between
        hover:shadow-md
        transition
      "
    >
      <div>
        <p className="font-semibold text-gray-800">{category.name}</p>

        <p className="text-sm text-gray-400 mt-1">Category Menu</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(category)}
          className="
            px-4 py-2
            rounded-xl
            bg-gray-100
            hover:bg-gray-200
            text-sm font-medium
            transition
          "
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(category.id)}
          className="
            px-4 py-2
            rounded-xl
            bg-red-100
            hover:bg-red-200
            text-red-600
            text-sm font-medium
            transition
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}
