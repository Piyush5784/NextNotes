import { TracingBeam } from "@/components/acernity-components/Tracing-beam";
import Appbar from "@/components/custom/Appbar";
import HeroContent from "@/components/custom/HeroContent";
import HomeComponent from "@/components/custom/Home";
import VideoTab from "@/components/custom/VideoTab";

export default function Home() {
  return (
    <>
      <Appbar />
      <TracingBeam>
        {/* <GridBackground> */}
        <HeroContent />
        <VideoTab />

        {/* </GridBackground> */}
        <HomeComponent />
      </TracingBeam>
    </>
  );
}
