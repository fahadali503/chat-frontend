
export function getValueFromLocalStorage<T>(key: string): T | null {
    if (typeof window !== "undefined") {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item) as T
        }
        return null;
    } else {
        return null;
    }
}

export function setValueToLocalStorage<T>(key: string, value: T): boolean {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } else {
        return false;
    }
}