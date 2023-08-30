import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { Item } from "../../components/definitions";
import axios from "axios";

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

enum FormFields {
  title = "title",
  text = "text",
  image = "image",
  linkText = "linkText",
  linkPath = "linkPath",
}

interface FormErrors {
  [key: string]: string;
}
interface indexProps {}

export const NewPortal: NextPage<indexProps> = ({}) => {
  const [formData, setFormData] = useState<Item | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const getFormErrors = () => {
    const newErrors: FormErrors = {};

    if (!formData?.title) {
      newErrors[FormFields.title] = `Please insert ${FormFields.title} `;
    }

    if (!formData?.text) {
      newErrors[FormFields.text] = `Please insert ${FormFields.text} `;
    }
    if (!formData?.image) {
      newErrors[FormFields.image] = `Please insert ${FormFields.image} `;
    }

    if (!formData?.link.linkText) {
      newErrors[FormFields.linkText] = `Please insert ${FormFields.linkText} `;
    }
    if (!formData?.link.linkPath) {
      newErrors[FormFields.linkPath] = `Please insert ${FormFields.linkPath} `;
    }

    return newErrors;
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = getFormErrors();
    setFormErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      console.log("errors! cannot submit");
      return;
    }

    try {
      const response = await axios.post("/api/myapi", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setFormErrors({});
    setFormData(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === FormFields.linkPath || name === FormFields.linkText) {
      setFormData(
        (prev) =>
          ({
            ...prev,
            link: {
              ...prev?.link,
              [name]: value,
            },
          } as Item)
      );
      return;
    }
    setFormData(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        } as Item)
    );
  };

  return (
    <div
      style={{
        boxShadow: "0 4px 8px rgba(200,200,200,200)",
        borderRadius: "0.5rem",
        width: "50%",
        fontSize: "1rem",
        padding: "0 0 3rem 3rem",
      }}
    >
      <h1>Add news to the feed</h1>

      <form
        onSubmit={submitForm}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <CustomInput
          id={FormFields.title}
          value={formData?.title}
          handleInputChange={handleInputChange}
          fieldError={formErrors[FormFields.title]}
        />
        <CustomInput
          id={FormFields.text}
          value={formData?.text}
          handleInputChange={handleInputChange}
          fieldError={formErrors[FormFields.text]}
        />
        <CustomInput
          id={FormFields.image}
          value={formData?.image}
          handleInputChange={handleInputChange}
          fieldError={formErrors[FormFields.image]}
        />
        <CustomInput
          id={FormFields.linkText}
          value={formData?.link?.linkText}
          handleInputChange={handleInputChange}
          fieldError={formErrors[FormFields.linkText]}
        />
        <CustomInput
          id={FormFields.linkPath}
          value={formData?.link?.linkPath}
          handleInputChange={handleInputChange}
          fieldError={formErrors[FormFields.linkPath]}
        />

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <input type="submit" value="Add a news item" />
        </div>
      </form>
    </div>
  );
};
export default NewPortal;
