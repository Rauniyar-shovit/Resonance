import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export const GenerateButton = ({
  size = "default",
  disabled,
  isSubmitting,
  onSubmit,
  className,
}: {
  size?: "default" | "sm";
  disabled: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
  className?: string;
}) => {
  return (
    <Button
      size={size}
      className={className}
      onClick={onSubmit}
      disabled={disabled}
    >
      {isSubmitting ? (
        <>
          <Spinner className="size-3" />
          Generating...
        </>
      ) : (
        "Generate speech"
      )}
    </Button>
  );
};
