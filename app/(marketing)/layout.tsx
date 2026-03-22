export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container py-12 md:py-16">{children}</div>;
}
