import { Footer } from "@/comps/Footer";
import { Logo } from "@/comps/Logo";
import { ReactNode } from "react";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="auth-layout">
            <Logo />
            <h1>Auth Layout</h1>

            {/* TODO: Animate the pages? */}
            <div className="auth-pages">
                {children}
            </div>

            <Footer />
        </div>
    )
}

export default AuthLayout;