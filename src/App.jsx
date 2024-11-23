import { UserProvider } from "@/contexts/user";
import Aside from "@/features/App/Aside";
import Footer from "@/features/App/Footer";
import Header from "@/features/App/Header";
import { MetaProvider } from "@solidjs/meta";
import Toaster from "./features/App/Toaster";
import "./index.css";

const App = (props) => {
  return (
    <MetaProvider>
      <UserProvider>
        <div className="flex flex-col gap-3 min-h-screen p-3">
          <Header />
          <div className="flex gap-3 flex-1">
            <Aside />
            <main className="bento flex flex-wrap items-start content-start gap-3 flex-1 overflow-hidden">
              {props.children}
            </main>
          </div>
          <Footer />
        </div>
        <Toaster />
      </UserProvider>
    </MetaProvider >
  );
};

export default App;