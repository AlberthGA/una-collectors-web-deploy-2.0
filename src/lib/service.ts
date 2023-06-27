import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

//Se modifica porque como estaba antes, se ejecutaba la consulta antes
//de que se abriera la conexion a db, por lo que daba un error.

const connectDatabase = () => {
  return new Promise<void>((resolve, reject) => {
    mongoose
      .connect(MONGODB_URI as string)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
        reject(error);
      });
  });
};

export const initializeDatabase = async () => {
  await connectDatabase();
};

export default mongoose.connection;
