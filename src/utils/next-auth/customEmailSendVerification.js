import nodemailer from "nodemailer";

// Email HTML body
const html = ({ url, site, email, status }) => {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedSite = `${site.replace(/\./g, "&#8203;.")}`;

  // Some simple styling options
  const backgroundColor = "#f9f9f9";
  const textColor = "#414142";
  const mainBackgroundColor = "#ffffff";
  const buttonBackgroundColor = "#41aa54";
  const buttonBorderColor = "#41aa54";
  const buttonTextColor = "#ffffff";

  const buttonText =
    status === "register" ? "Hakiki Akaunti" : "Badilisha Nywila";
  const headingText =
    status === "register"
      ? "Umeomba kujiunga na JikoPoint kwa kutumia barua pepe"
      : "Umeomba kubadilisha nywila yako kwa kutumia barua pepe";

  // Uses tables for layout and inline CSS due to email client limitations
  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${escapedSite}</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
       ${headingText}: <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">${buttonText}</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        Kama hujaomba kuhakikiwa na JikoPoint, basi upuuzie huu ujumbe
      </td>
    </tr>
  </table>
</body>
`;
};

// Email text body – fallback for email clients that don't render HTML
const text = ({ url, site }) =>
  `Hakiki barua pepe yako kwenye ${site}\n${url}\n\n`;

const customEmailVerificationRequest = ({
  identifier: email,
  url,
  provider,
  status,
}) => {
  return new Promise((resolve, reject) => {
    const { server, from } = provider;

    // Strip protocol from URL and use domain as site name
    const site = "Jiko Point";

    nodemailer.createTransport(server).sendMail(
      {
        to: email,
        from,
        subject:
          status === "register"
            ? "JikoPoint: Hakiki Barua Pepe Yako"
            : "JikoPoint: Badilisha Nywila Yako",
        text: text({
          url,
          site,
          email,
          status,
        }),
        html: html({
          url,
          site,
          email,
          status,
        }),
      },
      (error) => {
        if (error) {
          return reject(new Error("SEND_VERIFICATION_EMAIL_ERROR", error));
        }
        return resolve();
      }
    );
  });
};

export default customEmailVerificationRequest;
