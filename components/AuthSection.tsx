"use client";

import Link from "next/link";
import { useUser, Show, SignInButton, UserButton } from "@clerk/nextjs";

const AuthSection = () => {
    const { user } = useUser();

    return (
        <div className="auth-container">
            <Show when="signed-out">
                <SignInButton mode="modal">
                    <button className="navbar-auth-btn">Login</button>
                </SignInButton>
            </Show>

            <Show when="signed-in">
                <div className="auth-user">
                    <UserButton />
                    {user?.firstName && (
                        <Link href="/subscriptions" className="navbar-user">
                            {user.firstName}
                        </Link>
                    )}
                </div>
            </Show>
        </div>
    );
};

export default AuthSection;