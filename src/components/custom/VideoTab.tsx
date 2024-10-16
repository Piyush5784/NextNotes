"use client";
import { BackgroundGradient } from "../acernity-components/Background-gradiant";
import { ContainerScroll } from "../acernity-components/Scroll-animation";
const VideoTab = () => {
  return (
    <>
      <div className="flex flex-col">
        <ContainerScroll>
          <div className="hidden  md:flex w-full h-full justify-center items-center relative top-[-150px]">
            <div className="absolute  bottom-[33rem] rounded-full h-[5rem] w-[80%]  opacity-50 blur-3xl   bg-gradient-to-r from-purple-600 to-blue-600"></div>
            <BackgroundGradient className="rounded">
              {" "}
              <video
                autoPlay
                muted
                className="w-[900px] h-auto border border-gradient-to-r from-purple-600 to-blue-600  rounded-lg"
              >
                <source src="/Demo.mp4" type="video/mp4" />
              </video>
            </BackgroundGradient>
          </div>
        </ContainerScroll>
      </div>
    </>
  );
};

export default VideoTab;
