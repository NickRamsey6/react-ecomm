
const productsArray = [
    {
        id: '1',
        name: 'Coffee',
        price: 4.99
    },
    {
        id: '2',
        name: 'Sunglasses',
        price: 9.99
    },
    {
        id: '3',
        name: 'Camera',
        price: 39.99
    },
]

// Function to search productsArray based on id given, return undefined if id not found
function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if(productData === undefined) {
        console.log('Product data does not exist for ID: '+ id);
    }

    return productData;
}

export { productsArray, getProductData };