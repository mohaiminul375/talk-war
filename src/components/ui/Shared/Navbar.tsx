'use client'

import Link from "next/link";
import { Button } from "../button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../sheet";
import Image from "next/image";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "../navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

const navItems = [
    {
        title: 'Home',
        path: '/',
        type: 'public',

    },
    {
        title: 'Events',
        path: '/create-debate',
        type: 'private',
    },
    {
        title: 'Add Event',
        path: '/all-debate',
        type: 'private',
    },
    {
        title: 'LeaderBoard',
        path: '/leaderboard',
        type: 'private',
    },
];

const Navbar = () => {
    const user = null;
    const pathname = usePathname();

    return (
        <header className="flex h-16 w-full items-center px-4 md:px-6 shadow-2xl bg-foreground fixed top-0 z-50">
            {/* Mobile Menu Icon */}
            <div className="lg:hidden mr-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="dark:bg-primary" variant="outline" size="icon">
                            {/* <CiMenuFries className='text-foreground' /> */}
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="grid gap-2 py-6">
                            {navItems
                                .filter(item => item.type === 'public' || (item.type === 'private' && user))
                                .map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.path}
                                        className={`flex w-full items-center py-2 text-lg font-semibold text-black ${pathname === item.path ? 'underline shadow-2xl' : ''
                                            }`}
                                        prefetch={false}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center" prefetch={false}>
                <div className="flex items-center">
                    {/* <Image className='rounded-full' width={30} src={logo} alt='logo' /> */}
                    <span className="ml-2 text-lg md:text-3xl italic font-bold text-black block">Talk War</span>
                </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex justify-center flex-1">
                <NavigationMenu>
                    <NavigationMenuList className="flex space-x-4">
                        {navItems
                            .filter(item => item.type === 'public' || (item.type === 'private' && user))
                            .map((item, index) => (
                                <NavigationMenuLink asChild key={index}>
                                    <Link
                                        href={item.path}
                                        className={`group text-black font-bold text-base ${pathname === item.path ? 'underline shadow-2xl' : ''
                                            }`}
                                        prefetch={false}
                                    >
                                        {item.title}
                                    </Link>
                                </NavigationMenuLink>
                            ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Login/Register or Avatar - Right Aligned */}
            <div className="ml-auto flex items-center">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="border-2 border-black">
                                <AvatarImage className="cursor-pointer" src={user?.avatar} alt="avatar" />
                                <AvatarFallback />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel className="select-none cursor-not-allowed">{user?.name}</DropdownMenuLabel>
                            <DropdownMenuLabel className="select-none cursor-not-allowed">{user?.email}</DropdownMenuLabel>
                            <DropdownMenuLabel className="cursor-pointer">
                                <Link href="/update-profile">Update Profile</Link>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <>
                        <Link className="mx-2 text-white" href="/register">
                            Register
                        </Link>
                        <Link href="/login">
                            <Button variant="default" className="rounded-full">
                                Login
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </header>


    );
};

export default Navbar;