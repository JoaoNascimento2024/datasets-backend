import yup from "yup";
import sanitizeHtml from "sanitize-html";


yup.addMethod(yup.string, 'sanitize', function(){
    return this.transform((value, originalValue) => {
        return typeof originalValue === "string" ? sanitizeHtml(originalValue) : originalValue;
    });
});

/*
export const datasetSchemaValidate = yup.object().shape({
    name: yup.string().required("Dataset name is required. (yup)").min(1).max(50),
    description: yup.string()
});
*/

export const datasetSchemaValidate = yup.object({
    name : yup.string().sanitize().required("Dataset name is required"),
    description : yup.string().sanitize().required("Description is required")
});