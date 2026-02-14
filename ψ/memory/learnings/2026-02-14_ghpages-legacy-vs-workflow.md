# GitHub Pages: legacy vs workflow build_type

**Date**: 2026-02-14
**Source**: Deploying slides to GitHub Pages
**Project**: nazt/hello-oracle

## Pattern

When enabling GitHub Pages via API, `build_type` matters:

- **`legacy`**: Deploys directly from branch. No Actions workflow needed. Best for simple static sites.
- **`workflow`**: Requires a GitHub Actions workflow file (.github/workflows/). Build won't trigger without it.

## Commands

```bash
# Enable with legacy (simple static deploy)
gh api repos/OWNER/REPO/pages -X POST --input - <<'EOF'
{"source":{"branch":"main","path":"/"},"build_type":"legacy"}
EOF

# Switch from workflow to legacy
gh api repos/OWNER/REPO/pages -X PUT --input - <<'EOF'
{"source":{"branch":"main","path":"/"},"build_type":"legacy"}
EOF

# Check build status
gh api repos/OWNER/REPO/pages/builds --jq '.[0] | {status, created_at}'
```

## Gotcha

If the repo was renamed, use the **current GitHub name** (not the local folder name) for API calls.

## Concepts

- GitHub Pages
- Static deployment
- API configuration
