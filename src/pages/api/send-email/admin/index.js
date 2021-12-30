import { getAdminUsers } from "@/jikopoint/controllers/user";
import sendEmail from "@/jikopoint/utils/sendEmail";

export default async function send(req, res) {
  const { subject, content } = req?.query;

  const users = await getAdminUsers();

  await Promise.all(
    users?.map(async ({ email }) => {
      await sendEmail({ subject, email, content });
    })
  );

  res.end();
}
