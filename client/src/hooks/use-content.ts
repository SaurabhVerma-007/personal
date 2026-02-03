import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Initial static content for the app
const INITIAL_CONTENT = [
  {
    id: 1,
    type: "quiz",
    data: {
      question: "Who is the boss in this relationship? 👑",
      options: ["Me (The Creator)", "You (The Cutie)", "We are equals 🤝"],
      correctIndex: 1
    }
  },
  {
    id: 2,
    type: "letter",
    data: {
      text: "My Dearest,\n\nFrom the moment I met you, my life has been filled with colors I never knew existed. You are my best friend, my partner in crime, and my greatest adventure.\n\nEvery day with you is a gift I cherish. I love your smile, your laugh, and even your terrible jokes.\n\nHere's to us, today and forever.\n\nLove,\nMe ❤️"
    }
  },
  {
    id: 3,
    type: "photo",
    data: {
      url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=500&auto=format&fit=crop&q=60",
      caption: "Us holding hands (conceptually) 📸"
    }
  }
];

const CONTENT_STORAGE_KEY = "valentine_app_content";

// Helper to get content from localStorage or fallback to initial content
const getContent = () => {
  const stored = localStorage.getItem(CONTENT_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored content", e);
    }
  }
  return INITIAL_CONTENT;
};

// Helper to save content to localStorage
const saveContent = (content: any[]) => {
  localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
};

export function useContent() {
  return useQuery({
    queryKey: ["content"],
    queryFn: async () => {
      // Return content from localStorage
      return getContent();
    },
  });
}

export function useCreateContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const currentContent = getContent();
      const newItem = {
        ...data,
        id: Math.max(0, ...currentContent.map((c: any) => c.id)) + 1
      };
      const updatedContent = [...currentContent, newItem];
      saveContent(updatedContent);
      return newItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });
}
