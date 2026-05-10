"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/i18n/i18n-provider";

/**
 * Top-level client providers for the app.
 * Mounted from the root layout so server components stay server.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <TooltipProvider delay={250}>{children}</TooltipProvider>
        </I18nProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
