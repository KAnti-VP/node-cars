import Phone from "../models/phone.js";

export const getAllPhones = async (req, res) => {
  try {
    const phones = await Phone.findAll();
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPhoneById = async (req, res) => {
  try {
    const phone = await Phone.findByPk(req.params.id);
    if (!phone) {
      return res.status(404).json({ message: "Phone not found" });
    }
    res.status(200).json(phone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPhone = async (req, res) => {
  try {
    const { brand, model, nfc, camera } = req.body;
    if (!brand || !model || !nfc || !camera) {
      return res.status(400).json({ message: "Missing data" });
    }
    const phone = await Phone.findOne({ where: { brand, model, nfc, camera } });
    if (phone) {
      return res.status(409).json({ message: "Phone already exists" });
    }
    const newPhone = await Phone.create({ brand, model, nfc, camera });
    res.status(201).json(newPhone.toJSON());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePhone = async (req, res) => {
    try {
        const phone = await Phone.findByPk(req.params.id);
        if (!phone) {
            return res.status(404).json({ message: "Phone not found" });
          }
        const { brand, model, nfc, camera } = req.body;
        if (!brand || !model || !nfc || !camera) {
          return res.status(400).json({ message: "Missing data" });
        }
        const updatedPhone = await phone.update({brand, model, nfc, camera})        
        res.status(200).json({message: 'Update successful'});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

export const deletePhone = async (req, res) => {
  try {
    const phone = await Phone.findByPk(req.params.id);
    if (!phone) {
      return res.status(404).json({ message: "Phone not found" });
    }
    const result = await phone.destroy();
    if (!result) {
      return res.status(500).json({ message: "Server error" });
    }
    res.status(200).json({ message: "Delete successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
