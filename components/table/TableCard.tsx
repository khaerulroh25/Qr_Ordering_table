type Table = {
  id: number;

  number: number;

  qrUrl: string;
};

type TableCardProps = {
  table: Table;

  onCopy: (url: string) => void;

  onDelete: (id: number) => void;

  onEdit: (table: Table) => void;
};

export default function TableCard({
  table,
  onCopy,
  onDelete,
  onEdit,
}: TableCardProps) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-sm
        border border-gray-100
        p-5
        hover:shadow-md
        transition
      "
    >
      {/* ICON */}
      <div
        className="
          w-14 h-14
          rounded-2xl
          bg-orange-100
          flex items-center justify-center
          text-orange-500
          text-2xl
          mb-4
        "
      >
        🍽️
      </div>

      {/* CONTENT */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Meja {table.number}</h2>

        <p className="text-sm text-gray-500 mt-1">QR Ordering Link</p>
      </div>

      {/* URL */}
      <div
        className="
          bg-gray-50
          border border-gray-100
          rounded-2xl
          p-3
          text-sm
          text-gray-600
          break-all
          mb-5
        "
      >
        {table.qrUrl}
      </div>

      {/* ACTION */}
      <div className="flex gap-2">
        <button
          onClick={() => onCopy(table.qrUrl)}
          className="
            flex-1
            bg-orange-500
            hover:bg-orange-600
            text-white
            py-3
            rounded-2xl
            font-medium
            transition
          "
        >
          Copy
        </button>

        <button
          onClick={() => onEdit(table)}
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
          onClick={() => onDelete(table.id)}
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
  );
}
