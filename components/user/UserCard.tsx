type User = {
  id: number;

  email: string;

  role: string;
};

type UserCardProps = {
  user: User;

  onEdit: (user: User) => void;

  onDelete: (id: number) => void;
};

export default function UserCard({ user, onEdit, onDelete }: UserCardProps) {
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
      {/* TOP */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* AVATAR */}
          <div
            className="
            shrink-0
              w-14 h-14
              rounded-2xl
              bg-orange-100
              flex items-center justify-center
              text-orange-500
              font-bold
              text-xl
            "
          >
            {user.email.charAt(0).toUpperCase()}
          </div>

          {/* INFO */}
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-gray-800 truncate">
              {user.email}
            </h2>

            <p className="text-sm text-gray-500 mt-1">User Account</p>
          </div>
        </div>

        {/* ROLE BADGE */}
        <span
          className={`
            shrink-0
            whitespace-nowrap
            px-4 py-2 rounded-xl text-sm font-semibold

            ${
              user.role === "ADMIN"
                ? "bg-red-100 text-red-600"
                : user.role === "KASIR"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-yellow-100 text-yellow-700"
            }
          `}
        >
          {user.role}
        </span>
      </div>

      {/* ACTION */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(user)}
          className="
            flex-1
            bg-gray-100
            hover:bg-gray-200
            text-gray-700
            py-3
            rounded-2xl
            font-medium
            transition
          "
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(user.id)}
          className="
            flex-1
            bg-red-100
            hover:bg-red-200
            text-red-600
            py-3
            rounded-2xl
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
