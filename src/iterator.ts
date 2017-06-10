interface Array<T> {
    iterator: IteratorPattern.Iterator<T>;
}

namespace IteratorPattern {
    export interface Iterator<T> {
        first(): void;
        next(): void;
        end: boolean;
        item: T;
        index: number;
    }

    class ArrayIterator<T> implements Iterator<T> {
        index = 0;

        constructor(public array: T[]) { }

        first(): void {
            this.index = 0;
        }

        next(): void {
            this.index++;
        }

        get end(): boolean {
            return this.index >= this.array.length;
        }

        get item(): T {
            return this.array[this.index];
        }
    }

    Object.defineProperty(Array.prototype, 'iterator', {
        get() {
            return new ArrayIterator(this);
        }
    });

    const numbers: Array<number> = new Array<number>(1, 2, 3, 4, 5, 6);
    const iter = numbers.iterator;
    iter.first();
    while(!iter.end) {
        console.log(iter.item);
        iter.next();
    }
}

namespace IteratorPatternB {
    class SomeData<T> {
        array: T[];

        [Symbol.iterator]() {
            return new SomeIterator<T>(this.array);
        }
    }

    class SomeIterator<T> implements Iterator<T> {
        index: number;

        constructor(public array: T[]) {
            this.index = array.length - 1;
        }

        next(): IteratorResult<T> {
            if (this.index < 0) {
                return {
                    value: undefined,
                    done: true
                };
            } else {
                return {
                    value: this.array[this.index--],
                    done: false
                }
            }
        }
    }

    console.log('----------------');
    const itr = new SomeData<number>();
    itr.array = new Array<number>(1, 2, 3, 4, 5, 6);
    for (let number of itr) {
        console.log(number);
    }
}