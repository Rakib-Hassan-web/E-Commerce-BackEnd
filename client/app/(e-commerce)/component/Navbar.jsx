"use client";   

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";
import Input from "@/utils/Input";
import Button from "@/utils/Button";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="py-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">

        {/* ----- Logo ----- */}
        <Link href="/" passHref>
          <Image
            src="/Hekto.png"
            alt="Logo"
            width={98}
            height={34}
            priority
          />
        </Link>

        {/* ----- Desktop Menu ----- */}
        <ul className="hidden md:flex gap-6">
          <li>
            <Link href="/" passHref>
              <span className="text-[#0D0E43] font-lato text-base font-semibold hover:text-[#FB2E86] duration-300">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/shop" passHref>
              <span className="text-[#0D0E43] font-lato text-base font-semibold hover:text-[#FB2E86] duration-300">Products</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard" passHref>
              <span className="text-[#0D0E43] font-lato text-base font-semibold hover:text-[#FB2E86] duration-300">Blog</span>
            </Link>
          </li>
          <li>
            <Link href="/about" passHref>
              <span className="text-[#0D0E43] font-lato text-base font-semibold hover:text-[#FB2E86] duration-300">About</span>
            </Link>
          </li>
          <li>
            <Link href="/Contact" passHref>
              <span className="text-[#0D0E43] font-lato text-base font-semibold hover:text-[#FB2E86] duration-300">Contact</span>
            </Link>
          </li>
          <li>
            <Link href="/Login" passHref>
              <span className="text-[#0D0E43] font-lato text-base font-semibold hover:text-[#FB2E86] duration-300">Login</span>
            </Link>
          </li>
        </ul>

        {/* ----- Search Bar (Desktop) ----- */}
        <div className="hidden md:flex items-center ml-6">
          <Input
            placeholder="Search..."
            className="w-[250px]"
            inputClassName="rounded-l-md border-r-0"
          />
          <Button className="w-[50px] h-[50px] rounded-r-md p-0 text-2xl">
            <CiSearch />
          </Button>
        </div>

        {/* ----- Hamburger Menu Button ----- */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* ----- Mobile Menu ----- */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg w-full px-4 py-4">
          <ul className="flex flex-col gap-4">
            <li><Link href="/" passHref><span className="text-[#0D0E43] font-lato text-base font-semibold hover:text-[#FB2E86] duration-300">Home</span></Link></li>
            <li><Link href="/shop" passHref><span className="text-[#0D0E43] font-lato text-base font-semibold hover:text-[#FB2E86] duration-300">Products</span></Link></li>
            <li><Link href="/blog" passHref><span className="text-[#0D0E43] font-lato text-base font-semibold hover:text-[#FB2E86] duration-300">Blog</span></Link></li>
            <li><Link href="/about" passHref><span className="text-[#0D0E43] font-lato text-base font-semibold hover:text-[#FB2E86] duration-300">Shop</span></Link></li>
            <li><Link href="/contact" passHref><span className="text-[#0D0E43] font-lato text-base font-semibold hover:text-[#FB2E86] duration-300">Contact</span></Link></li>
            <li><Link href="Pages/Login" passHref><span className="text-[#0D0E43] font-lato text-base font-semibold hover:text-[#FB2E86] duration-300">Login</span></Link></li>

            {/* Mobile Search */}
            <div className="flex mt-2">
              <Input
                placeholder="Search..."
                className="w-full"
                inputClassName="rounded-l-md border-r-0"
              />
              <Button className="w-[50px] h-[50px] rounded-r-md p-0 text-2xl">
                <CiSearch />
              </Button>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
