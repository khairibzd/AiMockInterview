import { Boxes } from "@/components/aceternetyui/background-boxes";
import GridPattern from "@/components/magicUi/grid-pattern";
import { Navbar } from "@/components/navbar";
import { cn } from "@/utils/cn";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden min-h-screen  bg-[#172554] w-full ">
      {/* <Boxes /> */}
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
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      {/* <Header/> */}
      <div className="fixed w-full z-20">
        <Navbar />
      </div>

      <div className="mx-4 md:mx-20 lg:mx-26 pt-24">{children}</div>
    </div>
  );
}
