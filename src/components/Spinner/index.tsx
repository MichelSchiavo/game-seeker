const spinnerSize = {
  small: "h-4 w-4",
  medium: "h-6 w-6",
  large: "h-8 w-8",
};

interface ISpinner {
  size?: keyof typeof spinnerSize;
}

export function Spinner(props: ISpinner) {
  return (
    <div
      className={`inline-block ${
        spinnerSize[props.size || "large"]
      } animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    ></div>
  );
}
