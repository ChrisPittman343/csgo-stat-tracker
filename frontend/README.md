This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## CSGO Stats Tracker

Intended for the lads (only).
Tracks CSGO stats using <a href="https://csgostats.gg">csgostats.gg</a>. Calculates a few other things from those stats, such as:

- Average total wins
- Wins Above Replacement

## Stuff I have

- All CSGOStats data for each player
  - Ability to query stats between dates into JSON (Puppeteer)
  - Ability to query match (not ALL match data in a nice form, but can parse HTML if needed)
- Place to store + pull data from (Firestore)
- CRON job runner (Functions pubsub scheduler)
  - Endpoints to call from (Firebase functions)
- Goated JS framework + styling lib (Next + Tailwind)

## Stuff to display (on Dashboard)

- Monthly stats for the players (Sidebar vibe)

  - Photo
  - Name
  - W/R + Match count
  - Rating

- Stuff IDK where to put

  - ATW (# wins + (# rounds won in losses/# of rounds won by team you lost to))
  - WASP = Wins Above Stack Permutation (W/L differential) - (Team W/L differential)
    - Similar to WAR (Win Adjusted Rating, HLTV Rating x (.5 + win percentage in decimal))

- ~ 7 recent matches played by the stack

  - Score
  - isWin
  - Map
  - Date
  - Stack (Who played)
  - MVP
  - Sandbag

- Nav

  - Logo (link to dash)
  - Sign in (Will map UID to steamID)

- Footer
  - </> by ME
  - Last updated
