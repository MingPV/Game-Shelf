import { signInAction } from "@/app/(auth-pages)/actions";
import { FormMessage, Message } from "@/components/form-message";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  
  return (
    <div className="flex justify-center items-center w-full">
      {/* Left Session */}
      <div className="flex flex-1 justify-center items-center  text-white p-8">
        <div className="text-center space-y-6">
          <img
            src="/mock_user.jpeg"
            alt="SignIn Illustration"
            className="max-w-md mx-auto"
          />
          <h1 className="text-4xl font-bold">
            Welcome
          </h1>
          <p className="text-2xl">
            Explore the world of meta fashion
          </p>
        </div>
      </div>
    
       {/* Right Session */}
      <div className="flex flex-1 justify-center items-center p-8">
        <div className="card bg-gray-400 bg-opacity-30 w-full max-w-sm shadow-2xl">
          <div className="card-body gap-5">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-medium">Sign in</h1>
                <p className="text-sm text-foreground">
                  New user?{" "}
                  <Link className="text-gs_purple font-medium hover:text-gs_white" href="/sign-up">
                    Create an account
                  </Link>
                </p>
            </div>

            <form className="flex flex-col min-w-64 placeholder:text-gs_white" action={signInAction}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address" 
                    className="flex-1 p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gs_purple"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 pb-2">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="flex-1 p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gs_purple"
                    required
                  />
                  <div className="flex justify-end p-1">
                    <Link
                      className="text-xs text-foreground text-gray-400 underline "
                      href="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                 
                </div>
                <button 
                  type="submit" 
                  className="btn rounded-full bg-gs_purple_gradient hover:bg-opacity-60 border-none"
                >
                  Sign In
                </button>
              </div>

              <div className="divider text-gray-400 py-5">or</div>
              
              <div className="flex flex-col gap-3">
              <button className="btn border-none w-full flex items-center justify-start pl-16 rounded-full bg-white text-gray-800 border-gray-300 hover:bg-gray-200 py-3">
                <FcGoogle className="w-6 h-6 shrink-0" />
                <span className="ml-3">Continue With Google</span>
              </button>

              <button className="btn border-none w-full flex items-center justify-start pl-16 rounded-full bg-blue-600 text-white hover:bg-blue-700 py-3">
                <FaFacebook className="w-6 h-6 shrink-0" />
                <span className="ml-3">Continue With Facebook</span>
              </button>

              <button className="btn border-none w-full flex items-center justify-start pl-16 rounded-full bg-black text-white hover:bg-gray-800 py-3">
                <FaApple className="w-6 h-6 shrink-0" />
                <span className="ml-3">Continue With Apple</span>
              </button>
              </div>
            
              <FormMessage message={searchParams} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
