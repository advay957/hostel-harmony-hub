import {
  LayoutDashboard, Users, BedDouble, ClipboardList,
  UtensilsCrossed, Megaphone, CreditCard, AlertTriangle, BarChart3,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Students", url: "/admin/students", icon: Users },
  { title: "Room Management", url: "/admin/rooms", icon: BedDouble },
  { title: "Leave Requests", url: "/admin/leave", icon: ClipboardList },
  { title: "Mess Menu", url: "/admin/mess", icon: UtensilsCrossed },
  { title: "Notices", url: "/admin/notices", icon: Megaphone },
  { title: "Fee Records", url: "/admin/fees", icon: CreditCard },
  { title: "Complaints", url: "/admin/complaints", icon: AlertTriangle },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div className="p-6 border-b border-sidebar-border/50">
        {!collapsed && (
          <h2 className="text-xl font-bold text-primary tracking-tight">
            HostelHub Admin
          </h2>
        )}
      </div>
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 tracking-wider text-xs font-semibold uppercase mb-3 px-2">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton size="lg" asChild className="rounded-xl transition-all duration-200 hover:bg-sidebar-accent/50 hover:scale-[1.02] [&>svg]:size-5">
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className="text-sidebar-foreground/80 font-medium"
                      activeClassName="bg-primary/10 text-primary font-bold ring-1 ring-primary/20 shadow-sm"
                    >
                      <item.icon className="mr-3 shrink-0" />
                      {!collapsed && <span className="text-[15px]">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
