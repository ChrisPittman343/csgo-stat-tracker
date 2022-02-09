import PlayerSidebar from "components/dash/PlayerSidebar";
import RecentMatches from "components/dash/RecentMatches";
import Layout from "components/layout/Layout";
import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    fetch("/api/playerData")
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return (
    <Layout>
      <main className="flex justify-center gap-8">
        <PlayerSidebar />
        <RecentMatches />
      </main>
    </Layout>
  );
};

export default Home;
