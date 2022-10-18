export default function AuthorizedBadge() {
  return (
    <div className="bg-green-500 text-white rounded-full px-3 py-2 flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>

      <span>Authorized</span>
    </div>
  );
}
