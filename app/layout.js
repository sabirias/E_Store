import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers/NextAuthProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Commerce App - Your Ultimate Shopping Destination",
  description:
    "Discover amazing products at great prices. Shop electronics, clothing, books, and home & garden items with fast shipping and excellent customer service.",
  keywords:
    "e-commerce, online shopping, electronics, clothing, books, home & garden",
  authors: [{ name: "E-Commerce Team" }],
  creator: "E-Commerce App",
  publisher: "E-Commerce App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "E-Commerce App - Your Ultimate Shopping Destination",
    description:
      "Discover amazing products at great prices. Shop electronics, clothing, books, and home & garden items.",
    url: "/",
    siteName: "E-Commerce App",
    images: [
      {
        url: "/favicon.ico",
        width: 32,
        height: 32,
        alt: "E-Commerce App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Commerce App - Your Ultimate Shopping Destination",
    description:
      "Discover amazing products at great prices. Shop electronics, clothing, books, and home & garden items.",
    images: ["/favicon.ico"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col gradient-bg">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: "#10b981",
                    secondary: "#fff",
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#fff",
                  },
                },
              }}
            />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
