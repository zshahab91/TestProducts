import escapeStringRegexp from "escape-string-regexp";
import transliterate from "@sindresorhus/transliterate";

const replacements: ReadonlyArray<[string, string]> = [
    ['&', ' and '],
    ['🦄', ' unicorn '],
    ['♥', ' love ']
];

interface ISlugifyOptions {
    separator?: string

    lowercase?: boolean

    decamelize?: boolean

    customReplacements?: ReadonlyArray<[string, string]>

    preserveLeadingUnderscore?: boolean
}


const decamelize = (string: string) => {
    return string
        // Separate capitalized words.
        .replace(/([A-Z]{2,})(\d+)/g, '$1 $2')
        .replace(/([a-z\d]+)([A-Z]{2,})/g, '$1 $2')

        .replace(/([a-z\d])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2');
};

const removeMootSeparators = (string: string, separator: string) => {
    const escapedSeparator = escapeStringRegexp(separator);

    return string
        .replace(new RegExp(`${escapedSeparator}{2,}`, 'g'), separator)
        .replace(new RegExp(`^${escapedSeparator}|${escapedSeparator}$`, 'g'), '');
};

export const slugify = (string: string, options: ISlugifyOptions = {}) => {
    options = {
        separator: '-',
        lowercase: true,
        decamelize: true,
        customReplacements: [],
        preserveLeadingUnderscore: false,
        ...options
    };

    const shouldPrependUnderscore = options.preserveLeadingUnderscore && string.startsWith('_');

    string = transliterate(string, {
        customReplacements: [
            ...replacements,
            ...options.customReplacements
        ]
    });

    if (options.decamelize) {
        string = decamelize(string);
    }

    let patternSlug = /[^a-zA-Z\d]+/g;

    if (options.lowercase) {
        string = string.toLowerCase();
        patternSlug = /[^a-z\d]+/g;
    }

    string = string.replace(patternSlug, options.separator as string);
    string = string.replace(/\\/g, '');
    if (options.separator) {
        string = removeMootSeparators(string, options.separator);
    }

    if (shouldPrependUnderscore) {
        string = `_${string}`;
    }

    return string;
};

export const counter = () => {
    const occurrences = new Map();

    const countable = (string: string, options: ISlugifyOptions) => {
        string = slugify(string, options);

        if (!string) {
            return '';
        }

        const stringLower = string.toLowerCase();
        const numberless = occurrences.get(stringLower.replace(/(?:-\d+?)+?$/, '')) || 0;
        const counter = occurrences.get(stringLower);
        occurrences.set(stringLower, typeof counter === 'number' ? counter + 1 : 1);
        const newCounter = occurrences.get(stringLower) || 2;
        if (newCounter >= 2 || numberless > 2) {
            string = `${string}-${newCounter}`;
        }

        return string;
    };

    countable.reset = () => {
        occurrences.clear();
    };

    return countable;
};