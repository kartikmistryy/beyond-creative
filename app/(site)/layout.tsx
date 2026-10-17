import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { listProjects } from "@/lib/db";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Motion />
      <Header count={listProjects().length} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
