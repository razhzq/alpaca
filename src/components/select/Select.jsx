import Select from "react-select";

const CustomOption = ({ innerProps, label, isSelected }) => (
  <div
    className={`${
      isSelected ? "!bg-blue !text-white" : ""
    } px-3 py-2 hover:bg-blueLight`}
    {...innerProps}
  >
    {label}
  </div>
);
const customDropdownIndicator = ({ innerProps, isFocused }) => (
  <div className="pr-2" {...innerProps}>
    <svg
      width="13"
      height="8"
      viewBox="0 0 13 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={`${isFocused ? "fill-blue" : "fill-black"}`}
        d="M6.01 7.425L12.02 1.415L10.607 0L6.01 4.6L1.414 0L0 1.414L6.01 7.425Z"
      />
    </svg>
  </div>
);

function CustomSelect({options}) {
  return (
    <Select
      components={{
        Option: CustomOption,
        DropdownIndicator: customDropdownIndicator,
      }}
      options={options}
    />
  );
}

export default CustomSelect