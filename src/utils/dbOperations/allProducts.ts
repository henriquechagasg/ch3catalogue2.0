import { default as mongodb } from 'mongodb';

let MongoClient = mongodb.MongoClient;

export const ActiveProducts = async () => {
    const uri = 'mongodb+srv://ch3moda:ch3adm!@cluster0.tnyzb.mongodb.net/productsDb?retryWrites=true&w=majority';

    try {
        const client = new MongoClient(uri);
        // Connect to the MongoDB cluster
        await client.connect();
        const db = client.db("productsDb")

        // Get all Products
        const allProductsCursor = db.collection('Refers').find({})
        const allProducts = await allProductsCursor.toArray()

        // Get active Products
        const activeProductsFilterCursor = db.collection('showproducts').find({})
        const activeProductsFilter = await activeProductsFilterCursor.toArray();

        // Products prices
        const ProductsPricesCursor = db.collection('Prices').find({});
        const ProductsPrices = await ProductsPricesCursor.toArray()

        client.close()
        return [allProducts, activeProductsFilter, ProductsPrices]    
    }catch{
        console.error
    }
}
