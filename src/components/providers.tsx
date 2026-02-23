import SocketContextProvider from "@/contexts/socketio";
import Preloader from "./preloader";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/toaster";
import { SkillsDockHintProvider } from "./ui/floating-dock";
import { TooltipProvider } from "./ui/tooltip";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <Preloader>
        <SocketContextProvider>
          <SkillsDockHintProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster />
          </SkillsDockHintProvider>
        </SocketContextProvider>
      </Preloader>
    </ThemeProvider>
  );
};
