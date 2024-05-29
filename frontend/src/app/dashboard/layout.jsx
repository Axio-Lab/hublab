import { NavProvider } from "../../context/nav_context";
import Sidebar from "../../components/sidebar";

export const metadata = {
  title: "Verxio Protocol",
  description:
    "An instant tool for creators to sell their digital product to their audience",
};

const Layout = ({ children }) => {
  return (
    <NavProvider>
      <main className="flex h-screen overflow-hidden">
        <Sidebar />
        <section className="w-full h-[calc(100%-0px)] overflow-scroll bg-white">
          <div>{children}</div>
        </section>
      </main>
    </NavProvider>
  );
};

export default Layout;
