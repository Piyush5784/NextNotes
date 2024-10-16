const Button = ({ text }: { text: string }) => {
  return (
    <button className="rounded-3xl bg-main px-3 py-2 text-white">{text}</button>
  );
};

export default Button;
