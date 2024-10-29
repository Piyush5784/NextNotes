import { TracingBeam } from "@/components/acernity-components/Tracing-beam";
import Appbar from "@/components/custom/Appbar";
import HeroContent from "@/components/custom/HeroContent";
import HomeComponent from "@/components/custom/Home";
import Spotlight from "@/components/custom/Spotlight/Spotlight";
import VideoTab from "@/components/custom/VideoTab";

import WorflowImg01 from "./../../public/workflow-01.png";
import WorflowImg02 from "./../../public/workflow-02.png";
import WorflowImg03 from "./../../public/workflow-03.png";
import Image from "next/image";
import SpotlightSection from "@/components/custom/Spotlight/SpotlightSection";

export default function Home() {
  return (
    <>
      <Appbar />

      <TracingBeam>
        {/* <GridBackground> */}
        <HeroContent />
        <VideoTab />
        {/* </GridBackground> */} <HomeComponent />
      </TracingBeam>
    </>
  );
}
