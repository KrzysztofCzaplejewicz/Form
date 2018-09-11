declare module '*.scss' {
    // const content: any;
    // export default content;

    interface IClassNames {
        [className: string]: string
    }

    const classNames: IClassNames;
    export = classNames;
}

declare module '*.css' {
    const content: any;
    export default content;
}

declare module '*.json' {
    const content: any;
    export default content;
}

declare module '*.js' {
    const content: any;
    export default content;
}
declare module '*.ts' {
    const content: any;
    export default content;
}
// declare module 'react-form-validator-core';
// declare module 'react-form-validator-core' {
//     import * as React from 'react';
//
//     export class ValidatorComponent<P, S> extends React.Component<P, S> {
//         input: any;
//         onchange: () => void;
//         getErrorMessage: () => void;
//     }
// }