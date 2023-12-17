import { Logo } from "./_components/logo";

 const AuthLayout = ({ children }:
    {
        children: React.ReactNode
    }) => {
        return(
            <div className="h-full flex items-center justify-center">
                <Logo />
                {children}
            </div>
        )
    }

    export default AuthLayout;