import * as React from "react";
import Typography from "@mui/material/Typography";

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { statColor, statLabel } from "@/libs/helpers";

export default function Stat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <CircularProgressbarWithChildren
      value={value}
      minValue={1}
      maxValue={255}
      strokeWidth={12}
      styles={buildStyles({
        pathColor: `${statColor(label)}`,
      })}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: {
            xs: 20,
            md: 32,
          },
          color: `${statColor(label)}`,
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontSize: {
            xs: 12,
            md: 14,
          },
        }}
      >
        {statLabel(label)}
      </Typography>
    </CircularProgressbarWithChildren>
  );

  // return (
  //   <CircularProgressbar
  //     value={value}
  //     text={`${value}%`}
  //     styles={buildStyles({
  //       // Rotation of path and trail, in number of turns (0-1)
  //       rotation: 0.25,

  //       // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
  //       strokeLinecap: "butt",

  //       // Text size
  //       textSize: "16px",

  //       // How long animation takes to go from one percentage to another, in seconds
  //       pathTransitionDuration: 0.5,

  //       // Can specify path transition in more detail, or remove it entirely
  //       // pathTransition: 'none',

  //       // Colors
  //       pathColor: "#f00",
  //       textColor: "#f88",
  //       trailColor: "#d6d6d6",
  //       backgroundColor: "#3e98c7",
  //     })}
  //   />
  // );
}
