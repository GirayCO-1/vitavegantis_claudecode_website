import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Türkçe site: kök seviyedeki adresler (SEO devamlılığı için değişmez).
export default function TrLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar locale="tr" />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer locale="tr" />
    </>
  );
}
