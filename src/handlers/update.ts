import { prisma } from "../db";

const getUpdates = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id,
		},
		include: {
			updates: true,
		},
	});

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);

	res.json({ data: updates });
};

const getUpdate = async (req, res) => {
	const update = await prisma.update.findUnique({
		where: {
			id: req.params.id,
		},
	});
	res.json({ data: update });
};

const createUpdate = async (req, res) => {
	const product = await prisma.product.findUnique({
		where: {
			id: req.body.productId,
		},
	});

	if (!product) {
		res.status(401);
		return res.json({ message: "Not authorized" });
	}

	const update = await prisma.update.create({
		data: {
			title: req.body.title,
			body: req.body.body,
			product: { connect: { id: product.id } },
		},
	});

	res.json({ data: update });
};

const updateUpdate = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id,
		},
		include: {
			updates: true,
		},
	});

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);

	const match = updates.find((update) => update.id === req.params.id);

	if (!match) {
		res.json({ message: "not found" });
	}

	const updatedUpdate = await prisma.update.update({
		where: {
			id: req.params.id,
		},
		data: req.body,
	});

	res.json({ data: updatedUpdate });
};

const deleteUpdate = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id,
		},
		include: {
			updates: true,
		},
	});

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);

	const match = updates.find((update) => update.id === req.params.id);

	if (!match) {
		res.json({ message: "not found" });
	}

	const deletedUpdate = await prisma.update.delete({
		where: {
			id: req.params.id,
		},
	});

	res.json({ data: deletedUpdate });
};

export { getUpdates, getUpdate, createUpdate, updateUpdate, deleteUpdate };
