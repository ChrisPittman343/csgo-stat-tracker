import type { NextPage } from "next";
import { useRouter } from "next/router";

const MatchHome: NextPage = () => {
  const router = useRouter();
  const { matchID } = router.query;

  return <div></div>;
};
export default MatchHome;
