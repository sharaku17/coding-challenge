import type { NextApiRequest, NextApiResponse } from "next";
import { table, minifyRecords } from "./utils/Airtable";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const records = await table.select({}).firstPage();
    const minifiedRecords = minifyRecords(records);
    res.status(200).json(minifiedRecords);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
}
