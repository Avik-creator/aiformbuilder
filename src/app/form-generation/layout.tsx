import Footer from "@/components/footer";
import Header from "@/components/header";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main className="flex items-center justify-center py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}