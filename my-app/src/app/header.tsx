import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import Image from "next/image";
import Link from "next/link";

export async function Header() {
    const session = await auth();
    return (
        <div className="bg-gray-200 py-4">
            <div className="container flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <Image src="/logo.png" width="50" height="55" alt="Logo"/>
                    <Link href="/" className="flex item-center p-4 gap-2 hover:underline">
                        <span>AuctionX.com</span>
                    </Link>

                    <div className="flex item-center gap-8">
                        <Link href="/" 
                            className="flex item-center p-4 gap-2 hover:underline">
                            All Auctions
                        </Link>

                        <Link href="/items/create" 
                            className="flex item-center p-4 gap-2 hover:underline">
                            Create Auction
                        </Link>

                        <Link href="/auctions" 
                            className="flex item-center p-4 gap-2 hover:underline">
                            My Auctions
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div>{session ? <SignOut /> : <SignIn />}</div>
                    <div>{session?.user?.name}</div>
                </div>
            </div>
        </div>
    );
}



