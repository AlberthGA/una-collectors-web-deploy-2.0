import { NextApiRequest, NextApiResponse } from "next";
import dbcontext, { initializeDatabase } from "./../../../lib/service";

const getByQuery = async (req, res) => {
  await initializeDatabase();
  const { ColName, version, nombre } = req.query;

  try {
    const collection = dbcontext.collection(ColName as string);

    const documents = await collection
      .find({ version: parseInt(version), nombre: nombre })
      .toArray();

    res.status(200).json({
      data: documents,
    });
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    res.status(500).send("Error en el servidor");
  }
};

const handlers: any = {};
handlers["GET"] = (req: NextApiRequest, res: NextApiResponse) =>
  getByQuery(req, res);

export default async function controller(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    const handler = handlers[method as keyof typeof handlers](req, res);
    return handler! || res.status(405).end(`Method ${method} Not Allowed`);
  } catch (err: any) {
    return res.status(500).send(err.stack);
  }
}
