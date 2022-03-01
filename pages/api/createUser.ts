import type { NextApiRequest, NextApiResponse } from "next";
import { table, minifyRecord } from "./utils/Airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = getSession(req, res);
  try {
    const createdRecords = await table.create([
      {
        fields: {
          favList: "",
          userID: session?.user.nickname,
        },
      },
    ]);

    res.status(200).json(minifyRecord(createdRecords[0]));
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
