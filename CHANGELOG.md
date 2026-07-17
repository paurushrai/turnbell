# Changelog

## [1.1.0](https://github.com/paurushrai/kelbrin/compare/kelbrin-v1.0.0...kelbrin-v1.1.0) (2026-07-17)


### Features

* **adapters:** Claude Code, Codex, Gemini ([c67638f](https://github.com/paurushrai/kelbrin/commit/c67638fd28bc143c50c16aab7ccd5ff61de2e716))
* **adapters:** Copilot, Cursor, Antigravity, opencode, Amp, and universal wrapper ([6d7fad6](https://github.com/paurushrai/kelbrin/commit/6d7fad69a4d2100e3d1487deb7bceffa3aba2aeb))
* **adapters:** reversible wiring ledger and shared helpers ([cf4240e](https://github.com/paurushrai/kelbrin/commit/cf4240e347c6293115219453e82aee7a387c463b))
* **cli:** command implementations ([fed541b](https://github.com/paurushrai/kelbrin/commit/fed541bcae8bd5743cad8eaaf976b71e0c878bdc))
* **cli:** entry point, dispatch, and hollr compatibility ([8d96e82](https://github.com/paurushrai/kelbrin/commit/8d96e82ebfbc4b0298ab7a18ba3b8e2066aabd5f))
* **core:** configuration schema, paths, and project resolution ([2660858](https://github.com/paurushrai/kelbrin/commit/2660858172586e056a8b74d737ecc2ff781937f4))
* **core:** normalized event model, routing, and log pruning ([1183618](https://github.com/paurushrai/kelbrin/commit/118361823cdf7957c9cf834a4fc8286d55f6764e))
* **core:** read-aloud control (pause/resume/stop) and doctor ([4c97899](https://github.com/paurushrai/kelbrin/commit/4c978992e5fbb339a69a5df8aab0533f7f6c1226))
* **platform:** system voice and desktop notifications ([3ec75d1](https://github.com/paurushrai/kelbrin/commit/3ec75d12d331be079dd2bcb78ed1b371a06751e5))
* **sinks:** webhook delivery (ntfy, pushover, slack, generic) ([35af8c0](https://github.com/paurushrai/kelbrin/commit/35af8c0d7b5adc18378f0cfe5eb65c7ccbb74566))

## 1.0.0

Initial public release of **kelbrin** — voice, desktop, and webhook notifications for CLI coding agents.

kelbrin is the continuation of the project previously published as `hollr-cli`, released under a new name. If you used `hollr-cli`, see [Migrating from hollr](README.md#migrating-from-hollr): install kelbrin and your existing hooks keep working through a compatibility alias while you switch.

### Highlights

- Announces the moment your CLI coding agent finishes a turn or needs your input — voice, desktop notification, sound, and/or webhook.
- First-class integrations: Claude Code, Codex, Gemini CLI, Copilot CLI, Cursor, opencode, Antigravity, and Amp, plus a universal `kelbrin run` wrapper for any command.
- Local-first, zero telemetry; the only off-device traffic is webhooks you configure (metadata-only payload).
- Reversible wiring: every change is previewed before writing, and `kelbrin uninstall` removes only what kelbrin added.
- Backward compatibility for `hollr-cli` users: a `hollr` alias keeps existing hooks firing, `~/.config/hollr` auto-migrates to `~/.config/kelbrin`, and `kelbrin init` cleans up legacy wiring.
