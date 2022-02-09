import { NextApiRequest, NextApiResponse } from "next";
import data from "data/players.json";
import puppeteer from "puppeteer";
import UserAgent from "user-agents";
import { Match } from "types/PlayerData";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const statsURL = (playerID: string): string =>
    `https://csgostats.gg/player/${playerID}/faceit?date_start=1641016800&date_end=1643435999#/matches`;

  try {
    // Return all player data by awaiting multiple puppeteer browsers scraping by steamID
    const stackData = await Promise.all(
      data.players.map(async ({ name, steamID, photoURL }) => {
        // Instantiate a new browser + window
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setUserAgent(UserAgent.toString());

        // Begin loading page, parse when recieved
        const response = await page.goto(statsURL(steamID));
        const body = await response.text();
        const statsJSON: any = await getStatsJSON(body);
        statsJSON["userData"] = { name, steamID, photoURL };
        statsJSON.matches = await getUserMatchesJSON(body);

        return statsJSON;
      })
    );
    res.status(200).json(stackData);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      statusCode: 500,
      error: "Internal server error.",
      message: err.toString(),
    });
  }
};

/**
 * Returns Promise which resolves to all of a users match data within the given time range
 * @param body document body fetched using puppeteer
 * @returns Promise which resolves to all of a users match data within the given time range
 */
const getUserMatchesJSON = async (body: string): Promise<any> => {
  const startIx = body.indexOf('id="player-matches"', 35000);
  const endIx = body.indexOf('id="player-graphs"', 35000);
  return body
    .substring(startIx, endIx)
    .replace(/\\|\n|;/, "")
    .replace(/\s+/g, " ")
    .split("<tr")
    .slice(2)
    .map((tr) => {
      const matchData = tableRowToJSON(tr);
      return matchData;
    });
};

/**
 * Parsing function to deconstruct a <tr> and its <td> children into match data. Returns the match data as JSON.
 * @param row table row containing information about a match. Must conform to the methods used to parse!
 * @returns Promise which resolves to a user's data within a single match (as JSON)
 */
const tableRowToJSON = (row: string): Match => {
  const match: any = {};
  const td = row.split("<td");
  let ix: number;
  const stdParse = (index: number) =>
    parseFloat(
      td[index].substring(td[index].indexOf(">") + 1, td[index].indexOf("<"))
    );

  // Date (Formatted as "Do MMM YY")
  match.date = td[1]
    .substring(td[1].indexOf(">", 30) + 1, td[1].indexOf("<", 30))
    .trim()
    .substring(4);

  // Map
  match.map = td[3]
    .substring(td[3].indexOf(">", 30) + 1, td[3].indexOf("<", 30))
    .trim();

  // Score
  match.score = td[4]
    .substring(td[4].indexOf(">", 10) + 1, td[4].indexOf("<", 15))
    .split(":")
    .map((n) => parseInt(n));

  // Rank
  // --------

  // K
  match.kills = stdParse(7);

  // D
  match.deaths = stdParse(8);

  // A
  match.assists = stdParse(9);

  // +/-
  match.kdDiff = stdParse(10);

  // HS%
  match.hs = stdParse(11);

  // ADR
  match.adr = stdParse(12);

  // 1v5
  match["1v5"] = stdParse(13);

  // 1v4
  match["1v4"] = stdParse(14);

  // 1v3
  match["1v3"] = stdParse(15);

  // 1v2
  match["1v2"] = stdParse(16);

  // 1v1
  match["1v1"] = stdParse(17);

  // 5k
  match["5k"] = stdParse(18);

  // 4k
  match["4k"] = stdParse(19);

  // 3k
  match["3k"] = stdParse(20);

  // Rating
  match.rating = stdParse(21);

  // MatchID
  ix = td[22].indexOf("/match/") + 7;
  match.id = td[22].substring(ix, ix + 8);

  return match;
};

/**
 * Parses the input for player stats, sanitizes the text, and returns it as parsed JSON.
 * @param body document body fetched using puppeteer
 * @returns Promise which resolves to player stats in JSON
 */
const getStatsJSON = async (body: string): Promise<object> => {
  const startIx = body.indexOf("var stats = {", 39000) + "var stats = ".length;
  const endIx = body.indexOf("display_stats()", startIx) - 1;
  const statsText = body.substring(startIx, endIx).replace(/\\|\n|;/g, "");
  return await JSON.parse(statsText);
};

export default handler;
