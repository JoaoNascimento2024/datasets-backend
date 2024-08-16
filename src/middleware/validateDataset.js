import yup from "yup";

export const datasetSchemaValidate = yup.object().shape({
    name: yup.string().required("Dataset name is required. (yup)").min(1).max(50),
    description: yup.string()
});