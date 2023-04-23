import {addProductsToBasket, removeItemFromBasket} from "../pages/amazon";

describe('Amazon - Add to basket functionality', () => {
    it('Add multiple items types to the shopping basket, then modify the basket', function() {
        const itemsToAdd = 3
        const productCategories = ['vacuum', 'cooker', 'blenders']

        addProductsToBasket(productCategories, itemsToAdd)
        removeItemFromBasket(itemsToAdd * productCategories.length)
    })
})