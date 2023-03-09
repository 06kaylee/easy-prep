const FavoriteMeal = require("../models/favorite-meal");
const dotenv = require("dotenv");
const multer = require("multer");
const crypto = require("crypto");
const sharp = require("sharp");
const AppError = require("../utils/appError");
const {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
	GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

dotenv.config({ path: "./.env" });

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
	credentials: {
		accessKeyId: accessKey,
		secretAccessKey,
	},
	region: bucketRegion,
});

const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new AppError("Not an image! Please only upload images.", 400), false);
	}
};

const upload = multer({
	storage,
	fileFilter: multerFilter,
});

const randomImageName = (bytes = 32) =>
	crypto.randomBytes(bytes).toString("hex");

exports.uploadFavoriteMealPic = upload.single("img");

// get all favorite meals
exports.allFavoriteMeals = async (req, res) => {
	try {
		const favoriteMeals = await FavoriteMeal.find({});

		for (const meal of favoriteMeals) {
			const params = {
				Bucket: bucketName,
				Key: meal.img,
			};
			const command = new GetObjectCommand(params);
			const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
			meal.img = url;
		}
		res.send(favoriteMeals);
	} catch (err) {
		console.log(`Error trying to get all of the favorite meals: ${err}`);
	}
};

// get a favorite meal by id
exports.getFavoriteMeal = async (req, res) => {
	try {
		const id = req.params.id;
		const favoriteMeal = await FavoriteMeal.findById(id);
		const params = {
			Bucket: bucketName,
			Key: favoriteMeal.img,
		};
		const command = new GetObjectCommand(params);
		const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
		favoriteMeal.img = url;

		res.send(favoriteMeal);
	} catch (err) {
		console.log(`Error trying to find the favorite meal: ${err}`);
	}
};

// delete a favorite meal by id
exports.deleteFavoriteMeal = async (req, res) => {
	try {
		const id = req.params.id;
		const favoriteMealToDelete = await FavoriteMeal.findByIdAndDelete(id);
		const params = {
			Bucket: bucketName,
			Key: favoriteMealToDelete.img,
		};

		const command = new DeleteObjectCommand(params);

		await s3.send(command);

		res.send(favoriteMealToDelete);
	} catch (err) {
		console.log(`Error trying to delete a favorite meal: ${err}`);
	}
};

// edit a favorite meal by id
exports.editFavoriteMeal = async (req, res) => {
	try {
		const id = req.params.id;

		if (req.file) {
			const imageName = randomImageName();

			const params = {
				Bucket: bucketName,
				Key: imageName,
				Body: req.file.buffer,
				ContentType: req.file.mimetype,
			};

			const command = new PutObjectCommand(params);

			await s3.send(command);

			req.body.img = imageName;
		}

		req.body.nutritionFacts = JSON.parse(req.body.nutritionFacts);
		req.body.rating = JSON.parse(req.body.rating);
		req.body.ingredients = JSON.parse(req.body.ingredients);
		req.body.steps = JSON.parse(req.body.steps);
		req.body.notes = JSON.parse(req.body.notes);

		const updatedFavoriteMeal = await FavoriteMeal.findByIdAndUpdate(
			id,
			req.body,
			{ runValidators: true, new: true }
		);
		res.send(updatedFavoriteMeal);
	} catch (err) {
		console.log(`Error while trying to update favorite meal: ${err}`);
	}
};

// add a favorite meal
exports.addFavoriteMeal = async (req, res) => {
	try {
		const imageName = randomImageName();

		const params = {
			Bucket: bucketName,
			Key: imageName,
			Body: req.file.buffer,
			ContentType: req.file.mimetype,
		};

		const command = new PutObjectCommand(params);

		// from Vue client -> express server -> s3 bucket
		await s3.send(command);

		req.body.img = imageName;
		req.body.nutritionFacts = JSON.parse(req.body.nutritionFacts);
		req.body.rating = JSON.parse(req.body.rating);
		req.body.ingredients = JSON.parse(req.body.ingredients);
		req.body.steps = JSON.parse(req.body.steps);
		req.body.notes = JSON.parse(req.body.notes);

		const newFavoriteMeal = new FavoriteMeal(req.body);
		const newFavoriteMealSaved = await newFavoriteMeal.save();
		res.send(newFavoriteMealSaved);
	} catch (err) {
		console.log(`Error while trying to save a new favorite meal: ${err}`);
	}
};
