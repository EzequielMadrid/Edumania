export const sampleBooks = [
    {
        _id: '1',
        title: 'The 7 Habits of Highly Effective People',
        author: 'Stephen R. Covey',
        slug: 'the-7-habits-of-highly-effective-people',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780743269513-L.jpg',
        coverColor: '#e8f0e9',
        authorImageURL: 'https://ui-avatars.com/api/?name=Stephen+Covey&size=440&background=c7d9c8&color=2d4a2e&bold=true&format=png',
    },
    {
        _id: '2',
        title: 'The Power of Now',
        author: 'Eckhart Tolle',
        slug: 'the-power-of-now',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9781577314806-L.jpg',
        coverColor: '#e7f0f4',
        authorImageURL: 'https://ui-avatars.com/api/?name=Eckhart+Tolle&size=440&background=d6e4ea&color=1f3a4a&bold=true&format=png',
    },
    {
        _id: '3',
        title: 'The Subtle Art of Not Giving a F*ck',
        author: 'Mark Manson',
        slug: 'the-subtle-art-of-not-giving-a-fck',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg',
        coverColor: '#fdecea',
        authorImageURL: 'https://ui-avatars.com/api/?name=Mark+Manson&size=440&background=f5c5c0&color=6b1a14&bold=true&format=png',
    },
    {
        _id: '4',
        title: 'You Are a Badass',
        author: 'Jen Sincero',
        slug: 'you-are-a-badass',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780762447695-L.jpg',
        coverColor: '#f7e66a',
        authorImageURL: 'https://ui-avatars.com/api/?name=Jen+Sincero&size=440&background=f4e04d&color=3a2f2a&bold=true&format=png',
    },
    {
        _id: '5',
        title: "Can't Hurt Me",
        author: 'David Goggins',
        slug: 'cant-hurt-me',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9781544512280-L.jpg',
        coverColor: '#ececec',
        authorImageURL: 'https://ui-avatars.com/api/?name=David+Goggins&size=440&background=333333&color=ffffff&bold=true&format=png',
    },
    {
        _id: '6',
        title: 'Think and Grow Rich',
        author: 'Napoleon Hill',
        slug: 'think-and-grow-rich',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg',
        coverColor: '#fff8e8',
        authorImageURL: 'https://ui-avatars.com/api/?name=Napoleon+Hill&size=440&background=f0dfa0&color=5a4000&bold=true&format=png',
    },
    {
        _id: '7',
        title: 'Ikigai: The Japanese Secret to a Long and Happy Life',
        author: 'Héctor García & Francesc Miralles',
        slug: 'ikigai',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg',
        coverColor: '#fef4ec',
        authorImageURL: 'https://ui-avatars.com/api/?name=Hector+Garcia&size=440&background=f5dcc0&color=6b3a10&bold=true&format=png',
    },
    {
        _id: '8',
        title: 'The Art of War',
        author: 'Sun Tzu',
        slug: 'the-art-of-war',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9781599869773-L.jpg',
        coverColor: '#e8e1d4',
        authorImageURL: 'https://ui-avatars.com/api/?name=Sun+Tzu&size=440&background=d6cfc2&color=3a2f2a&bold=true&format=png',
    },
];

// File validation helpers
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ACCEPTED_PDF_TYPES = ['application/pdf'];
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Pre-configured VAPI assistant ID (hardcoded for this app)
export const ASSISTANT_ID = process.env.NEXT_PUBLIC_ASSISTANT_ID!;

// 11Labs Voice IDs - Optimized for conversational AI
// Voices selected for natural, engaging book conversations
export const voiceOptions = {
    // Male voices
    dave: { id: 'CYw3kZ02Hs0563khs1Fj', name: 'Dave', description: 'Young male, British-Essex, casual & conversational' },
    daniel: { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', description: 'Middle-aged male, British, authoritative but warm' },
    chris: { id: 'iP95p4xoKVk53GoZ742B', name: 'Chris', description: 'Male, casual & easy-going' },
    // Female voices
    rachel: { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', description: 'Young female, American, calm & clear' },
    sarah: { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', description: 'Young female, American, soft & approachable' },
};

// Voice categories for the selector UI
export const voiceCategories = {
    male: ['dave', 'daniel', 'chris'],
    female: ['rachel', 'sarah'],
};

// Default voice
export const DEFAULT_VOICE = 'rachel';

// ElevenLabs voice settings optimized for conversational AI
export const VOICE_SETTINGS = {
    stability: 0.45, // Lower for more emotional, dynamic delivery (0.30-0.50 is natural)
    similarityBoost: 0.75, // Enhances clarity without distortion
    style: 0, // Keep at 0 for conversational AI (higher = more latency, less stable)
    useSpeakerBoost: true, // Improves voice quality
    speed: 1.0, // Natural conversation speed
};

// VAPI configuration for natural conversation
// NOTE: These settings should be configured in the VAPI Dashboard for the assistant
// They are kept here for reference and documentation purposes
export const VAPI_DASHBOARD_CONFIG = {
    // Turn-taking settings
    startSpeakingPlan: {
        smartEndpointingEnabled: true,
        waitSeconds: 0.4,
    },
    stopSpeakingPlan: {
        numWords: 2,
        voiceSeconds: 0.2,
        backoffSeconds: 1.0,
    },
    // Timing settings
    silenceTimeoutSeconds: 30,
    responseDelaySeconds: 0.4,
    llmRequestDelaySeconds: 0.1,
    // Conversation features
    backgroundDenoisingEnabled: true,
    backchannelingEnabled: true,
    fillerInjectionEnabled: false,
};

// Clerk appearance overrides - Warm Literary Style
// Note: Tailwind requires static class names at build time, so we hardcode color values here
export const CLERK_AUTH_APPEARANCE_OVERRIDE = {
    rootBox: 'mx-auto',
    card: 'shadow-none border-none rounded-xl bg-transparent',
    headerTitle: '!text-2xl font-bold text-[#212a3b]',
    headerSubtitle: '!mt-3 !text-sm text-[#3d485e]',
    socialButtonsBlockButton:
        '!border border-[rgba(33,42,59,0.12)] hover:bg-[#212a3b]/10 transition-all h-12 text-lg !rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08)]',
    socialButtonsBlockButtonText: 'font-medium !text-[#212a3b] !text-lg',
    formButtonPrimary:
        'bg-[#212a3b] hover:bg-[#3d485e] text-white font-medium !border-0 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08)] normal-case !h-12 !text-lg !rounded-xl',
    formFieldInput:
        '!border !border-[rgba(33,42,59,0.12)] !rounded-xl focus:ring-[#212a3b] focus:border-[#212a3b] !h-12 !min-h-12 !text-lg !bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.06)]',
    formFieldLabel: 'text-[#212a3b] font-medium text-lg',
    footerActionLink: 'text-[#212a3b] hover:text-[#3d485e] text-base font-medium',
};