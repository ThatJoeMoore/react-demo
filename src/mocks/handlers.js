import { rest } from 'msw';
import products from './fake-products.json';

export const handlers = [
    rest.get('/api/products', searchProducts),
    rest.get('/api/products/:productId', fetchProduct),
];

const sortFields = new Map([
    ['id', (l, r) => l.id - r.id], 
    ['popularity', (l, r) => l.popularity - r.popularity], 
    ['name', (l, r) => l.name.localeCompare(r.name)],
    ['price', (l, r) => Number(l.price) - Number(r.price)],
]);

function searchProducts(req, res, ctx) {
    const {
        q: query,
        limit = 100,
        sort_by: sortBy = 'id',
        sort_order: sortOrder = 'asc'
    } = parseSearchParams(req.url.searchParams);
    let result = products;
    if (query) {
        result = result.filter(textFilter(query));
    }
    const sorter = sortFields.get(sortBy);
    if (!sorter) {
        return res(
            ctx.status(400),
            ctx.json({error: 'Not a valid sort field'})
        );
    }
    result = result.sort(sorter);
    if (sortOrder === 'desc') {
        result = result.reverse();
    }
    result = result.slice(0, limit);

    return res(
        ctx.json(result)
    );
}

function textFilter(filter) {
    const lowerFilter = filter.toLowerCase();
    return ({name, short_desc, long_desc}) => 
        name.toLowerCase().includes(lowerFilter) 
        || short_desc.toLowerCase().includes(lowerFilter)
        || long_desc.toLowerCase().includes(lowerFilter);
}

function parseSearchParams(searchParams) {
    return [...searchParams.entries()]
        .map(([key, value]) => ({[key]: value}))
        .reduce(Object.assign, {});
}

function fetchProduct(req, res, ctx) {
    console.log('req.params', req.params);
    const product = products.find(({id}) => String(id) === req.params.productId);
    return res(
        ctx.status(product ? 200 : 404),
        ctx.json(product || {})
    );
}
