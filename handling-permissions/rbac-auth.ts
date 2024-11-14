//!Role Based Access Control

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
    admin: [
        'view:comments',
        'create:comments',
        'update:comments',
        'delete:comments'
    ],
    moderator: [
        'create:comments',
        'view:comments',
        'delete:comments',
        'update:ownComments',
    ],
    user: [
        'view:comments',
        'create:comments',
        'delete:ownComments',
        'udpate:ownComments',
    ],
} as const;

export const hasPermission = (
    user: { id: number, role: Role },
    permission: Permission
) => (
    (ROLES[user.role] as readonly Permission[]).includes(permission)
);

const authorId = 1;
const user: { id: number, role: Role } = { id: 1, role: 'user' };

hasPermission(user, 'delete:comments') ||  hasPermission(user, 'delete:ownComments') && user.id === authorId;
