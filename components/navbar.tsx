"use client"

import { useState } from "react"
import { Search, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "@/public/logo.svg"
import ArrowDown from "@/public/down.svg"
import Arrowright from "@/public/right.svg"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="w-full py-1">
      <div className="px-10 mx-auto flex items-center justify-between">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white font-medium">
            Home
          </Link>
          <div className="relative group">
            <Link href="#" className="text-white font-medium flex items-center gap-2">
              Games
              <Image src={ArrowDown} alt="dropdown" width={15} height={9} className="mt-1" />
            </Link>
          </div>
          <Link href="#" className="text-white font-medium">
            Giveaways
          </Link>
          <Link href="#" className="text-white font-medium">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-shrink-0 mx-4">
          <div className="w-8 h-8 relative">
            <Image
              src={Logo}
              alt="Gamersberg Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search User"
              className="w-64 bg-[#0c0c2a] border-white text-white pr-8"
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
          </div>
          <Button variant="ghost" className="text-white flex items-center gap-2">
            Login
            <Image src={Arrowright} alt="login" width={9} height={15} className="ml-1" />
          </Button>
        </div>

        {/* Mobile Search and Login */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="text-white flex items-center gap-2">
            Login
            <Image src= {Arrowright} alt="login" width={9} height={15} />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#0c0c2a] p-4">
          <div className="flex justify-between items-center mb-8">
            <div className="w-8 h-8 relative">
              <Image
                src={Logo}
                alt="Gamersberg Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="text-white">
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex flex-col space-y-6">
            <Link href="/" className="text-white text-xl font-medium" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <div className="flex items-center">
              <Link
                href="#"
                className="text-white text-xl font-medium flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Games
                <Image src={ArrowDown} alt="dropdown" width={15} height={9} className="mt-1" />
              </Link>
            </div>
            <Link href="#" className="text-white text-xl font-medium" onClick={() => setIsMenuOpen(false)}>
              Giveaways
            </Link>
            <Link href="#" className="text-white text-xl font-medium" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </div>
          <div className="mt-8">
            <Input type="search" placeholder="Search User" className="w-full bg-[#1a1a4a] border-white text-white" />
          </div>
        </div>
      )}
    </nav>
  )
}
