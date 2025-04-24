
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "Buy me a chiya",
  description: "Buy me a coffee clone with E-Sewa integration.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en"
      webcrx=""
    >
      <head></head>
      <body
        className="font-sans relative"
      >
        <SessionWrapper>
          
          <Navbar className="absolute top-0" />
          <div className="min-h-screen">
            {children}
          </div>
          <Footer className="absolute bottom-0" />
        </SessionWrapper>
      </body>
    </html>
  );
}
