type Props = {
    placeholder?: string;
    backgroundColor?: string;
    textColor?: string;
    sendButtonColor?: string;
    defaultValue?: string;
    fontSize?: number;
    disabled?: boolean;
    onSubmit: (value: string) => void;
    onCharacterCountChange?: (count: number) => void;
    allowSubmission: boolean;
};
export declare const TextInput: (props: Props) => import("solid-js").JSX.Element;
export default TextInput;
//# sourceMappingURL=TextInput.d.ts.map