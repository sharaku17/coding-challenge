import type { NextApiRequest, NextApiResponse } from "next";
import { table, minifyRecord } from "./utils/Airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = getSession(req, res);
  console.log(session);
  const { favList } = req.body;
  const { id } = req.body;
  console.log(favList, id);
  try {
    const updatedRecords = await table.update([
      {
        id: id,
        fields: {
          favList: favList,
          userID: session?.user.nickname,
        },
      },
    ]);

    res.status(200).json(minifyRecord(updatedRecords[0]));
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
