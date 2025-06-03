
import Contacts from "../models/contacts";


export const fetchContacts = async (req, res) => {
    try {
        const contacts = await Contacts.find();
        res.json(contacts);
    } catch (error) {
        console.log(error);
    }
}


export const createContact = async (req, res) => {
    try {
        const { contact } = req.body;
        const contactData = await Contacts.create(contact);
        res.json(contactData);
    } catch (error) {
        console.log(error);
    }
}

export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { contact } = req.body;
        const contactData = await Contacts.findByIdAndUpdate(id, contact);
        res.json(contactData);
    } catch (error) {
        console.log(error);

    }
}


export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contactData = await Contacts.findByIdAndDelete(id);
        res.json(contactData);
    }
    catch (error) {
        console.log(error);
    }
}

export const addTags = async (req, res) => {
    try {
        const { id } = req.params;
        const { tags } = req.body;
        const contactData = await Contacts.findByIdAndUpdate(id, { $push: { tags } });
        res.json(contactData);
    }
    catch (error) {
        console.log(error);
    }
}