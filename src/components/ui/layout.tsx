import Header from "./header";

interface Props {
  children: React.ReactNode;
}

// TODO: TEST Code
export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
