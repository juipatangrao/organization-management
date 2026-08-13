export function getUserRole() {
  // Dev-only override so the Header dropdown can switch views instantly.
  // Once real login is wired in, this can simply be removed.
  const override = localStorage.getItem("roleOverride");
  if (override) return override;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );
    return decoded.role || null;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
}