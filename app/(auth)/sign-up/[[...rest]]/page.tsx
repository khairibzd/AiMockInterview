import GridPattern from "@/components/magicUi/grid-pattern";
import { Navbar } from "@/components/navbar";
import { cn } from "@/utils/cn";
import { SignUp } from "@clerk/nextjs";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <section className="relative overflow-hidden min-h-screen  bg-[#071952]">
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [6, 6],
          [10, 5],
          [13, 3],
        ]}
        className={cn(
          "[mask-image:radial-gradient(450px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div className="fixed w-full z-20">
        <Navbar />
      </div>

      <main className="flex flex-col items-center justify-center mt-16  ">
        <h1 className="text-2xl font-bold text-white text-center mt-16 lg:mt-0 sm:text-3xl md:text-4xl mb-10">
          Welcome to Totaltech Mock Interview
        </h1>
        <div className="text-center">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: {
                  fontSize: 14,
                  textTransform: "none",
                  backgroundColor: "#071952",
                  "&:hover, &:focus, &:active": {
                    backgroundColor: "#37B7C3",
                  },
                },
              },
            }}
            path="/sign-up"
          />
        </div>
      </main>
    </section>
  );
};

export default Page;
