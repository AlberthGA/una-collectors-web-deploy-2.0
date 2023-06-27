import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import dbcontext from "@/service";

const removeById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { ColName, id } = req.query;
    const result = await dbcontext.collection(ColName as string).deleteOne({ _id: new mongoose.Types.ObjectId(id as string) });
    (result.acknowledged && result.deletedCount === 1) ? res.status(200).send("Documento eliminado exitosamente") : res.status(500).send("No se pudo eliminar el documento");
}

const getById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { ColName, id } = req.query;
    const document = await dbcontext.collection(ColName as string).findOne({ _id: new ObjectId(id as string) });
    (!document) ? res.status(404).send("Documento no encontrado") : res.status(200).json(document);
}
//
const updateById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { ColName, id } = req.query;
    const document = req.body;
    const result = await dbcontext.collection(ColName as string).findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id as string) }, { $set: document }, { new: true });
    (result.value) ? res.status(200).json(result.value) : res.status(500).send("No se pudo actualizar");
}

const handlers: any = {};
handlers["GET"] = (req: NextApiRequest, res: NextApiResponse) => getById(req, res);
handlers["DELETE"] = (req: NextApiRequest, res: NextApiResponse) => removeById(req, res);
handlers["PUT"] = (req: NextApiRequest, res: NextApiResponse) => updateById(req, res);

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req;
        const handler = handlers[method as keyof typeof handlers](req, res);
        return handler! || res.status(405).end(`Method ${method} Not Allowed`);
    } catch (err: any) {
        return res.status(500).send(err.stack);
    }
}
