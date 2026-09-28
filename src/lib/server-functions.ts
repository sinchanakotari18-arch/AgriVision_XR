import { createServerFn } from "@tanstack/react-start";
import { getDbStatus, seedMongoDb, getCollectionData, insertDocument } from "./mongodb";

export const fetchMongoDbStatus = createServerFn({ method: "GET" }).handler(async () => {
  return await getDbStatus();
});

export const seedMongoDbDataFn = createServerFn({ method: "POST" }).handler(async () => {
  const result = await seedMongoDb();
  const status = await getDbStatus();
  return { ...result, status };
});

export const getMongoUsers = createServerFn({ method: "GET" }).handler(async () => {
  return await getCollectionData("users");
});

export const saveMongoUser = createServerFn({ method: "POST" })
  .validator((user: any) => user)
  .handler(async ({ data }) => {
    return await insertDocument("users", data);
  });

export const getMongoScans = createServerFn({ method: "GET" }).handler(async () => {
  return await getCollectionData("scans");
});

export const saveMongoScan = createServerFn({ method: "POST" })
  .validator((scan: any) => scan)
  .handler(async ({ data }) => {
    return await insertDocument("scans", data);
  });

export const getMongoAssessments = createServerFn({ method: "GET" }).handler(async () => {
  return await getCollectionData("assessments");
});

export const saveMongoAssessment = createServerFn({ method: "POST" })
  .validator((assessment: any) => assessment)
  .handler(async ({ data }) => {
    return await insertDocument("assessments", data);
  });


