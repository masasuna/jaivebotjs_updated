import { ShortTextInput } from './ShortTextInput';
import { isMobile } from '@/utils/isMobileSignal';
import { createSignal, createEffect, onMount } from 'solid-js';
import { SendButton } from '@/components/SendButton';



type Props = {
    placeholder?: string;
    backgroundColor?: string;
    textColor?: string;
    sendButtonColor?: string;
    defaultValue?: string;
    fontSize?: number;
     disabled?: boolean;
    onSubmit: (value: string) => void;
    onCharacterCountChange?: (count: number) => void; // Existing prop for character count change
    allowSubmission: boolean; // New prop to control submission
};

const defaultBackgroundColor = '#ffffff';
const defaultTextColor = '#303235';

export const TextInput = (props: Props) => {
    const [inputValue, setInputValue] = createSignal(props.defaultValue ?? '');
    let inputRef: HTMLInputElement | HTMLTextAreaElement | undefined;

    const handleInput = (inputValue: string) => {
        setInputValue(inputValue);
        const newCount = inputValue.length;
        props.onCharacterCountChange?.(newCount); // Invoke the callback with the new character count
    };

    const checkIfInputIsValid = () => inputValue() !== '' && inputRef?.reportValidity();

    const submit = () => {
        if (props.allowSubmission && checkIfInputIsValid()) {
            props.onSubmit(inputValue());
            setInputValue('');
            props.onCharacterCountChange?.(0); // Reset character count on submit
        }
    };

    const submitWhenEnter = (e: KeyboardEvent) => {
        // Check if IME composition is in progress
        const isIMEComposition = e.isComposing || e.keyCode === 229;
        if (e.key === 'Enter' && !isIMEComposition) {
            // Check if submission is allowed
            if (props.allowSubmission) {
                submit();
            }
        }
        
        
    };

    createEffect(() => {
        if (!props.disabled && !isMobile() && inputRef) inputRef.focus();
      });

    onMount(() => {
        if (!isMobile() && inputRef) inputRef.focus();
    });

    return (
        <div
            class={'flex items-end justify-between chatbot-input'}
            data-testid="input"
            style={{
                'border-top': '1px solid #eeeeee',
                position: 'absolute',
                left: '20px',
                right: '20px',
                bottom: '40px',
                margin: 'auto',
                'z-index': 1000,
                'background-color': props.backgroundColor ?? defaultBackgroundColor,
                color: props.textColor ?? defaultTextColor,
            }}
            onKeyDown={submitWhenEnter}
            classList={{
                'text-input-box--over-limit': !props.allowSubmission // Apply the class when submission is not allowed
            }}
        >
            
                <ShortTextInput
                    ref={inputRef as HTMLInputElement}
                    onInput={handleInput}
                    value={inputValue()}
                    fontSize={props.fontSize}
                    disabled={props.disabled}
                    placeholder={props.placeholder ?? 'Type your question'}
                    
                />
                <SendButton
                    sendButtonColor={props.sendButtonColor}
                    type="button"
                    isDisabled={!props.allowSubmission || inputValue() === ''}
                    class="my-2 ml-2"
                    on:click={submit}
                >
                    <span style={{ 'font-family': 'Poppins, sans-serif' }}>Send</span>
                </SendButton>
            </div>
    );
};

export default TextInput;
