"use client";

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import AuthSection from "./AuthSection";

interface NavLink {
    name: string
    href: string
}

const navLinks: NavLink[] = [
    { name: 'Hub', href: '/' },
    { name: 'New Book', href: '/books/new' },
]

const Navbar = () => {
    const pathName = usePathname()

    return (
        <header className="navbar-root">
            <Link href="/" className="flex items-center gap-4 md:gap-6">
                <Image
                    src="/assets/logo.jpg"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                />
                <span className="navbar-heading hidden md:block">edumania</span>
            </Link>
            <nav className="navbar-links">
                {navLinks.map(({ name, href }: NavLink) => {
                    const isActive: boolean =
                        pathName === href || (href !== '/' && pathName.startsWith(href))
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={isActive ? 'navbar-link-active' : 'navbar-link'}
                        >
                            {name}
                        </Link>
                    )
                })}
                <AuthSection />
            </nav>
        </header>
    )
}

export default Navbar