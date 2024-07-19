function getRandomIndex(length: number): number {
    return Math.floor(Math.random() * length);
}

export function getRandomObjectKey(obj: Object) {
    const keys = Object.keys(obj);
    const randomIndex = getRandomIndex(keys.length);
    return keys[randomIndex];
}

export function getRandomArrayElement(a: any[]) {
    const randomIndex = getRandomIndex(a.length);
    return a[randomIndex];
}