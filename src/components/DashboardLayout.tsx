import { useAuth } from "@/lib/auth-context";
import { AdminSidebar } from "./AdminSidebar";
import { StudentSidebar } from "./StudentSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden">
        {/* Subtle background ambient gradients */}
        <div className="pointer-events-none absolute inset-0 flex justify-center z-0">
          <div className="absolute -top-40 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full" />
        </div>

        {user?.role === "admin" ? <AdminSidebar /> : <StudentSidebar />}
        <div className="flex-1 flex flex-col min-w-0 z-10 relative">
          <header className="h-16 flex items-center justify-between border-b border-white/5 dark:border-white/5 bg-background/60 backdrop-blur-xl px-6 sticky top-0 z-50 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:bg-white/10" />
              <div className="h-4 w-[1px] bg-border/50 hidden sm:block" />
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline tracking-wide">
                {user?.role === "admin" ? "Admin Portal" : `Room ${user?.room} • Block ${user?.block}`}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors rounded-full">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
              </Button>
              <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 dark:bg-black/20 shadow-sm">
                <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors rounded-full ml-1">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8 overflow-auto">
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
