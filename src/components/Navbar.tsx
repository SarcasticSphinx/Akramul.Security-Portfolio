"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Nav() {
  const navItems = [
    {
      name: "My Journey",
      link: "#journey",
    },

    {
      name: "Experiences",
      link: "#experience",
    },
    {
      name: "Services",
      link: "#service",
    },
    {
      name: "Articles",
      link: "#articles",
    },
    {
      name: "Testimonials",
      link: "#testimonial",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <Link href="/" className="block">
          <h1>
            <span className="text-xl font-bold text-cyan-400">Akramul</span>
            .Security
          </h1>
        </Link>

        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <NavbarButton
            href="/cv.pdf"
            download
            variant="primary"
            className="rounded-full flex items-center gap-2"
          >
            Get My CV <ArrowDown />
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <Link href="/" className="block">
            <h1>
              <span className="text-xl font-bold text-cyan-400">Akramul</span>
              .Security
            </h1>
          </Link>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Get My CV
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

export default Nav;
