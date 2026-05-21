type TableFormProps = {
  number: string;

  setNumber: (value: string) => void;

  onSubmit: () => void;

  isEdit?: boolean;
};

export default function TableForm({
  number,
  setNumber,
  onSubmit,
  isEdit = false,
}: TableFormProps) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-sm
        border border-gray-100
        p-6
        mb-8
      "
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-5">
        {isEdit ? "Edit Meja" : "Tambah Meja"}
      </h2>

      <div className="flex flex-col md:flex-row gap-3">
        {/* INPUT */}
        <input
          placeholder="Contoh: 1"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="
            flex-1
            border border-gray-200
            rounded-2xl
            px-4 py-3
            outline-none
            focus:ring-2
            focus:ring-orange-400
            transition
          "
        />

        {/* BUTTON */}
        <button
          onClick={onSubmit}
          className="
            bg-orange-500
            hover:bg-orange-600
            active:scale-[0.98]
            text-white
            px-6
            py-3
            rounded-2xl
            font-semibold
            shadow-sm
            transition-all
          "
        >
          {isEdit ? "Update" : "Tambah"}
        </button>
      </div>
    </div>
  );
}
