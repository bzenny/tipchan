# TipCHAN agent and Cloudflare conventions

## Platform
- Source of truth: GitHub `bzenny/tipchan`.
- Frontend: Vite + TypeScript, build output `dist/`.
- Hosting: Cloudflare Workers static assets or Cloudflare Pages with Git integration.
- Data: Supabase. Do not place Supabase service-role secrets in client-side `VITE_` variables.
- Payments: noncustodial Base USDC. Do not enable mainnet payments before server-side verification and security review.

## Cloudflare agent setup
Follow https://developers.cloudflare.com/agent-setup/ and the guide for the chosen coding agent. Install Cloudflare Skills, connect Cloudflare MCP via browser OAuth, and use Wrangler for local development and deployment. Do not commit OAuth tokens, API tokens, or account secrets.

For Codex CLI, see https://developers.cloudflare.com/agent-setup/codex/ : install Codex, open this repository, and install the Cloudflare plugin from `/plugins`. Cloudflare MCP authorization requires user approval.

## Cloudflare Pages Git deployment
1. In Cloudflare dashboard, choose Workers & Pages > Create > Pages > Connect to Git.
2. Select `bzenny/tipchan` and the production branch `main` when it contains a verified build.
3. Framework preset: Vite; build command: `npm run build`; output directory: `dist`.
4. Set environment variables only when needed, and never expose server secrets through `VITE_` variables.
5. Use preview deployments for pull requests; test before promotion to production.
6. Attach `tipchan.io` only after domain ownership and DNS are confirmed.

## Quality gates
- GitHub Actions must pass before merging to `main`.
- No live payments in the foundation build.
- Verify authentication, RLS, payment intent correlation, chain/token/recipient/amount, replay protection, and on-chain settlement before production.
