import { prisma } from "../db";

// Get all of the products owned by the current user.
// The "include" key is part of Prisma's Nested Reads handling and allows reading related data from multiple tables. See here for more info:
// https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries
const getProducts = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		include: {
			products: true,
		},
	});

	res.json({ data: user.products });
};

const getProduct = async (req, res) => {
	const product = await prisma.product.findFirst({
		where: {
			id: req.params.id,
			belongsToId: req.user.id,
		},
	});

	res.json({ data: product });
};

const createProduct = async (req, res, next) => {
	try {
		const product = await prisma.product.create({
			data: {
				name: req.body.name,
				belongsToId: req.user.id,
			},
		});
		res.json({ data: product });
	} catch (error) {
		next(error);
	}
};

const updateProduct = async (req, res) => {
	const product = await prisma.product.update({
		where: {
			id_belongsToId: {
				id: req.params.id,
				belongsToId: req.user.id,
			},
		},
		data: {
			name: req.body.name,
		},
	});

	res.json({ data: product });
};

const deleteProduct = async (req, res) => {
	const product = await prisma.product.delete({
		where: {
			id_belongsToId: {
				id: req.params.id,
				belongsToId: req.user.id,
			},
		},
	});

	res.json({ data: product });
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
