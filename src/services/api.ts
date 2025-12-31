export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
    };
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchUsers(): Promise<User[]> {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export async function fetchPosts(limit?: number): Promise<Post[]> {
    try {
        const url = limit ? `${BASE_URL}/posts?_limit=${limit}` : `${BASE_URL}/posts`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}

export async function fetchUserById(id: number): Promise<User> {
    try {
        const response = await fetch(`${BASE_URL}/users/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch user: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching user ${id}:`, error);
        throw error;
    }
}

export function transformUserToTableData(user: User, index: number) {
    const pakistaniNames = [
        "Ahsan Khan", "Zain Ali", "Tayyab Ahmed", "Abdullah", "Hamza Sheikh",
        "Ayesha Malik", "Iqra Ahsan", "Fatima Zahra", "Bilal Hussain", "Sara Ahmed"
    ];

    return {
        id: `USR-${user.id}`,
        user: pakistaniNames[index % pakistaniNames.length],
        status: (["Active", "Inactive", "Pending"][index % 3]) as "Active" | "Inactive" | "Pending",
        type: ["Subscription", "One-time", "Refund"][index % 3],
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };
}

export function transformPostToMessage(post: Post, index: number) {
    const subjects = [
        "How are you doing?",
        "Quick question regarding the project",
        "Meeting reminder for tomorrow",
        "Check this out!",
        "Hello from the other side",
        "Weekly update report",
        "Subscription renewal notice",
        "Feedback on your recent call",
        "Welcome to Translation Empire",
        "Your account security update"
    ];

    const bodies = [
        "Hey! Just checking in to see how everything is going with the new dashboard implementation. Let me know if you need anything!",
        "Could you please review the latest designs for the call logs panel? We want to make sure the filtering logic is correct.",
        "Don't forget our sync meeting tomorrow at 10 AM. We'll be discussing the real-time chat integration.",
        "I found this interesting article about AI-driven translations. Thought you might find it useful for our next phase.",
        "Hi there! It was great talking to you earlier. Just wanted to follow up on the points we discussed.",
        "Attached is the weekly performance report for the translation agents. The volume has increased by 15% this week.",
        "Your premium subscription is set to renew in 3 days. Please ensure your payment method is up to date.",
        "We'd love to hear about your experience with our platform. Please take a moment to fill out this short survey.",
        "Welcome to the team! We're excited to have you on board. Check out the onboarding guide to get started.",
        "We noticed a login from a new device. If this wasn't you, please reset your password immediately."
    ];

    const senders = [
        "Ahsan Khan", "Zain Ali", "Tayyab Ahmed", "Abdullah", "Hamza Sheikh",
        "Ayesha Malik", "Usman Raza", "Fatima Zahra", "Bilal Hussain", "Sara Ahmed"
    ];

    return {
        id: `MSG-${post.id}`,
        sender: senders[index % senders.length],
        subject: subjects[index % subjects.length],
        preview: bodies[index % bodies.length],
        timestamp: `${Math.floor(Math.random() * 24) + 1}h ago`,
        isRead: index % 3 !== 0,
        isImportant: index % 4 === 0,
        avatar: (senders[index % senders.length])[0],
    };
}
