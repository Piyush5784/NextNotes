import Link from "next/link";
import { BackgroundBeamsWithCollision } from "../acernity-components/Background-bleam-with-collisions";
import CustomCard from "./card/CustomCard";
import { CardHoverEffect } from "./CardHover";
import SubscribeEmailSection from "./SubscribeEmailSection";

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen ">
        <main className="flex-1">
          {/* Hero Section */}
          {/* <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 h-screen">
            <div className="container px-4 md:px-6">
              <HeroSection />
            </div>
          </section> */}

          {/* Features Section */}
          <section id="features" className="w-full md:py-24 lg:py-32 ">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                Features
              </h2>
              <CardHoverEffect />
            </div>
          </section>

          {/* Call to Action Section */}
          <BackgroundBeamsWithCollision>
            <SubscribeEmailSection />
          </BackgroundBeamsWithCollision>

          <CustomCard />
        </main>

        {/* Footer */}
        <footer className="py-8 w-full text-gray-400 ">
          <div className="container flex flex-col items-center space-y-2 md:flex-row md:justify-between md:space-y-0 ">
            <p className="text-sm px-2">
              2024 NextNotes made by{" "}
              <Link
                href="https://x.com/Piyush5784"
                target="_blank"
                className="hover:underline"
              >
                Piyush
              </Link>
              .
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
