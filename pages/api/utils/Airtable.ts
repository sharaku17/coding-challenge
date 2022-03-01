import type { NextApiRequest, NextApiResponse } from "next";

const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base(process.env.AIRTABLE_TABLE_NAME);

const minifyRecord = (record: any) => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

const minifyRecords = (records: any[]) => {
  return records.map((record) => minifyRecord(record));
};

export { table, minifyRecord, minifyRecords };
