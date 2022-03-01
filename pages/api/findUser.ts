import type { NextApiRequest, NextApiResponse } from "next";
import { table, minifyRecord } from "./utils/Airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = getSession(req, res);
  try {
    const updatedRecords = await table
      .select({
        filterByFormula: `{userID} = "${session?.user.nickname}"`,
      })
      .firstPage();

    res.status(200).json(minifyRecord(updatedRecords[0]));
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
}
