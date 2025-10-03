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
                    <Link href="/" className="hover:underline">
                        <Image src="/logo.png" width="50" height="55" alt="Logo"/>
                        AuctionX.com
                    </Link>
                <div>{session ? <SignOut /> : <SignIn />}</div>
            </div>
        </div>
    );
}
