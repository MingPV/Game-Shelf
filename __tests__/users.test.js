/**
 * @jest-environment jsdom
 */

// Mock jose
jest.mock("jose", () => ({
  SignJWT: class {
    protectedHeader;
    issuedAt;
    payload;

    constructor(payload) {
      this.payload = payload;
    }

    setProtectedHeader(header) {
      this.protectedHeader = header;
      return this;
    }

    setIssuedAt() {
      this.issuedAt = Date.now();
      return this;
    }

    async sign() {
      return "mocked.jwt.token";
    }
  },
  importJWK: jest.fn(() => "mock-secret-key"), // ✅ mock this function too
  jwtVerify: jest.fn(() => ({
    payload: { sub: "mock-user-id" },
  })),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    set: jest.fn(),
  })),
}));

// Mock Supabase client and behavior
jest.mock("../utils/supabase/server", () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn(() => ({
        data: null,
        error: { message: "Invalid login credentials" },
      })),
    },
  })),
}));

import { signInAction } from "../app/(auth-pages)/actions_test";

describe("signInAction", () => {
  it("should return success if email or password is correct", async () => {
    const formData = new FormData();
    formData.set("email", "player888@gmail.com");
    formData.set("password", "12345678");

    const result = await signInAction(formData);

    expect(result).toEqual({
      status: "success",
    });
  });

  it("should return error if email or password is incorrect", async () => {
    const formData = new FormData();
    formData.set("email", "player888@gmail.com");
    formData.set("password", "wrong1234");

    const result = await signInAction(formData);

    expect(result).toEqual({
      status: "error",
      message: "Incorrect password or email",
    });
  });

  it("should return error if email is empty", async () => {
    const formData = new FormData();
    formData.set("email", "");
    formData.set("password", "12345678");

    const result = await signInAction(formData);

    expect(result).toEqual({
      status: "error",
      message: "Incorrect password or email",
    });
  });

  it("should return error if password is empty", async () => {
    const formData = new FormData();
    formData.set("email", "player888@gmail.com");
    formData.set("password", "");

    const result = await signInAction(formData);

    expect(result).toEqual({
      status: "error",
      message: "Incorrect password or email",
    });
  });
});
