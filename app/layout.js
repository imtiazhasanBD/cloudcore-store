import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "CloudCore Store - Premium E-commerce Shopping",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
