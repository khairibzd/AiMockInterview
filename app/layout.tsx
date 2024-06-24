import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans, roboto } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { Boxes } from "@/components/aceternetyui/background-boxes";
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';


export const metadata: Metadata = {
  title: {
    default: "toteltech Ai interview",
    template: "%s - toteltech Ai interview",
  },
  description: "toteltech Ai mock interview U CAN'T MASTER IT IF U CAN'T  TRY IT",
  icons: {
    icon: "/totaltech.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
    >
      <html lang="en" className="scroll-smooth">
        <head>
          <script
            src="https://kit.fontawesome.com/23cc326a28.js"
            crossOrigin="anonymous"
          ></script>
        </head>
        <head />
        
        <body className={roboto.className}>
          
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            {/* <div className="relative flex flex-col min-h-screen  "> */}
            {/* <AppBgImg /> */}
            {/* <div className="fixed z-10 w-full">
            </div> */}
            <main>{children}</main>

            {/* <footer className="w-full flex items-center justify-center py-3"> */}
            {/* <Footer /> */}
            {/* </footer> */}
            {/* </div> */}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
