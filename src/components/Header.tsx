import { Link, useLocation } from "react-router-dom";
import { Hand, BookOpen, Keyboard } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home", icon: Hand },
    { to: "/quiz", label: "Alphabet Quiz", icon: BookOpen },
    { to: "/practice", label: "Word Practice", icon: Keyboard },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md" role="banner">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 focus-ring rounded-md px-2 py-1" aria-label="Signify home">
          <span className="text-2xl" aria-hidden="true">🤟</span>
          <span className="font-display text-xl font-bold text-foreground">
            Sign<span className="text-primary">ify</span>
          </span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={`focus-ring flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
