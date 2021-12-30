import sendEmail from "@/jikopoint/utils/sendEmail";

export default async function send(req, res) {
  const { subject, email, content } = req?.query;
  await sendEmail({ subject, email, content });
  res.end();
}
