import Footer from "../../components/UI/Footer";
import { Navbar } from "../../components/UI/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <div className="flex justify-center shadow-lg">
        <Navbar />
      </div>
      <main className="flex-1 overflow-y-auto">{children}</main>
      <Footer />
    </div>
  );
}
