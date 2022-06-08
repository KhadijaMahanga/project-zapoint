import nodemailer from "nodemailer";

// Email HTML body
const html = ({ site, content }) => {
  const escapedSite = `${site.replace(/\./g, "&#8203;.")}`;

  // Some simple styling options
  const backgroundColor = "#f9f9f9";
  const textColor = "#414142";
  const mainBackgroundColor = "#ffffff";
  const titleColor = "#41aa54";

  // Uses tables for layout and inline CSS due to email client limitations
  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${titleColor};">
        <strong>${escapedSite}</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
       ${content}
      </td>
    </tr>
  </table>
</body>
`;
};

// Email text body – fallback for email clients that don't render HTML
const text = ({ content, site }) => `${site}\n\n${content}\n\n`;

const sendEmail = ({ subject, email, content }) => {
  return new Promise((resolve, reject) => {
    const from = process.env.EMAIL_FROM;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    // Strip protocol from URL and use domain as site name
    const site = baseUrl.replace(/^https?:\/\//, "");

    const server = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      name: "jikopoint.co.tz",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    nodemailer.createTransport(server).sendMail(
      {
        to: email,
        from,
        subject,
        text: text({ site, content }),
        html: html({ site, content }),
      },
      (error) => {
        if (error) {
          return reject(new Error(error));
        }
        return resolve();
      }
    );
  });
};

export default sendEmail;
