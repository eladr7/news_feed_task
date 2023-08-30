import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { Item, ItemLink, emptyFromData } from "../../components/definitions";
import axios from "axios";
import CustomInput from "../../components/atoms/CustomInput";

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
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<Item>(emptyFromData);

  const getFormErrors = () => {
    const newErrors: FormErrors = {};

    Object.entries(formData!).forEach(([k, v]) => {
      if (k === "link") {
        Object.entries(formData!.link).forEach(([k, v]) => {
          if (!v) {
            newErrors[FormFields[k as FormFields]] = `Please insert ${
              FormFields[k as FormFields]
            } `;
          }
        });
      }
      if (!v) {
        newErrors[FormFields[k as FormFields]] = `Please insert ${
          FormFields[k as FormFields]
        } `;
      }
    });

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
    setFormData(emptyFromData);
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
        {Object.entries(FormFields).map(([k, v]) => (
          <CustomInput
            key={k}
            id={k}
            value={
              k !== "link"
                ? (formData[k as keyof Item] as string)
                : (formData.link[k as keyof ItemLink] as string)
            }
            handleInputChange={handleInputChange}
            fieldError={formErrors[k]}
          />
        ))}
        <div>
          <input type="submit" value="Add a news item" />
        </div>
      </form>
    </div>
  );
};
export default NewPortal;
