import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Sign In
        </h1>
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </div>
  </main>
);

export default SignUpPage;
