module d1{
    export class init {
        constructor() {
            
        }

        getRandomIntInclusive(min: number, max: number): number {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
}