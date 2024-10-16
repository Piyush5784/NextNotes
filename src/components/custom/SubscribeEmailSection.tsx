import SubscribeEmail from "./SubscribeEmail";

const SubscribeEmailSection = () => {
  return (
    <section
      id="cta"
      className="w-full py-12 md:py-24 lg:py-32 dark:text-white"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Start Organizing Your Thoughts Today
          </h2>
          <p className="max-w-2xl text-lg md:text-xl">
            Join thousands of users who have transformed their note-taking
            experience with NextNotes.
          </p>
          <div className="w-full max-w-md space-y-4">
            <SubscribeEmail />
            {/* <p className="text-sm text-gray-200">
              By signing up, you agree to our{" "}
              <Link className="underline underline-offset-2" href="#">
                Terms & Conditions
              </Link>
              .
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeEmailSection;
