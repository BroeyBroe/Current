export class Recipe {
    constructor (
        public id: string,
        public name: string,
        public imgURL: string,
        public category: string,
        public area: string,
        public source: string,
        public tags: string[],
        public videoURL: string,
        public ingredients: Ingredient[],
        public method: string[]
    ) { }
}

export class Ingredient {
    constructor (
        public name: string,
        public measure: string
    ) { }
}