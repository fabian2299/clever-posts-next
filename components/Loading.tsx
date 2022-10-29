export default function Loading() {
  return (
    <div className="flex justify-center items-center mt-10">
      <svg
        className="animate-spin -ml-1 mr-3 h-8 w-8 text-green-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>
      <p className="text-green-600 text-xl">Loading...</p>
    </div>
  );
}
