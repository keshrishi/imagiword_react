import axios from "axios";
import userModel from '../models/userModel.js';
import FormData from "form-data";

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        // Check if userId and prompt are provided
        if (!userId || !prompt) {
            return res.json({
                success: false,
                message: "Missing details",
            });
        }

        // Find user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        // Check if user has sufficient credit balance
        if (user.creditBalance <= 0) {
            return res.json({
                success: false,
                message: "No credit balance",
                creditBalance: user.creditBalance,
            });
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("prompt", prompt);

        // Call ClipDrop API
        const { data } = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            formData,
            {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API,
                },
                responseType: "arraybuffer",
            }
        );

        // Convert binary data to base64 image
        const base64Image = Buffer.from(data, "binary").toString("base64");
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Update user's credit balance
        await userModel.findByIdAndUpdate(user._id, {
            creditBalance: user.creditBalance - 1,
        });

        // Send success response
        res.json({
            success: true,
            message: "Image generated",
            creditBalance: user.creditBalance - 1,
            resultImage,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: "An error occurred while generating the image",
            error: error.message,
        });
    }
};
