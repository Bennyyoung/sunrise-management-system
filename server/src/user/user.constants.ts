export abstract class UserConstants {
  static get StandardIncludeSets() {
    return _StandardUserIncludeSets;
  }
}

abstract class _StandardUserIncludeSets {
  static get detailed() {
    return {
      role: {
        select: {
          id: true,
          name: true,
          permissions: true,
        },
      },
    };
  }
}
