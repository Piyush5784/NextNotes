import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";

const CustomCard = () => {
  return (
    <div className="flex w-full justify-center items-center text-xl text-center mt-[0.5px]">
      <div className="card">
        <div className="card__border"></div>
        <div className="card_title__container">
          {/* <span className="card_title"></span> */}
          <p className="text-xl px-3">
            Join our community and contribute to our projects on GitHub! We Are
            Open Source
          </p>
        </div>
        <hr className="line bg-gradient-to-r from-violet-600 to-indigo-600" />
        {/* <ul className="card__list">
          <li className="card__list_item">
            <span className="check">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="check_svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="list_text">Collaborate with Developers</span>
          </li>
          <li className="card__list_item">
            <span className="check">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="check_svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="list_text">Contribute to Projects</span>
          </li>
          <li className="card__list_item">
            <span className="check">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="check_svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="list_text">Learn and Grow</span>
          </li>
       
        </ul> */}
        <div className="flex justify-center items-center">
          <Button asChild>
            <Link
              href="https://github.com"
              className="button flex items-center justify-center w-10 "
              // target="_blank"
            >
              {" "}
              <p>Star our GitHub</p>
              <BsGithub className="text-xl mx-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
