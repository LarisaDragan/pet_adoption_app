const Animals = require("../models/animals");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const { SECRET = "secret" } = process.env;

const getAnimals = (req, res) => {
  Animals.find({})
    .then((data) => res.json(data))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Animals not found.", error: err.message })
    );
};

//***********************************************used in front end ***************************************************************

// search

const searchPets = (req, res) => {
  const { searchedPet } = req.query;

  let query = {};

  const otherPetTypes = { $nin: ["Cat", "Dog", "Bird"] };
  const singlePetTypes = ["Cat", "Dog", "Bird"];

  if (searchedPet === "other") {
    query = { type: otherPetTypes };
  } else if (singlePetTypes.includes(searchedPet)) {
    query = { type: searchedPet };
  }

  Animals.find(query)
    .then((data) => res.json(data))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Animals not found.", error: err.message })
    );
};

// populate dropdowns

const populateLocationDropdown = (req, res) => {
  const { searchedPet } = req.query;

  let query = {};

  const otherPetTypes = { $nin: ["Cat", "Dog", "Bird"] };
  const singlePetTypes = ["Cat", "Dog", "Bird"];

  if (searchedPet === "other") {
    query = { type: otherPetTypes };
  } else if (singlePetTypes.includes(searchedPet)) {
    query = { type: searchedPet };
  }

  Animals.distinct("location", query)
    .then((locations) => res.json(locations))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error getting locations", error: err.message })
    );
};

const populateGenderDropdown = (req, res) => {
  const { searchedPet } = req.query;

  let query = {};

  const otherPetTypes = { $nin: ["Cat", "Dog", "Bird"] };
  const singlePetTypes = ["Cat", "Dog", "Bird"];

  if (searchedPet === "other") {
    query = { type: otherPetTypes };
  } else if (singlePetTypes.includes(searchedPet)) {
    query = { type: searchedPet };
  }

  Animals.distinct("gender", query)
    .then((gender) => res.json(gender))
    .catch((err) =>
      res.status(500).json({
        message: "Error getting the gender of the pets",
        error: err.message,
      })
    );
};

const populateAgeDropdown = (req, res) => {
  const { searchedPet } = req.query;

  let query = {};

  const otherPetTypes = { $nin: ["Cat", "Dog", "Bird"] };
  const singlePetTypes = ["Cat", "Dog", "Bird"];

  if (searchedPet === "other") {
    query = { type: otherPetTypes };
  } else if (singlePetTypes.includes(searchedPet)) {
    query = { type: searchedPet };
  }

  Animals.distinct("age", query)
    .then((ages) => res.json(ages))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error getting ages", error: err.message })
    );
};

// filters

const filterPetsByTypeAndProperties = (req, res) => {
  const { location, type, gender, age } = req.query;
  let query = {};

  const singlePetTypes = ["Cat", "Dog", "Bird"];

  if (type === "other") {
    query.type = { $nin: ["Cat", "Dog", "Bird"] };
  } else if (singlePetTypes.includes(type)) {
    query.type = type;
  }

  if (location) {
    query.location = location;
  }

  if (gender) {
    query.gender = gender;
  }

  if (age) {
    query.age = { $gt: age[0], $lte: age[1] }; // 0 < = 1
  }

  Animals.find(query)
    .then((data) => {
      if (data.length === 0) {
        res.status(404).json({ message: "No matching pets found!" });
      } else {
        res.json(data);
      }
    })
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Error finding pets.", error: err.message })
    );
};

// add pet

const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

const addPets = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  let userId;

  try {
    const decoded = jwt.verify(token, SECRET);
    userId = decoded.userId;
  } catch (error) {
    console.error("Error decoding token:", error.message);
    res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const existingUser = await User.findOne({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      petName,
      location,
      age,
      type,
      gender,
      size,
      breed,
      description,
      remarks,
      photos,
    } = req.body;

    if (!petName || !location || !type || !gender || !age || !photos) {
      return res.status(400).json({
        message: "Missing required fields in the request body",
      });
    }

    if (photos.length < 2) {
      return res
        .status(400)
        .json({ message: "Please upload at least 2 photos!" });
    }

    const titleCasePetName = toTitleCase(petName);
    const titleCaseLocation = toTitleCase(location);
    const titleCaseType = toTitleCase(type);
    const titleCaseBreed = toTitleCase(breed);
    const titleCaseGender = toTitleCase(gender);
    const titleCaseSize = toTitleCase(size);

    const animal = new Animals({
      petName: titleCasePetName,
      location: titleCaseLocation,
      age,
      type: titleCaseType,
      gender: titleCaseGender,
      size: titleCaseSize,
      breed: titleCaseBreed,
      description,
      remarks,
      photos,
      userId: existingUser._id,
      userName: toTitleCase(existingUser.userName),
      userEmailAddress: existingUser.emailAddress,
    });

    await animal.save();
    return res
      .status(201)
      .json({ statusCode: 201, message: "Pet added successfully!" });
  } catch (error) {
    console.error("Error adding pet:", error);
    res.status(500).json({ message: "Pet couldn't be added!" });
  }
};

module.exports = {
  addPets,
  searchPets,
  filterPetsByTypeAndProperties,
  populateLocationDropdown,
  populateAgeDropdown,
  populateGenderDropdown,
  getAnimals,
};
