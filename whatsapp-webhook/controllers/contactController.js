import Contacts from "../models/contacts.js";

// Fetch all contacts
export const fetchContacts = async (req, res) => {
    try {
        const contacts = await Contacts.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: "Failed to fetch contacts" });
    }
};

// Create a new contact
export const createContact = async (req, res) => {
    try {
        
        console.log(req.body);
        const contactData = await Contacts.create(req.body);
        res.status(201).json(contactData);
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ message: "Failed to create contact"  });
    }
};

// Update an existing contact
export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { contact } = req.body;
        const contactData = await Contacts.findByIdAndUpdate(id, contact, { new: true });
        res.status(200).json(contactData);
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ message: "Failed to update contact" });
    }
};

// Delete a contact
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contactData = await Contacts.findByIdAndDelete(id);
        res.status(200).json(contactData);
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({ message: "Failed to delete contact" });
    }
};

// Add tags to a contact
export const addTags = async (req, res) => {
    try {
        const { id } = req.params;
        const { tags } = req.body;
        const contactData = await Contacts.findByIdAndUpdate(id, { $push: { tags: { $each: tags } } }, { new: true });
        res.status(200).json(contactData);
    } catch (error) {
        console.error("Error adding tags:", error);
        res.status(500).json({ message: "Failed to add tags" });
    }
};
