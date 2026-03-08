import { describe, it, expect } from "vitest";
import { getReadingTime } from "../reading-time";

describe("getReadingTime", () => {
  it("returns 1 for short Chinese content", () => {
    expect(getReadingTime("这是一段简短的中文内容。", "zh")).toBe(1);
  });

  it("returns 1 for short English content", () => {
    expect(getReadingTime("This is a short English post.", "en")).toBe(1);
  });

  it("calculates Chinese content at ~400 chars/min", () => {
    // 800 Chinese characters → ~2 minutes
    const content = "中".repeat(800);
    expect(getReadingTime(content, "zh")).toBe(2);
  });

  it("calculates English content at ~200 words/min", () => {
    // 400 words → 2 minutes
    const content = Array(400).fill("word").join(" ");
    expect(getReadingTime(content, "en")).toBe(2);
  });

  it("handles mixed Chinese and English content", () => {
    // 400 Chinese chars (1 min) + 200 English words (1 min) → 2 minutes
    const chinese = "中".repeat(400);
    const english = Array(200).fill("word").join(" ");
    expect(getReadingTime(`${chinese} ${english}`, "zh")).toBe(2);
  });

  it("returns minimum 1 minute for empty content", () => {
    expect(getReadingTime("", "zh")).toBe(1);
    expect(getReadingTime("", "en")).toBe(1);
  });

  it("strips MDX code blocks before counting", () => {
    const content = "Hello world\n```js\nconsole.log('test');\n```\nEnd.";
    // Only "Hello world End." → very few words → 1 min
    expect(getReadingTime(content, "en")).toBe(1);
  });

  it("strips inline code before counting", () => {
    const content = "Use `useState` hook in React for state.";
    expect(getReadingTime(content, "en")).toBe(1);
  });

  it("strips import statements", () => {
    const content = "import Component from './Component'\n\nSome text here.";
    expect(getReadingTime(content, "en")).toBe(1);
  });
});
