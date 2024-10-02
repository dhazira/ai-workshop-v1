import axios from "axios";

async function fetchListingById({id}) {
    try {
        const response = await axios.get(
            `https://apigw.prd.athomegroup.lu/api-listings/listings/${id}/`, {
            // `https://api-listings.dev.athome.lu/listings/${id}/`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                }
            }
        );

        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}
