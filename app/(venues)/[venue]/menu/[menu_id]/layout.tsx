export default async function MenuLayout({
  children,
}: {
  children: React.ReactNode;
  params: { venue: string };
}) {
  return <div>{children}</div>;
}
