const router = require("express").Router();
const {
  filterPetsByTypeAndProperties,
  searchPets,
  populateLocationDropdown,
  populateAgeDropdown,
  addPets,
  getAnimals,
  deleteAllAnimals,
  populateGenderDropdown,
} = require("../controllers/animalsController");
const authenticateToken = require("../middlewares/middleware");

/**
 * Method: GET
 * Retrieve animals
 */
router.get("/getAnimals", getAnimals);

// router.delete("/deleteAllAnimals", deleteAllAnimals);

router.get("/populateGenderDropdown", populateGenderDropdown);

/**
 * Method: POST
 * Create a new animal
 */
router.post("/addPets", authenticateToken, addPets);

/**
 * Method: GET
 * Retrieve animals by type
 */
router.get("/searchPets", searchPets);

/**
 * Method: GET
 * Filter animals by type and properties
 */
router.get("/filterPetsByTypeAndProperties", filterPetsByTypeAndProperties);

/**
 * Method: GET
 * Retrieve the locations of pets by type
 */
router.get("/populateLocationDropdown", populateLocationDropdown);

/**
 * Method: GET
 * Retrieve the age of pets by type
 */
router.get("/populateAgeDropdown", populateAgeDropdown);

module.exports = router;
