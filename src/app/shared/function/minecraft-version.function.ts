/**
 * Compares numeric Minecraft versions in descending order, treating an omitted patch as zero.
 *
 * @param {string} left first Minecraft version.
 * @param {string} right second Minecraft version.
 * @returns {number} a negative value when the first version is newer, zero when equal, or a positive value when older.
 */
export function compareMinecraftVersions(left: string, right: string): number {
  const [leftMajor = 0, leftMinor = 0, leftPatch = 0] = left.split('.').map(Number);
  const [rightMajor = 0, rightMinor = 0, rightPatch = 0] = right.split('.').map(Number);
  return rightMajor - leftMajor || rightMinor - leftMinor || rightPatch - leftPatch;
}
