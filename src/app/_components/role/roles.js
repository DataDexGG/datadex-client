"use client";

export function getGuildRole(member_level) {
  switch (member_level) {
    case 2:  return Roles.MEMBER;
    case 3:  return Roles.OFFICER;
    case 4:  return Roles.LEADER;
    default: return Roles.MEMBER;
  }
}

export function getGuildRoleBadge(member_level) {
  const role = getGuildRole(member_level);
  return (
    <div className={`absolute -right-0.5 top-2 px-2 pb-1 rounded ${role.badge} mr-1 scale-[80%]`}>
      <span className={`text-xs font-semibold uppercase ${role.text}`}>{role.name}</span>
    </div>
  );
}

/**
 * These 'roles' are pulled from the game.
 * They're used only for visual purposes, due to the fact that the game
 * doesn't update frequently enough.
 */
export const Roles = {
  MEMBER: {
    id: 1,
    name: 'Member',
    text: 'bg-gray-300',
    badge: 'bg-gray-200',
  },
  OFFICER: {
    id: 2,
    name: 'Officer',
    text: 'text-red-600',
    badge: 'bg-red-200',
  },
  LEADER: {
    id: 3,
    name: 'Leader',
    text: 'text-red-600',
    badge: 'bg-red-200',
  }
}
