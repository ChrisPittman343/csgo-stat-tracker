import type { NextPage } from "next";
import { useRouter } from "next/router";

const PlayerHome: NextPage = () => {
  const router = useRouter();
  const { steamID } = router.query;

  return (
    <div>
      <div>Sidebar w/ basic info</div>
      <div>Main stats panel, matches below</div>
      {steamID}
    </div>
  );
};
export default PlayerHome;
