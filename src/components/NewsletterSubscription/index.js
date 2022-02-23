import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

import CustomForm from "./CustomForm";

const NewsletterSubscription = () => {
  const postUrl = `https://jikopoint.us14.list-manage.com/subscribe/post?u=${process.env.NEXT_PUBLIC_MAILCHIMP_U}&id=${process.env.NEXT_PUBLIC_MAILCHIMP_ID}`;

  return (
    <MailchimpSubscribe
      url={postUrl}
      render={({ subscribe, status, message }) => (
        <CustomForm
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  );
};

export default NewsletterSubscription;
