import React from "react";
import SubscriptionForm from "../components/SubscriptionForm";
import { useSelector } from "react-redux";
import SubscriptionAvailable from "../components/SubscriptionAvailable";

const SubscriptionPage = () => {
  const subscription = useSelector((state) => state.users.subscription);
  console.log(subscription);
  return (
    <>
      {subscription.length > 0 && subscription[0].start != "" ? (
        <SubscriptionAvailable />
      ) : (
        <SubscriptionForm />
      )}
    </>
  );
};

export default SubscriptionPage;
