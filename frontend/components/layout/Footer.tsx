import dayjs from "dayjs";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 p-8 text-center text-zinc-300">
      Last updated {dayjs().format("MM/DD/YY [at] hh:mm A")}
      <br />
      <br />
      {"</>"} by{" "}
      <a href="https://github.com/chrispittman343" className="underline">
        Chris Pittman
      </a>
    </footer>
  );
}
