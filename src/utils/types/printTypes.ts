export type TDocumentData = {
  header: {
    docNumber: string
    day: string
    month: string
    year: string
  }
  body?: any;
  footer?: any
}

export type TDocument<CustomType> = {
  templateHTML: string;
  documentData: CustomType;
};