type Category = {
  id: number;
  name: string;
};

type MenuFormProps = {
  name: string;
  setName: (value: string) => void;

  price: string;
  setPrice: (value: string) => void;

  categoryId: string;
  setCategoryId: (value: string) => void;

  categories: Category[];

  image: File | null;
  setImage: (file: File | null) => void;

  previewImage: string;
  setPreviewImage: (value: string) => void;

  onSubmit: () => void;

  isEdit?: boolean;
};

export default function MenuForm({
  name,
  setName,

  price,
  setPrice,

  categoryId,
  setCategoryId,

  categories,

  image,
  setImage,

  previewImage,
  setPreviewImage,

  onSubmit,

  isEdit = false,
}: MenuFormProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-5">
        {isEdit ? "Edit Menu" : "Tambah Menu"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* NAMA MENU */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Nama Menu
          </label>

          <input
            placeholder="Contoh: Nasi Goreng"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full
              border border-gray-200
              rounded-2xl
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-orange-400
              transition
            "
          />
        </div>

        {/* HARGA */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Harga
          </label>

          <input
            type="number"
            placeholder="25000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="
              w-full
              border border-gray-200
              rounded-2xl
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-orange-400
              transition
            "
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Category
          </label>

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="
              w-full
              border border-gray-200
              rounded-2xl
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-orange-400
              transition
            "
          >
            <option value="">Pilih category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* IMAGE */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Upload Gambar
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setImage(file);

                setPreviewImage(URL.createObjectURL(file));
              }
            }}
            className="
              w-full
              border border-dashed border-gray-300
              rounded-2xl
              p-4
              bg-gray-50
              text-sm text-gray-500
            "
          />
        </div>

        {/* PREVIEW */}
        {previewImage && (
          <div className="md:col-span-2">
            <img
              src={previewImage}
              alt="Preview"
              className="
                w-full
                h-60
                object-cover
                rounded-2xl
              "
            />
          </div>
        )}

        {/* BUTTON */}
        <div className="md:col-span-2">
          <button
            onClick={onSubmit}
            className="
              w-full
              bg-orange-500
              hover:bg-orange-600
              active:scale-[0.99]
              text-white
              py-3
              rounded-2xl
              font-semibold
              shadow-sm
              transition-all
            "
          >
            {isEdit ? "Update Menu" : "Tambah Menu"}
          </button>
        </div>
      </div>
    </div>
  );
}
