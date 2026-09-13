# Changelog

## 1.0.0

Initial public release of **turnbell** — voice, desktop, and webhook notifications for CLI coding agents.

turnbell is the continuation of the project previously published as `hollr-cli`, released under a new name. If you used `hollr-cli`, see [Migrating from hollr](README.md#migrating-from-hollr): install turnbell and your existing hooks keep working through a compatibility alias while you switch.

### Highlights

- Announces the moment your CLI coding agent finishes a turn or needs your input — voice, desktop notification, sound, and/or webhook.
- First-class integrations: Claude Code, Codex, Gemini CLI, Copilot CLI, Cursor, opencode, Antigravity, and Amp, plus a universal `turnbell run` wrapper for any command.
- Local-first, zero telemetry; the only off-device traffic is webhooks you configure (metadata-only payload).
- Reversible wiring: every change is previewed before writing, and `turnbell uninstall` removes only what turnbell added.
- Backward compatibility for `hollr-cli` users: a `hollr` alias keeps existing hooks firing, `~/.config/hollr` auto-migrates to `~/.config/turnbell`, and `turnbell init` cleans up legacy wiring.
