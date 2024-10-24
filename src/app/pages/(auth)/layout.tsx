import Appbar from "@/components/custom/Appbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Appbar />
      {children}
    </>
  );
}
