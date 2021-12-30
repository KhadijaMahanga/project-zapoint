import { getUser } from "@/jikopoint/controllers/user";
import sendEmail from "@/jikopoint/utils/sendEmail";

export default async function send(req, res) {
  const { subject, email: emailProp, content, emailto } = req?.query;
  let email = emailProp;
  if (emailto) {
    const user = await getUser(emailto);
    email = user?.email;
  }
  await sendEmail({ subject, email, content });
  res.end();
}
