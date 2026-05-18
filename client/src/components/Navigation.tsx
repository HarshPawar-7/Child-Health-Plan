import { Link, useLocation } from "wouter";
import { HeartPulse, LayoutDashboard, Calculator } from "lucide-react";
import { HistorySidebar } from "./HistorySidebar";

export function Navigation() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <HeartPulse className="h-8 w-8" />
          <span className="font-heading font-bold text-2xl tracking-tight">Poshan AI</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/">
            <a className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              <Calculator className="h-4 w-4" />
              Assessment
            </a>
          </Link>
          <Link href="/analytics">
            <a className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${location === '/analytics' ? 'text-primary' : 'text-muted-foreground'}`}>
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </a>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <HistorySidebar />
          <div className="text-sm font-medium text-muted-foreground bg-accent px-3 py-1 rounded-full border border-border hidden sm:block">
            NGO Support Mode
          </div>
        </div>
      </div>
    </header>
  );
}
