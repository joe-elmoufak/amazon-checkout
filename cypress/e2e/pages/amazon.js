const amazon = {
    addToBasket : '#add-to-cart-button',
    backToResults : '[id="breadcrumb-back-link"]',
    basketCount : '#nav-cart-count',
    basketCountOnBasketPage : '.sc-list-item-content',
    gotoSearchResultsItemPage : '[class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"]',
    gotoShoppingBasket : '#nav-cart',
    itemRemovedMessage : '.sc-list-item-removed-msg',
    primeLogo : '[class="a-icon a-icon-prime a-icon-medium"]',
    removeFirstItemFromBasket : '.sc-action-delete > .a-declarative > .a-color-link',
    searchBox :'#twotabsearchtextbox',
    searchResults : '[data-component-type="s-search-result"]',
    submitSearchButton : '#nav-search-submit-button',
    subTotalAmountItems : '#sc-subtotal-label-buybox'
}

function addProductsToBasket (productsCategories, numberOfItemsToAdd) {
    let basketCount = 0

    productsCategories.forEach((searchString) => {
        let itemsOfType = 0

        cy.get(amazon.searchBox).clear().type(searchString)
        cy.get(amazon.submitSearchButton).click()
        cy.get(amazon.searchResults).should('be.visible')
        cy.get(amazon.searchResults).should('have.length.at.least', 8)

        cy.get(amazon.searchResults).each((searchResult, index) =>{
            if (searchResult.find(amazon.primeLogo).is(':visible')) {
                basketCount += 1
                itemsOfType += 1

                cy.get(amazon.searchResults).should('have.length.at.least', 8)
                cy.wrap(basketCount).as('basketCount')

                cy.get(amazon.searchResults).eq(index).find(amazon.gotoSearchResultsItemPage).click()
                cy.get(amazon.backToResults)
                    .invoke('attr', 'href')
                    .then(href => {
                        cy.wrap(href).as('backLink');
                    });

                cy.get('@basketCount').then((count) => {
                    cy.get(amazon.addToBasket).click()
                    cy.get(amazon.basketCount).should('contain', count)
                })

                cy.get('@backLink').then((backToResults) => {
                    cy.visit(backToResults)
                })

                if ( Number(itemsOfType) === Number(numberOfItemsToAdd) ) { return false }
            }
        })
    })
}

function removeItemFromBasket (itemsInBasket) {
    cy.get(amazon.gotoShoppingBasket).click()
    cy.get(amazon.basketCountOnBasketPage).its('length').should('eq', itemsInBasket)
    cy.get(amazon.removeFirstItemFromBasket).eq(0).click()
    cy.get(amazon.itemRemovedMessage).should('be.visible')
    cy.get(amazon.subTotalAmountItems).should('contain', itemsInBasket.toString())
}

export {
    amazon,
    addProductsToBasket,
    removeItemFromBasket
}

