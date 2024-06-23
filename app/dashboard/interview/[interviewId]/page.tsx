"use client";
import { getInterviewDetails } from "@/actions/interview";
import { MockInterviewData } from "@/types";
import { Button } from "@nextui-org/button";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from 'react-webcam'

type Props = {
  params: {
    interviewId: string;
  };
};

const page = ({ params }: Props) => {
  const [interviewData, setInterviewData] = useState<MockInterviewData | null>(
    null
  );
  const [webCamEnabled,setWebCamEnabled]=useState<boolean>();

  useEffect(() => {
    const fetchInterviewDetails = async () => {
        console.log(params)
      const result = await getInterviewDetails(params.interviewId);
      if (result && result.status === 200 && result.interviewData) {
        setInterviewData(result.interviewData);
      } else {
        console.error(result?.message || "Error fetching interview details");
      }
    };
    fetchInterviewDetails();
  }, [params.interviewId]);

  return (
    <div className='my-4 '>
    <h2 className='font-bold text-2xl mb-4 text-[#37B7C3]'>Let's Get Started</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
   
        <div className='flex flex-col gap-5 '>
            <div className='flex flex-col p-5 rounded-lg border gap-5'>
                <h2 className='text-lg'><strong>Job Role/Job Position:</strong>{interviewData?.jobPosition} </h2>
                <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong>{interviewData?.jobDesc} </h2>
                <h2 className='text-lg'><strong>Years of Experience:</strong>{interviewData?.jobExperience} </h2>
            </div>
            <div className='p-5  bg-blue-100 rounded-lg '>
               <h2 className='flex gap-2 items-center text-[#37B7C3]'> <Lightbulb/><strong>Information</strong></h2>
                <h2 className='mt-3  text-[#37B7C3]'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
            </div>
        </div>
        <div>
        {webCamEnabled? <Webcam
       onUserMedia={()=>setWebCamEnabled(true)}
       onUserMediaError={()=>setWebCamEnabled(false)}
       mirrored={true}
        style={{
            height:300,
            width:300,
        }}
       />
       :
       <>
        <WebcamIcon className='h-64 w-full   p-10 rounded-lg border' />
        <Button className="w-full bg-[#088395] mt-4 mb-4" onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
        </>
       }
       <div className='flex justify-end items-end'>
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
        <Button  className="bg-[#EBF4F6] text-[#071952]">Start Interview</Button>
        </Link>
       </div>
        </div>

        
    </div>
    

       
</div>
    
  );
};

export default page;
