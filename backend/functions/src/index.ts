import * as functions from "firebase-functions";

export const getStats = functions.https.onCall(
  async ({ start, end, steamIDs }, ctx) => {}
);

export const updateStats = functions.pubsub
  .schedule("0 0 * * *") // Every day at midnight
  .onRun(async (ctx) => {});
