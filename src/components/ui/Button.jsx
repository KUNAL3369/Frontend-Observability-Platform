export default function Button({ children, variant = "primary", ...props }) {
  const base = "px-4 py-2 rounded text-sm";

  const styles =
    variant === "primary"
      ? "bg-indigo-600 text-white hover:bg-indigo-500"
      : "border border-gray-700 text-gray-300 hover:bg-gray-800";

  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  );
}