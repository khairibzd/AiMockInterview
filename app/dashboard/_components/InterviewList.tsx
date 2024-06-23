"use client";
import { getInterviewList } from "@/actions/interview";
import { MockInterviewData } from "@/types";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

type Props = {};

const InterviewList = (props: Props) => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState<MockInterviewData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        // Ensure emailAddress is defined
        try {
          const result = await getInterviewList(
            user.primaryEmailAddress.emailAddress
          );
          console.log(result); // Ensure the data fetched is logged correctly
          setInterviewList(result);
          // Update state with the fetched data
        } catch (error) {
          console.error("Error in useEffect:", error);
          // Handle error state or display error message as needed
        }
      } else {
        console.error("Email address is undefined");
      }
    };

    fetchData();
  }, [user?.primaryEmailAddress?.emailAddress]);
  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList?.length > 0
          ? interviewList.map((interview, index) => (
              <InterviewItemCard interview={interview} key={index} />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div className="h-[150px] w-full bg-gray-200 animate-pulse rounded-lg "></div>
            ))}
      </div>
    </div>
  );
};

export default InterviewList;
