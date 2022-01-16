import algolia from "../config/Algolia.js";

const ALGO_OBJECT = algolia();
const index = ALGO_OBJECT.index;

const requestOptions = {
    headers: { 'X-Algolia-UserToken': ALGO_OBJECT.publicKey },
    attributesToRetrieve: ['name', 'company']
}

index.search('chromatics', requestOptions)
    .then(({ hits }) => {
        console.log(hits);
    });
