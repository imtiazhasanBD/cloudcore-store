import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import "./globals.css";
import { Providers } from "./providers";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "CloudCore Store - Premium E-commerce Shopping",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Suspense fallback={<Loading/>}>
          <Header />
          {children}
          <ToastContainer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
