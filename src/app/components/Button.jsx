function Button({ children }) {
  return (
    <button className="mt-4 px-4 py-2 text-white bg-green-500 rounded-lg text-lg font-medium">
      {children}
    </button>
  );
}

export default Button;
