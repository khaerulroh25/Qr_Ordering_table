type CategoryFormProps = {
  name: string;
  setName: (value: string) => void;
  onSubmit: () => void;
  isEdit?: boolean;
};

export default function CategoryForm({
  name,
  setName,
  onSubmit,
  isEdit = false,
}: CategoryFormProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {isEdit ? "Edit Category" : "Tambah Category"}
      </h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama category"
          className="
            flex-1
            border border-gray-200
            rounded-2xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-orange-400
            focus:border-orange-400
            transition
          "
        />

        <button
          onClick={onSubmit}
          className="
            bg-orange-500
            hover:bg-orange-600
            active:scale-95
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
