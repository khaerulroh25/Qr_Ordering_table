type UserFormProps = {
  email: string;

  setEmail: (value: string) => void;

  password: string;

  setPassword: (value: string) => void;

  role: string;

  setRole: (value: string) => void;

  onSubmit: () => void;

  isEdit?: boolean;
};

export default function UserForm({
  email,
  setEmail,

  password,
  setPassword,

  role,
  setRole,

  onSubmit,

  isEdit = false,
}: UserFormProps) {
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
        {isEdit ? "Edit User" : "Tambah User"}
      </h2>

      <div className="space-y-4">
        {/* EMAIL */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Email
          </label>

          <input
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {/* PASSWORD */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {/* ROLE */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Role
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
            <option value="ADMIN">ADMIN</option>

            <option value="KASIR">KASIR</option>

            <option value="KITCHEN">KITCHEN</option>
          </select>
        </div>

        {/* BUTTON */}
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
          {isEdit ? "Update User" : "Tambah User"}
        </button>
      </div>
    </div>
  );
}
