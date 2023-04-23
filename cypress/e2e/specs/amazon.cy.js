import {addProductsToBasket, removeItemFromBasket} from "../pages/amazon";

describe('Amazon - Add to basket functionality', () => {
    it('Add multiple items types to the shopping basket, then modify the basket', function() {
        addProductsToBasket(['vacuum', 'cooker', 'blenders'], 3)
        removeItemFromBasket(9)
    })
})