// Create a SHA-256 hash for the password.
// We never store the plain password in localStorage.
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

// Get all registered users
export function getRegisteredUsers() {
  const users = localStorage.getItem("registeredUsers");

  return users ? JSON.parse(users) : [];
}

// Save a new user
export function saveRegisteredUser(user) {
  const users = getRegisteredUsers();

  users.push(user);

  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

// Save currently logged-in user
export function saveCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

// Get currently logged-in user
export function getCurrentUser() {
  const user = localStorage.getItem("currentUser");

  return user ? JSON.parse(user) : null;
}

// Remove currently logged-in user
export function logoutUser() {
  localStorage.removeItem("currentUser");
}

// Check login credentials
export async function loginUser(email, password) {
  const users = getRegisteredUsers();

  const hashedPassword = await hashPassword(password);

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.passwordHash === hashedPassword,
  );

  if (!user) {
    return null;
  }

  const loggedInUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };

  saveCurrentUser(loggedInUser);

  return loggedInUser;
}
export function updateCurrentUser(updatedData) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const updatedUser = {
    ...currentUser,
    ...updatedData,
  };

  // Update current logged-in user
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));

  // Also update registered user
  const users = getRegisteredUsers();

  const updatedUsers = users.map((user) =>
    user.id === currentUser.id
      ? {
          ...user,
          ...updatedData,
        }
      : user,
  );

  localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

  return updatedUser;
}
