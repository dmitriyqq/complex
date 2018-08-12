import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import CurveItem from "../src/UI/Components/CurveItem";
import { Circle, Hyperbola } from "../src/Model/Curves";

storiesOf("Curve Item", module).add("to Storybook", () => (
  <CurveItem curve={new Hyperbola()} />
));
