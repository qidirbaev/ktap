import AlgoliaSearch from 'algoliasearch';
import { config } from 'dotenv';
config();

const APP_KEY = process.env.APP_KEY;
const SEARCH_ONLY_KEY = process.env.SEARCH_ONLY_KEY;

export default function (search = {}) {
    return new Promise((resolve, reject) => {
        const client = new AlgoliaSearch(APP_KEY, SEARCH_ONLY_KEY);
        const index = client.initIndex('accounts');
    
        if (search.searcher && search.searcher !== '') {
            index.search(search.query, {
                headers: { 'X-Algolia-UserToken': search.searcher },
                attributesToRetrieve: search.attributes
            })
                .then(({ hits }) => resolve({
                    ok: true,
                    hits
                }))
                // .catch(error => reject({error}))
        } else {
            const public_key = client.generateSecuredApiKey(SEARCH_ONLY_KEY, {
                filters: '_tags:user_42'
            });

            index.search(
                search.query,
                {
                    headers: { 'X-Algolia-UserToken': public_key},
                    attributesToRetrieve: search.attributes
                })
                .then(({ hits }) => {
                    resolve({
                        ok: true,
                        hits,
                        public_key
                    });
                })
                // .catch(error => reject({error}))
        }
    });
}