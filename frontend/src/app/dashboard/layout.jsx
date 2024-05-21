import { NavProvider } from "../../context/nav_context";
import Sidebar from "../../components/sidebar";

export const metadata = {
  title: "Verxio Protocol",
  description:
    "Verxio is revolutionalizing the way people learn and interact with the blockchain",
};

const Layout = ({ children }) => {
  return (
    <NavProvider>
      <main className=" flex h-screen overflow-hidden">
        <Sidebar />
        <section className="w-full h-[calc(100%-0px)] overflow-scroll bg-white">
          <div>{children}</div>
        </section>
      </main>
    </NavProvider>
  );
};

export default Layout;
