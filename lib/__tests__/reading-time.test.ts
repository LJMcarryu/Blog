import { describe, it, expect } from "vitest";
import { getReadingTime } from "../reading-time";

describe("getReadingTime", () => {
  it("returns '1 分钟阅读' for short Chinese content", () => {
    const result = getReadingTime("这是一段简短的中文内容。", "zh");
    expect(result).toBe("1 分钟阅读");
  });

  it("returns '1 min read' for short English content", () => {
    const result = getReadingTime("This is a short English post.", "en");
    expect(result).toBe("1 min read");
  });

  it("calculates Chinese content at ~400 chars/min", () => {
    // 800 Chinese characters → ~2 minutes
    const content = "中".repeat(800);
    const result = getReadingTime(content, "zh");
    expect(result).toBe("2 分钟阅读");
  });

  it("calculates English content at ~200 words/min", () => {
    // 400 words → 2 minutes
    const content = Array(400).fill("word").join(" ");
    const result = getReadingTime(content, "en");
    expect(result).toBe("2 min read");
  });

  it("handles mixed Chinese and English content", () => {
    // 400 Chinese chars (1 min) + 200 English words (1 min) → 2 minutes
    const chinese = "中".repeat(400);
    const english = Array(200).fill("word").join(" ");
    const result = getReadingTime(`${chinese} ${english}`, "zh");
    expect(result).toBe("2 分钟阅读");
  });

  it("returns minimum 1 minute for empty content", () => {
    expect(getReadingTime("", "zh")).toBe("1 分钟阅读");
    expect(getReadingTime("", "en")).toBe("1 min read");
  });

  it("strips MDX code blocks before counting", () => {
    const content = "Hello world\n```js\nconsole.log('test');\n```\nEnd.";
    const result = getReadingTime(content, "en");
    // Only "Hello world End." → very few words → 1 min
    expect(result).toBe("1 min read");
  });

  it("strips inline code before counting", () => {
    const content = "Use `useState` hook in React for state.";
    const result = getReadingTime(content, "en");
    expect(result).toBe("1 min read");
  });

  it("strips import statements", () => {
    const content = "import Component from './Component'\n\nSome text here.";
    const result = getReadingTime(content, "en");
    expect(result).toBe("1 min read");
  });
});
