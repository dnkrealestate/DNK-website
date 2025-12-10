export default async function handler(req, res) {
    
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { fullName, email, phoneNumber, city } = req.body;

    if (!fullName || !email || !phoneNumber || !city) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Simulate API request (Replace this with actual API logic)
        const response = { success: true, message: "Lead submitted successfully" };

        if (!response.success) throw new Error(response.message);

        return res.status(200).json({ success: true, message: "Lead submitted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
