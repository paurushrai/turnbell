# Changelog

## 1.0.0

Initial public release of **kelbrin** — voice, desktop, and webhook notifications for CLI coding agents.

kelbrin is the continuation of the project previously published as `hollr-cli`, released under a new name. If you used `hollr-cli`, see [Migrating from hollr](README.md#migrating-from-hollr): install kelbrin and your existing hooks keep working through a compatibility alias while you switch.

### Highlights

- Announces the moment your CLI coding agent finishes a turn or needs your input — voice, desktop notification, sound, and/or webhook.
- First-class integrations: Claude Code, Codex, Gemini CLI, Copilot CLI, Cursor, opencode, Antigravity, and Amp, plus a universal `kelbrin run` wrapper for any command.
- Local-first, zero telemetry; the only off-device traffic is webhooks you configure (metadata-only payload).
- Reversible wiring: every change is previewed before writing, and `kelbrin uninstall` removes only what kelbrin added.
- Backward compatibility for `hollr-cli` users: a `hollr` alias keeps existing hooks firing, `~/.config/hollr` auto-migrates to `~/.config/kelbrin`, and `kelbrin init` cleans up legacy wiring.
