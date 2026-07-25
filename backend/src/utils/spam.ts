export function isSpam(text: string) {
    const value = text.toLowerCase().trim();

    // Too short
    if (value.length < 3) return true;

    // Repeated characters (aaaaaaaaaa)
    if (/(.)\1{8,}/.test(value)) return true;

    // Any URL
    if (
        /(https?:\/\/|www\.|[a-z0-9-]+\.[a-z]{2,}(\/\S*)?)/i.test(value)
    ) {
        return true;
    }

    const banned = [
        "casino",
        "viagra",
        "bitcoin",
        "loan",
        "crypto",
        "forex",
        "earn money",
    ];

    return banned.some((word) => value.includes(word));
}