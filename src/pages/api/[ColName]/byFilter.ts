import { NextApiRequest, NextApiResponse } from "next"
import dbcontext, { initializeDatabase } from './../../../lib/service';


const getAllByFilter = async (req, res) => {
  await initializeDatabase();
  const { ColName, Filter, fields, page, limit } = req.query;

  try {
    const query = JSON.parse(Filter as string);
    const collection = dbcontext.collection(ColName as string);

    const countPromise = collection.countDocuments(query);
    const limitInt = parseInt(limit);
    
    const [totalDocuments, totalPages] = await Promise.all([
      countPromise,
      countPromise.then(count => Math.ceil(count / limitInt))
    ]);

    const startIndex = (parseInt(page) - 1) * parseInt(limit);

    const documents = await collection.find(query).skip(startIndex).limit(parseInt(limit)).toArray();

    const paginatedDocuments = documents.map((doc) => {
      const filteredFields = {};

      if (fields) {
        const requestedFields = fields.split(",");
        requestedFields.forEach((field) => {
          let value = doc;
          field.split(".").forEach((subField) => {
            value = value && value[subField];
          });
          filteredFields[field] = value;
        });
      }

      return filteredFields;
    });

    res.status(200).json({
      totalDocuments,
      currentPage: page,
      totalPages,
      data: paginatedDocuments
    });

  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    res.status(500).send("Error en el servidor");
  }
};


const handlers: any = {};
handlers["GET"] = (req: NextApiRequest, res: NextApiResponse) => getAllByFilter(req, res);

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    const handler = handlers[method as keyof typeof handlers](req, res);
    return handler! || res.status(405).end(`Method ${method} Not Allowed`);
  } catch (err: any) {
    return res.status(500).send(err.stack);
  }
}
