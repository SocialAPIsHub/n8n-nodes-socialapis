# Changelog

## [0.2.0] — 2026-10-06

### Added

- **Instagram**: 13 operations across five new resources: Instagram Profile, Post, Reel, Search and Location.
- **Facebook**: Get Page Videos, Get Group Videos, Get Post Details (Extended).
- **Account** resource: Get Usage, Get Limits, Get Top-Ups. These cost no credits.
- The node can be used as a tool by n8n AI Agents (`usableAsTool`).
- Light and dark icons for the node and the credential.

The node now covers all 50 SocialAPIs endpoints.

### Fixed

- Testing the credential no longer spends a credit. It now calls the free `/usage` endpoint instead of `/facebook/pages/id`.
- **Posts Per Call** (3-9) on Get Page Posts and Get Group Posts is now sent to the API. The old **Limit** field was never sent.
- Removed **Limit** fields from other operations that the API doesn't support.
- Codex metadata now points at this package (it said `n8n-nodes-base.SocialApis`).

### Changed

- Built with n8n's `@n8n/node-cli` (lint, build, release) instead of the legacy gulp + eslint 8 setup.
- Published from GitHub Actions with an npm provenance statement on every version tag, as n8n requires for verified community nodes.
