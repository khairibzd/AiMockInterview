"use client";
import { title } from "@/components/primitives";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import { Boxes } from "@/components/aceternetyui/background-boxes";

export default function dashboard() {
  return (
    <div className="">
      
      <h2 className=" font-bold text-3xl text-[#EBF4F6]">Dashboard</h2>
      <h2 className="text-gray-500">
        Create and Start your AI Mockup Interview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
        <AddNewInterview />
      </div>

      {/* Previous Interview List  */}
      <InterviewList />
    </div>
  );
}
