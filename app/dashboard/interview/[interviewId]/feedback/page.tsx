"use client";
import { getFeedbackDetails } from "@/actions/interview";
import { feedbackData } from "@/types";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    interviewId: string;
  };
};

function Feedback({ params }: Props) {
  const [feedbackList, setFeedbackList] = useState<feedbackData[]>([]);
  const router = useRouter();
//   const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1"]));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFeedbackDetails(params.interviewId);
        console.log(result); // Ensure the data fetched is logged correctly
        setFeedbackList(result); // Update state with the fetched data
      } catch (error) {
        console.error("Error in useEffect:", error);
        // Handle error state or display error message as needed
      }
    };

    fetchData();
  }, [params.interviewId]);


  return (
    <div className="p-2 lg:p-5 space-y-4">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-[#37B7C3]">Congratulation!</h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>

          {/* <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2> */}

          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, Your answer and
            feedback for improvement
          </h2>
          <Accordion
          className="bg-[]"
            variant="bordered"
           
          >
            {feedbackList &&
              feedbackList.map((item, index) => (
                <AccordionItem key={index} title={item.question}>
                  <div className="flex flex-col gap-2 p-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating:</strong>
                      {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </AccordionItem>
              ))}
          </Accordion>
        </>
      )}

      <Button className="bg-[#EBF4F6] text-[#071952]" onClick={() => router.replace("/dashboard")}>
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
