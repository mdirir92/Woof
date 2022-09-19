var express = require("express");
var checkAuth = require("../middleware/check-auth");
var Dog = require("../models/dog");
var router = express.Router();

//router to return all the rated dogs
router.get("/rated/all", async (req, res, next) => {
  const filter = req.query.filter;
  try {
    if (filter === "highest_rating") {
      const dogs = await Dog.find({ rating: { $gt: 0 } }).sort({ rating: -1 });
      res.status(200).json(dogs);
    } else if (filter === "lowest_rating") {
      const dogs = await Dog.find({ rating: { $gt: 0 } }).sort({ rating: 1 });
      res.status(200).json(dogs);
    } else {
      const dogs = await Dog.find({ rating: { $gt: 0 } });
      res.status(200).json(dogs);
    }
  } catch (error) {
    res.status(500).json({ message: "Fetching dogs failed!" });
  }
});

//router to return the favourite dogs of the user
router.post("/favourites/all", checkAuth, (req, res, next) => {
  const user = req.user;
  res.json(user.favourites);
});

//router to add a dog to the favourite dogs of the user
router.post("/favourites/new", checkAuth, async (req, res, next) => {
  const user = req.user;
  const { url } = req.body;
  const isAlreadPresent = user.favourites.includes(url);
  if (isAlreadPresent) {
    return res
      .status(500)
      .json({ message: "Dog already present in favourites!" });
  }
  user.favourites.push(url);
  try {
    await user.save();
    res.json(user.favourites);
  } catch (error) {
    res.status(500).json({ message: "Adding dog to favourites failed!" });
  }
});

//router to remove a dog to the favourite dogs of the user
router.delete("/favourites/delete", checkAuth, async (req, res, next) => {
  const user = req.user;
  const { url } = req.body;
  user.favourites.pull(url);
  try {
    await user.save();
    res.json(user.favourites);
  } catch (error) {
    res.status(500).json({ message: "Deleting dog from favourites failed!" });
  }
});

//router to add a dog to the favourite dogs of the user
router.post("/rating", async (req, res, next) => {
  const { url, rating } = req.body;
  try {
    const dog = await Dog.findOne({ url: url });
    if (dog) {
      dog.totalRatings = dog.totalRatings + 1;
      dog.rating = (dog.rating + rating) / dog.totalRatings;
      await dog.save();
      res.json({ message: "The dog was rated successfully" });
    } else {
      const newDog = new Dog({
        url,
        rating,
        totalRatings: 1,
      });
      await newDog.save();
      res.json({ message: "The dog was rated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

module.exports = router;
