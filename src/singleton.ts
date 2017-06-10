class Singleton {
    private static _default: Singleton;
    static get default(): Singleton {
        if (Singleton._default) {
            return Singleton._default;
        } else {
            let singleton = new Singleton();
            Singleton._default = singleton;
            return singleton;
        }
    }
}

const a = Singleton.default;
const b = Singleton.default;
console.log(a instanceof Singleton, b instanceof Singleton);
console.log(a == b);