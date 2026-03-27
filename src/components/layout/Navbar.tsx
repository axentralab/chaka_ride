"use client";

import { Link, usePathname } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

function NavDropdown({
  hasDropdown,
  items,
}: {
  hasDropdown: boolean;
  items: { label: string; href: string }[] | undefined;
}) {
  if (!hasDropdown || !items?.length) {
    return null;
  }
  return (
    <div
      className="absolute top-full left-1/2 z-50 mt-3 hidden min-w-[200px] -translate-x-1/2 rounded-lg border border-slate-200/80 bg-white py-2 shadow-lg group-hover:block"
      role="menu"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-(--brand-primary)"
          role="menuitem"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function NavLink({
  href,
  label,
  hasDropdown,
  activePaths,
  dropdownItems,
}: {
  href: string;
  label: string;
  hasDropdown: boolean;
  activePaths: string[];
  dropdownItems: { label: string; href: string }[] | undefined;
}) {
  const pathname = usePathname();
  const active = activePaths.some((p) =>
    p === "/"
      ? pathname === "/"
      : pathname === p || pathname.startsWith(`${p}/`),
  );

  return (
    <div className="group relative">
      <Link
        href={href}
        className={`inline-flex items-center gap-1 text-[15px] font-medium tracking-tight transition-colors ${
          active
            ? "text-(--brand-primary)"
            : "text-slate-900 hover:text-(--brand-primary)"
        }`}
      >
        {label}
        {hasDropdown ? (
          <ChevronDown
            className="size-[15px] opacity-80"
            strokeWidth={2}
            aria-hidden
          />
        ) : null}
      </Link>
      <NavDropdown hasDropdown={hasDropdown} items={dropdownItems} />
    </div>
  );
}

export default function Navbar() {
  const tNav = useTranslations("Nav");
  const tHome = useTranslations("NavDropdown.home");
  const tService = useTranslations("NavDropdown.service");
  const tCars = useTranslations("NavDropdown.cars");
  const tPages = useTranslations("NavDropdown.pages");

  const dropdowns = useMemo(
    () => ({
      home: [
        { label: tHome("hero"), href: "/" },
        { label: tHome("fleet"), href: "/#fleet" },
      ],
      service: [
        { label: tService("airport"), href: "/service/airport" },
        { label: tService("longTerm"), href: "/service/long-term" },
        { label: tService("chauffeur"), href: "/service/chauffeur" },
      ],
      cars: [
        { label: tCars("economy"), href: "/cars/economy" },
        { label: tCars("suv"), href: "/cars/suv" },
        { label: tCars("luxury"), href: "/cars/luxury" },
      ],
      pages: [
        { label: tPages("faq"), href: "/faq" },
        { label: tPages("terms"), href: "/terms" },
      ],
    }),
    [tHome, tService, tCars, tPages],
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-6">
        <Link href="/" className="relative flex shrink-0 items-center gap-0">
          <span className="pl-2 text-xl font-bold tracking-tight sm:text-[22px]">
            <span className="text-(--brand-primary)">CHAKA</span>
            <span className="text-slate-900">RIDE</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-9 lg:flex"
          aria-label={tNav("mainNav")}
        >
          <NavLink
            href="/"
            label={tNav("home")}
            hasDropdown
            activePaths={["/"]}
            dropdownItems={dropdowns.home}
          />
          <NavLink
            href="/about"
            label={tNav("about")}
            hasDropdown={false}
            activePaths={["/about"]}
            dropdownItems={undefined}
          />
          <NavLink
            href="/service"
            label={tNav("service")}
            hasDropdown
            activePaths={["/service"]}
            dropdownItems={dropdowns.service}
          />
          <NavLink
            href="/cars"
            label={tNav("cars")}
            hasDropdown
            activePaths={["/cars"]}
            dropdownItems={dropdowns.cars}
          />
          <NavLink
            href="/pages"
            label={tNav("pages")}
            hasDropdown
            activePaths={["/pages", "/faq", "/terms"]}
            dropdownItems={dropdowns.pages}
          />
          <NavLink
            href="/contact"
            label={tNav("contact")}
            hasDropdown={false}
            activePaths={["/contact"]}
            dropdownItems={undefined}
          />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>
          <Link
            href="/book"
            className="hidden items-center gap-2.5 rounded-full bg-(--brand-primary) px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-(--brand-primary-hover) sm:flex"
          >
            {tNav("bookRental")}
            <span className="flex size-8 items-center justify-center rounded-full bg-white">
              <ArrowUpRight
                className="size-4 text-(--brand-primary)"
                strokeWidth={2.5}
              />
            </span>
          </Link>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg text-slate-900 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? tNav("closeMenu") : tNav("openMenu")}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden"
        >
          <div className="mb-4">
            <LocaleSwitcher />
          </div>
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="py-2 text-[15px] font-medium text-(--brand-primary)"
              onClick={() => setMobileOpen(false)}
            >
              {tNav("home")}
            </Link>
            <Link
              href="/about"
              className="py-2 text-[15px] font-medium text-slate-900"
              onClick={() => setMobileOpen(false)}
            >
              {tNav("about")}
            </Link>
            <Link
              href="/service"
              className="py-2 text-[15px] font-medium text-slate-900"
              onClick={() => setMobileOpen(false)}
            >
              {tNav("service")}
            </Link>
            <Link
              href="/cars"
              className="py-2 text-[15px] font-medium text-(--brand-primary)"
              onClick={() => setMobileOpen(false)}
            >
              {tNav("cars")}
            </Link>
            <Link
              href="/contact"
              className="py-2 text-[15px] font-medium text-slate-900"
              onClick={() => setMobileOpen(false)}
            >
              {tNav("contact")}
            </Link>
            <Link
              href="/book"
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-(--brand-primary) px-5 py-3 text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              {tNav("bookRental")}
              <span className="flex size-8 items-center justify-center rounded-full bg-white">
                <ArrowUpRight
                  className="size-4 text-(--brand-primary)"
                  strokeWidth={2.5}
                />
              </span>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
