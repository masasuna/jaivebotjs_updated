// Import the necessary libraries and components
import { Show } from 'solid-js';
import { Avatar } from '../avatars/Avatar'; // Adjust the path as needed
import { TypingBubble } from '@/components';

// Define the Props type for LoadingBubble
type Props = {
  showAvatar?: boolean;
  avatarSrc?: string;
  
};

// Modify the LoadingBubble component to accept props
export const LoadingBubble = (props: Props) => (
  <div class="flex justify-start mb-2 items-start animate-fade-in host-container">
   <Show when={props.showAvatar}>
      <Avatar initialAvatarSrc={props.avatarSrc} />
    </Show>
    <span class="px-4 py-4 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble rounded-full" data-testid="host-bubble">
      <TypingBubble />
    </span>
  </div>
);
