"use client";

import { getInterviewDetails } from "@/actions/interview";
import { MockInterviewData, MockInterviewQuestion } from "@/types";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./components/QuestionSection";
import RecordANswerSection from "./components/RecordANswerSection";

type Props = {
  params: {
    interviewId: string;
  };
};

function Start({ params }: Props) {
  const [interviewData, setInterviewData] = useState<MockInterviewData>();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<
    MockInterviewQuestion[]
  >([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      console.log(params);
      const result = await getInterviewDetails(params.interviewId);
      if (result && result.status === 200 && result.interviewData) {
        setInterviewData(result.interviewData);
        setMockInterviewQuestion(result.jsonMockResp);
      } else {
        console.error(result?.message || "Error fetching interview details");
      }
    };
    fetchInterviewDetails();
  }, [params.interviewId]);
  return (
<div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Questions */}
    <QuestionsSection
      mockInterviewQuestion={mockInterviewQuestion}
      activeQuestionIndex={activeQuestionIndex}
    />

    {/* Video/ Audio Recording */}
    <RecordANswerSection
      mockInterviewQuestion={mockInterviewQuestion}
      activeQuestionIndex={activeQuestionIndex}
      interviewData={interviewData as MockInterviewData}
    />
  </div>
  <div className="flex justify-end gap-4 mb-3">
    {activeQuestionIndex > 0 && (
      <Button
        onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
        className="bg-[#EBF4F6] text-[#071952]"
      >
        Previous Question
      </Button>
    )}
    {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
      <Button
        className="bg-[#EBF4F6] text-[#071952]"
        onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
      >
            Next Question
      </Button>
    )}
    {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
      <Link href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}>
        <Button className="bg-[#EBF4F6] text-[#071952]">
          End Interview
        </Button>
      </Link>
    )}
  </div>
</div>

  );
}

export default Start;
