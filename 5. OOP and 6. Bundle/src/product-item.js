class ProductItem {
    constructor (item) {
        ProductItem.TOTAL_ITEMS += 1

        this.id = item.id
        this.params = item.params
        this.inTrash = false
    }

    sendToTrash () {
        this.inTrash = true
    }

    getFromTrash () {
        this.inTrash = false
    }
}

ProductItem.TOTAL_ITEMS = 0

export class ExactProduct extends ProductItem {
    constructor (item) {
        super(item)
        this.title = item.title
        this.cost = item.costs / item.params.count
        this.weight = (item.params.weight / item.params.count).toFixed(1)
    }

    static lol () {
        console.log(`lol`)
    }
}
