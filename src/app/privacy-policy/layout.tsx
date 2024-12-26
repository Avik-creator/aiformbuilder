import Footer from "@/components/footer";
import Header from "@/components/header";


export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          {children}
        </main>
        <Footer />
      </div>
    );
  }