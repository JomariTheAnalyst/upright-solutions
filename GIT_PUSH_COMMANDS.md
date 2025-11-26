# Git Commands to Push to GitHub

## Step 1: Initialize Git (if not already initialized)

```bash
git init
```

## Step 2: Add the remote repository

```bash
git remote add origin https://github.com/JomariTheAnalyst/upright-solutions.git
```

## Step 3: Check current branch name

```bash
git branch
```

## Step 4: Add all files to staging

```bash
git add .
```

## Step 5: Commit your changes

```bash
git commit -m "Initial commit: Upright Solutions website with hero, about sections, and animations"
```

## Step 6: Push to GitHub

```bash
git push -u origin main
```

**Note:** If your default branch is `master` instead of `main`, use:

```bash
git push -u origin master
```

---

## Alternative: If you need to rename branch to main

```bash
git branch -M main
git push -u origin main
```

---

## Quick One-Liner (after remote is added)

```bash
git add . && git commit -m "Initial commit: Upright Solutions website" && git push -u origin main
```

---

## Troubleshooting

### If remote already exists:

```bash
git remote remove origin
git remote add origin https://github.com/JomariTheAnalyst/upright-solutions.git
```

### If you get authentication errors:

Use GitHub Personal Access Token or SSH key for authentication.

### To check remote URL:

```bash
git remote -v
```

### To force push (use with caution):

```bash
git push -u origin main --force
```
