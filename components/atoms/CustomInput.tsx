import { ChangeEvent } from "react";

interface CustomInputProps {
  id: string;
  value: string | undefined;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fieldError: string | null;
}
const CustomInput: React.FC<CustomInputProps> = ({
  id,
  value,
  handleInputChange,
  fieldError = null,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
      }}
    >
      <label
        htmlFor={id}
        style={{
          flexBasis: "15%",
        }}
      >
        Insert {id}
      </label>
      <input
        type="text"
        name={id}
        id={id}
        value={value}
        onChange={handleInputChange}
        style={{
          flexBasis: "20%",
          marginTop: "0.3rem",
        }}
      />
      {fieldError && (
        <div
          style={{
            flexBasis: "20%",
            color: "red",
          }}
        >
          {fieldError}
        </div>
      )}
    </div>
  );
};
export default CustomInput;
