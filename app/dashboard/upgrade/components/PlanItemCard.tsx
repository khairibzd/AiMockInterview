"use client";
import { SubscriptionPlan } from "@/types";
import { useUser } from "@clerk/nextjs";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React from "react";

type Props = {
  plan: SubscriptionPlan;
};

function PlanItemCard({ plan }: Props) {
  const { user } = useUser();
  return (
    <Card className="max-w-[400px] border-none  bg-blue-100">
      <CardHeader className="flex gap-3 text-[#071952] font-bold items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900">
            {plan.name}
            <span className="sr-only">Plan</span>
          </h2>

          <p className="mt-2 sm:mt-4">
            <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {" "}
              {plan.cost}${" "}
            </strong>

            <span className="text-sm font-medium text-gray-700">/month</span>
          </p>
        </div>
      </CardHeader>
      <CardBody className="items-center text-center">
        <ul className="mt-6 space-y-2">
          {plan.offering.map((item, index) => (
            <li className="flex items-center gap-1 mb-2">
              <h2 className="text-gray-700">{item.value}</h2>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="justify-center">
        <a
          href={
            plan.paymentLink +
            "?prefilled_email=" +
            (user?.primaryEmailAddress?.emailAddress ?? "")
          }
          target="_blank"
        >
          <Button className="bg-[#071952]">Get Started</Button>
        </a>
      </CardFooter>
    </Card>
  );
}

export default PlanItemCard;
