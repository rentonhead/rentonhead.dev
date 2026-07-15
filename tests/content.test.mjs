import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../lib/content.ts", import.meta.url), "utf8");

test("portfolio exposes four verified project slugs", () => {
  for (const slug of ["brewclock", "castor-coffee-mobile", "rentonsoft", "okulsistem"]) {
    assert.match(source, new RegExp(`slug: \\"${slug}\\"`));
  }
});

test("English and Russian product narratives are present", () => {
  assert.match(source, /Art direction and engineering/);
  assert.match(source, /Арт-дирекшн и разработка/);
});

test("copy avoids prohibited unverifiable marketing claims", () => {
  assert.doesNotMatch(source, /award-winning|100\+ projects|10\+ years/i);
});
