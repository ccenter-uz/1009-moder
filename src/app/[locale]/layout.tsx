import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Providers } from "@/application/Providers";
import { Header } from "@/widgets/Header";
import { Sidebar } from "@/widgets/Sidebar";
import { Box } from "@chakra-ui/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "1009",
  description: "Information center Republic of Uzbekistan",
};

const RootLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: any;
}) => {
  const messages = useMessages();

  return (
    <html lang={locale} className={inter.className}>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Box display={"flex"} className="wrapper">
              <Sidebar />
              <Box w={"100%"} overflowY={"scroll"} scrollBehavior={"smooth"}>
                <Header />
                <Box w={"100%"}>{children}</Box>
              </Box>
            </Box>
          </NextIntlClientProvider>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
};

export default RootLayout;
