// File upload controller

export const single_book = (req, res) => {
    try {
        res.json({
            success: true,
            message: "File uploaded successfully",
            file: req.file
        });
    } catch (ex) {
        res.json({
            success: false,
            message: "File upload failed",
            file: null
        });
    };
};
