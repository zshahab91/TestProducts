// / <reference types="next" />
// / <reference types="next/types/global" />

/* eslint-disable */
/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.scss" {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "*.svg" {
    const content: string;
    export default content;
}

declare module '*.gif' {
    const src: string;

    export default src;
}

declare module '*.jpg' {
    const src: string;

    export default src;
}

declare module '*.jpeg' {
    const src: string;

    export default src;
}

declare module '*.png' {
    const src: string;

    export default src;
}

declare module '*.webp' {
    const src: string;

    export default src;
}
