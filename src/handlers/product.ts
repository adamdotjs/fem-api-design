import { prisma } from "../db";

// Get all of the products owned by the current user.
// The "include" key is part of Prisma's Nested Reads handling and allows reading related data from multiple tables. See here for more info:
// https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries
const getProducts = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			username: req.body.username,
		},
		include: {
			products: true,
		},
	});

	res.json({ data: user.products });
};

// Get a single product
const getProduct = async (req, res) => {
	const product = await prisma.product.findFirst({
		where: {
			id: req.params.id,
			belongsToId: req.user.id,
		},
	});

	res.json({ data: product });
};

export { getProducts, getProduct };
