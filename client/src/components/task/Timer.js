import { useEffect, useState } from "react";

import dayjs from "dayjs";
dayjs.extend(require("dayjs/plugin/relativeTime"));

export default function Timer({ time }) {
  const [realTime, setRealTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTime(dayjs(time).add(1, "second").fromNow());
    }, 1000)
    return () => clearInterval(interval);
  })

  return <>{realTime}</>
}