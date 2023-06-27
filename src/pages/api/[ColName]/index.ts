import { NextApiRequest, NextApiResponse } from 'next';

import dbcontext, { initializeDatabase } from '@/service';

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
	await initializeDatabase();
	const { ColName, find } = req.query;
	let documents;
	if (typeof find === 'string') {
		documents = await dbcontext
			.collection(ColName as string)
			.find(JSON.parse(find))
			.toArray();
	} else {
    documents = await dbcontext
		.collection(ColName as string)
    .find()
		.toArray();
	}
	documents.length == 0 ? res.status(404).json([]) : res.status(200).json(documents);
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
	await initializeDatabase();
	const { ColName } = req.query;
	const document = req.body;
	const result = await dbcontext.collection(ColName as string).insertOne(document);
	result.acknowledged
		? res.status(200).json(document)
		: res.status(500).send('No se pudo insertar el documento');
};

const handlers: any = {};
handlers['GET'] = (req: NextApiRequest, res: NextApiResponse) => getAll(req, res);
handlers['POST'] = (req: NextApiRequest, res: NextApiResponse) => create(req, res);

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { method } = req;
		const handler = handlers[method as keyof typeof handlers](req, res);
		return handler! || res.status(405).end(`Method ${method} Not Allowed`);
	} catch (err: any) {
		return res.status(500).send(err.stack);
	}
}
