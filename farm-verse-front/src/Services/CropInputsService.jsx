import axios from "axios";

const CIN_URL = "http://localhost:9696/farmverse/crop-input";
const CEX_URL = "http://localhost:9696/farmverse/crop-exp";


// ================= ADD CROP INPUTS =================

export const addCropInputs = async (farmCropInputs) => {

    try {

        const response = await axios.post(
            CIN_URL,
            farmCropInputs,
            {
                withCredentials: true
            }
        );

        console.log("Add Crop Inputs Response:", response.data);

        return response.data;

    } catch (error) {

        console.error("Add Crop Inputs Error:", error);

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Response:", error.response.data);
        }

        throw error;
    }
};


// ================= GET CROP INPUTS =================

export const getCropInputsById = async (id) => {

    try {

        const response = await axios.get(
            `${CIN_URL}/${id}`,
            {
                withCredentials: true
            }
        );

        console.log("Crop Inputs Response:", response.data);

        return response.data;

    } catch (error) {

        console.error("Get Crop Inputs Error:", error);

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Response:", error.response.data);
        }

        throw error;
    }
};


// ================= DELETE CROP INPUTS =================

export const deleteCropInputsById = async (id) => {

    try {

        const response = await axios.delete(
            `${CIN_URL}/${id}`,
            {
                withCredentials: true
            }
        );

        console.log("Delete Crop Inputs Response:", response.data);

        return response.data;

    } catch (error) {

        console.error("Delete Crop Inputs Error:", error);

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Response:", error.response.data);
        }

        throw error;
    }
};


// ================= EXPENSE CALCULATION =================

export const expenseCalculation = async (id) => {

    try {

        console.log("Calling Expense API for Crop ID:", id);

        const response = await axios.get(
            `${CEX_URL}/${id}`,
            {
                withCredentials: true
            }
        );

        console.log("Expense API Status:", response.status);
        console.log("Expense API Response:", response.data);

        return response.data;

    } catch (error) {

        console.error("Expense Calculation Error:", error);

        if (error.response) {

            console.error(
                "Expense API Status:",
                error.response.status
            );

            console.error(
                "Expense API Response:",
                error.response.data
            );

        } else if (error.request) {

            console.error(
                "No response received from backend:",
                error.request
            );

        } else {

            console.error(
                "Request Error:",
                error.message
            );

        }

        throw error;
    }
};