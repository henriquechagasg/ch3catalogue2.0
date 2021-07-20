import { ActiveProducts } from '../../utils/dbOperations/allProducts';

async function products(req, res) {

    const [products, productsFilter, productsPrices] = await ActiveProducts();
    const finalProducts = []
    products.forEach(product => {
        product['image'] = []
        productsFilter.forEach(el => {
            let index = el.Product.indexOf('&');
            let currentProduct = el.Product.slice(0, index);
            if (product.REFER == currentProduct){
                product['isAdded'] = true
                product['image'].push(el.url);
            }
        })

        productsPrices.forEach(el => {
            if (el.REFER == product.REFER) {
                product['pPrice'] = el.P
                product['mPrice'] = el.M
                product['gPrice'] = el.G
                product["ggPrice"] = el.GG
            }
        })

        if (product.isAdded){
            finalProducts.push(product)
        }
    })

    res.json({
        finalProducts,
    })
}

export default products;