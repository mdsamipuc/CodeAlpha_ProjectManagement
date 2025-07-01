import { forwardRef, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextAreaInput(
    { className = '',isFocused = false,children, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));


    return (
        <textarea
            {...props}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                className
            }
            ref={localRef}
        >
          {children}
        </textarea>
    );
});
