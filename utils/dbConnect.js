import { connect } from "mongoose";

let connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
