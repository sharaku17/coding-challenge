import type { NextApiRequest, NextApiResponse } from "next";
import { table, minifyRecord } from "./utils/Airtable";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.body;
  try {
    const deletedRecords = await table.destroy([id]);

    res.status(200).json(minifyRecord(deletedRecords[0]));
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
}
