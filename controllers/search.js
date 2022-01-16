import algolia from "../config/Algolia.js";

export default async (req, res) => {
    let search_result;

    if (req.cookies['X-Algolia-UserToken'] || req.cookies['X-Algolia-UserToken'] != undefined) {
        console.log('[GET] X-Algolia-UserToken -> ' + req.cookies['X-Algolia-UserToken']);
        search_result = await algolia({
            query: req.params.query,
            attributes: req.query.attributes,
            searcher: req.cookies['X-Algolia-UserToken']
        });
    } else {
        search_result = await algolia({
            query: req.params.query,
            attributes: Object.keys(req.query),
            searcher: null
        });
        res.cookie('X-Algolia-UserToken', search_result.public_key, { maxAge: 90000, httpOnly: true });
        console.log('[SET] X-Algolia-UserToken -> ' + search_result.public_key);
    }
    if (search_result.error == undefined) {
        res.status(200).json({
            ok: true,
            hits: search_result.hits
        });
    } else {
        res.status(500).json({
            ok: false,
            hits: null
        });
    }
}
