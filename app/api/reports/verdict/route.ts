import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { IncomingForm } from "formidable";
import { updateReportVerdict } from "@/app/(admin-pages)/actions";

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req: NextApiRequest): Promise<{ fields: any; files: any }> {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { fields, files } = await parseForm(req);

    const reportId = fields.id?.[0] || fields.reportId?.[0];
    const verdict = fields.verdict?.[0];

    if (!reportId || !verdict) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const formData = new FormData();
    formData.append("id", reportId);
    formData.append("verdict", verdict);
    console.log(formData);

    await updateReportVerdict(formData);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
