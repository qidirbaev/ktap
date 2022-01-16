import mongoose from 'mongoose';
import logger from '../helpers/utils/logger.js';

export default class ConnDB {
  static connInst = null;
  static conn;

  constructor() {
    this.conn = mongoose.createConnection(process.env.MONGO_URI);
  }

  static getConn() {
    if (ConnDB.connInst) {
      return ConnDB.connInst.conn;
    } else {
      ConnDB.connInst = new ConnDB();
      return ConnDB.connInst.conn;
    }
  }

  initDB() {
    return new mongoose.Promise((resolve, reject) => {
      if (!this.conn) {
        this.conn = mongoose.createConnection(process.env.MONGO_URI);
      }

      if (process.env.NODE_ENV === 'development') {
        mongoose.set('debug', true);
      }

      this.conn.on('disconnected', () => {
        logger("alert", "MongoDB was disconnected, and trying to new connection instance...");
        mongoose.connect(process.env.MONGO_URI);
      });

      this.conn.on('error', (err) => {
        reject(err);
      });

      this.conn.on('open', () => {
        resolve(this.conn);
      });

      this.conn.once('open', () => {
        logger.info('Succesfully connected to MongoDB');
      });
    });
  }
}