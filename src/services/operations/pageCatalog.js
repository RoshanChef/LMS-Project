import toast from "react-hot-toast";
import apiconnector from "../apiconnector";
import { catalogData } from "../api";

const { CATALOGPAGEDATA_API } = catalogData;

export async function getCatalogData(categoryId, token) {
    let result = [];
    const toastId = toast.loading("Loading Catalogs ...");
    try {
        const response = await apiconnector('POST', CATALOGPAGEDATA_API, { categoryId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        //console.log('response getCatalogData api', response.data);

        if (!response?.data?.success) {
            toast.error(response?.data?.message || "Unknown error");
        }

        result = response.data;
    } catch (error) {
        console.log("CATALOG_DATA_API API ERROR............", error);
        console.log(
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch catalog data"
        );
    } finally {
        toast.dismiss(toastId);
    }
    return result;
}
