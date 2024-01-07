import { Logo } from "./_components/logo";

 const AuthLayout = ({ children }:
    {
        children: React.ReactNode
    }) => {
        return(
            <main className="h-full flex flex-col items-center justify-center space-y-6">
                <div >
                <Logo />
                </div>
              <div>
                     {children}
              </div>
           
            </main>
        )
    }

    export default AuthLayout;