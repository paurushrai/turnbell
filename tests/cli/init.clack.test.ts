/**
 * Tests for the real @clack-facing shell in `src/cli/init.ts` — the one seam
 * every other init/uninstall test bypasses via a scripted `InitIo` fake. These
 * mock `@clack/prompts` itself, so they exercise `clackIo()`'s mapping (note,
 * confirm, cancel→throw) and `runInitCli`/`runUninstallCli`'s intro/outro/exit
 * behavior for real, without a live terminal.
 */
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ home: "", CANCEL: Symbol("test-cancel") }));

vi.mock("node:os", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:os")>();
  return { ...actual, homedir: () => state.home };
});

vi.mock("@clack/prompts", () => ({
  intro: vi.fn(),
  outro: vi.fn(),
  cancel: vi.fn(),
  note: vi.fn(),
  isCancel: (value: unknown): value is symbol => value === state.CANCEL,
  confirm: vi.fn(),
  select: vi.fn(),
  multiselect: vi.fn(),
  text: vi.fn(),
}));

import * as clack from "@clack/prompts";
import { runInitCli, runUninstallCli } from "../../src/cli/init.ts";

let tmpRoot: string;
let prevTurnbellHome: string | undefined;

beforeEach(() => {
  tmpRoot = mkdtempSync(join(tmpdir(), "turnbell-init-clack-"));
  state.home = join(tmpRoot, "home");
  prevTurnbellHome = process.env.TURNBELL_HOME;
  process.env.TURNBELL_HOME = join(tmpRoot, ".config", "turnbell");
  vi.clearAllMocks();
});

afterEach(() => {
  if (prevTurnbellHome === undefined) {
    delete process.env.TURNBELL_HOME;
  } else {
    process.env.TURNBELL_HOME = prevTurnbellHome;
  }
  rmSync(tmpRoot, { recursive: true, force: true });
});

describe("runInitCli", () => {
  it("should_run_yes_path_via_real_clack_shell_without_touching_any_prompt", async () => {
    const runTestFn = vi.fn().mockResolvedValue(0);

    const code = await runInitCli(["--yes"], runTestFn);

    expect(code).toBe(0);
    expect(clack.intro).toHaveBeenCalledWith("turnbell setup");
    expect(clack.confirm).not.toHaveBeenCalled();
    expect(clack.select).not.toHaveBeenCalled();
    expect(clack.multiselect).not.toHaveBeenCalled();
    expect(clack.text).not.toHaveBeenCalled();
    expect(clack.outro).toHaveBeenCalledWith(expect.stringContaining("Wrote "));
    expect(runTestFn).not.toHaveBeenCalled();
  });
});

describe("runUninstallCli", () => {
  it("should_map_note_and_confirm_through_clack_and_stop_when_declined", async () => {
    vi.mocked(clack.confirm).mockResolvedValue(false);

    const code = await runUninstallCli();

    expect(code).toBe(0);
    expect(clack.intro).toHaveBeenCalledWith("turnbell uninstall");
    expect(clack.note).toHaveBeenCalledWith("No wired integrations found.", undefined);
    expect(clack.confirm).toHaveBeenCalledWith({
      message: "Reverse every turnbell integration?",
      initialValue: false,
    });
    expect(clack.note).toHaveBeenCalledWith("Nothing changed.", undefined);
  });

  it("should_reject_and_call_clack_cancel_when_confirm_is_cancelled", async () => {
    vi.mocked(clack.confirm).mockResolvedValue(state.CANCEL);

    await expect(runUninstallCli()).rejects.toThrow("Setup cancelled.");

    expect(clack.cancel).toHaveBeenCalledWith("Setup cancelled.");
  });
});
