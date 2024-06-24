import { title } from "@/components/primitives";
import planData from "@/utils/PlanData"
import PlanItemCard from "./components/PlanItemCard";
export default function Upgrade() {
  return (
    <div className=''>
            <h2 className='font-bold text-3xl text-center text-[#37B7C3]'>Upgrade</h2>
            <h2 className='text-center  text-gray-400'>Upgrade to monthly plan to access unlimited mock interview</h2>

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">

                {planData.map((plan,index)=>(
                     <PlanItemCard plan={plan} key={index} />
                ))}
                   


                </div>
            </div>
        </div>
  );
}
