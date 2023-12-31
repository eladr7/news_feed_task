export interface ItemLink {
  linkText: string;
  linkPath: string;
}
export interface Item {
  title: string;
  text: string;
  image: string;
  link: ItemLink;
}

export const emptyFromData: Item = {
  title: "",
  text: "",
  image: "",
  link: {
    linkPath: "",
    linkText: "",
  },
};
