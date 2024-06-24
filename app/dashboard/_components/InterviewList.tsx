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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        setIsLoading(true);
  
        try {
          const result = await getInterviewList(user.primaryEmailAddress.emailAddress);
          setInterviewList(result); // Update interviewList with fetched data
          setIsLoading(false);
        } catch (error) {
          console.error("Error in fetchData:", error);
          setIsLoading(false);
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
        {isLoading ? (
          // Loading state placeholder
          [1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className="h-[150px] w-full bg-gray-200 animate-pulse rounded-lg"
            />
          ))
        ) : error ? (
          // Error state message
          <div className=" items-center justify-center h-64 w-full ">
            <h1 className="text-2xl text-gray-500">No interviews found.</h1>
            <p className="text-gray-500 text-lg mt-2">
              Click the plus button to add one.
            </p>
          </div>
        ) : interviewList.length === 0 ? (
          // No interviews found message
          <div className=" items-center justify-center h-64 w-full ">
          <h1 className="text-2xl text-gray-500">No interviews found.</h1>
          <p className="text-gray-500 text-lg mt-2">
            Click the plus button to add one.
          </p>
        </div>
        ) : (
          // Display interviews
          interviewList.map((interview, index) => (
            <InterviewItemCard
              interview={interview}
              key={index}
              interviewList={interviewList}
              setInterviewList={setInterviewList}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default InterviewList;
