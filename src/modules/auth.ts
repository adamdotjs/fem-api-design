import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash);
};

const hashPassword = (password) => {
	return bcrypt.hash(password, 5);
};

// Create a JWT -- This is a token that's encrypted with the data you pass into it. In this case, the user ID and username. This token is sent back to the client to be stored in a cookie/storage for authentication.
const createJWT = (user) => {
	const token = jwt.sign(
		{
			id: user.id,
			username: user.username,
		},
		process.env.JWT_SECRET
	);
	return token;
};

// Middleware to check whether the user is sending a token in their request. If no token sent or invalid, block the request.
const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({ message: "Not authorized" });
		return;
	}

	const [_, token] = bearer.split(" ");

	if (!token) {
		res.status(401);
		res.json({ message: "Not authorized" });
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (error) {
		res.status(401);
		res.json({ message: "Invalid token" });
		return;
	}
};

export { comparePasswords, hashPassword, createJWT, protect };
