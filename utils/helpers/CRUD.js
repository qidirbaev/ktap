import { compare, hash } from "bcrypt";

export const findOnePromise = (model, query) => {
  return new Promise((resolve, reject) => {
    model.findOne(query, (err, result) => {
      if (result) {
        resolve({ ok: true, data: result });
      } else {
        resolve({ ok: false, data: null });
      }
    });
  });
};

export const comparePromise = (password, hash) => {
  return new Promise((resolve, reject) => {
    compare(password, hash, (err, decoded) => {
      if (decoded) {
        resolve({ ok: true });
      } else {
        resolve({ ok: false });
      }
    });
  });
};

export const hashPromise = (payload, num) => {
  return new Promise((resolve, reject) => {
    hash(payload, num, (err, hashVal) => {
      if (hashVal) {
        resolve({ ok: true, hash: hashVal });
      } else {
        resolve({ ok: false, hash: null });
      }
    });
  });
}