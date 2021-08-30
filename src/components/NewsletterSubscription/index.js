import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

import CustomForm from "./CustomForm";

const NewsletterSubscription = () => {
  const postUrl =
    "https://nuktaafrica.us1.list-manage.com/subscribe/post?u=b07e34224d4f1b06a7bbfe943&id=4f0551f658";

  return (
    <MailchimpSubscribe
      url={postUrl}
      render={({ subscribe, status }) => (
        <CustomForm
          status={status}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  );
};

export default NewsletterSubscription;
