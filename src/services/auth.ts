export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: string;
}

interface AuthData {
    email: string;
    password: string;
}

interface SignupData extends AuthData {
    name: string;
}

const USERS_KEY = 'translation_empire_users';
const CURRENT_USER_KEY = 'translation_empire_current_user';

function getAllUsers(): User[] {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
}

function saveUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function generateAvatar(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function signup(data: SignupData): { success: boolean; message: string; user?: User } {
    const users = getAllUsers();

    if (users.find(u => u.email === data.email)) {
        return { success: false, message: 'Email already registered' };
    }

    const newUser: User = {
        id: `user-${Date.now()}`,
        name: data.name,
        email: data.email,
        avatar: generateAvatar(data.name),
        createdAt: new Date().toISOString(),
    };

    const credentials = {
        email: data.email,
        password: data.password,
    };
    localStorage.setItem(`cred_${data.email}`, JSON.stringify(credentials));

    users.push(newUser);
    saveUsers(users);

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    return { success: true, message: 'Account created successfully', user: newUser };
}

export function login(data: AuthData): { success: boolean; message: string; user?: User } {
    const users = getAllUsers();

    const user = users.find(u => u.email === data.email);
    if (!user) {
        return { success: false, message: 'Invalid email or password' };
    }

    const credJson = localStorage.getItem(`cred_${data.email}`);
    if (!credJson) {
        return { success: false, message: 'Invalid email or password' };
    }

    const credentials = JSON.parse(credJson);
    if (credentials.password !== data.password) {
        return { success: false, message: 'Invalid email or password' };
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return { success: true, message: 'Logged in successfully', user };
}

export function logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): User | null {
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
}

export function isAuthenticated(): boolean {
    return getCurrentUser() !== null;
}

export function updateUserProfile(updates: Partial<User>): { success: boolean; message: string; user?: User } {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        return { success: false, message: 'Not authenticated' };
    }

    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex === -1) {
        return { success: false, message: 'User not found' };
    }

    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;
    saveUsers(users);

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    return { success: true, message: 'Profile updated successfully', user: updatedUser };
}
