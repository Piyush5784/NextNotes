import { ReactNode } from "react";
import { Button } from "../ui/button";

interface PrimaryButtonProps {
  children: ReactNode;
  disabled?: boolean;
  variant?:
    | "outline"
    | "secondary"
    | "link"
    | "default"
    | "destructive"
    | "ghost";

  onClickEvent?: () => void;
}

const PrimaryButton = ({
  children,
  variant,
  onClickEvent,
  disabled,
}: PrimaryButtonProps) => {
  return (
    <>
      <Button
        variant={variant}
        onClick={onClickEvent}
        disabled={disabled}
        className="hidden ml-2 md:inline-flex border text-primary border-primary bg-transparent hover:bg-hoverBg hover:border-secondary  hover:text-primary shadow-inner hover:shadow-hoverShadow transition-all duration-150 "
      >
        {children}
      </Button>
    </>
  );
};

export default PrimaryButton;
