# Deployment Guide

Quick reference for deploying the compound interest calculator to GitHub Pages.

## Prerequisites

- GitHub account with `wealthyparrot` organization access
- Git configured with GitHub credentials

## Step-by-Step Deployment

### 1. Create GitHub Repository

1. Go to: https://github.com/organizations/wealthyparrot/repositories/new
   - **Repository name:** `compound-interest-calculator`
   - **Visibility:** Public
   - **Do NOT initialize** with README, .gitignore, or license (already exists locally)

2. Click "Create repository"

### 2. Push Code to GitHub

```bash
cd C:\Users\carme\Desktop\claude-test\wealthy-parrot-products\github-apps\compound-interest-calculator

# Add remote origin
git remote add origin https://github.com/wealthyparrot/compound-interest-calculator.git

# Rename branch to main
git branch -M main

# Push code
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to repository Settings: https://github.com/wealthyparrot/compound-interest-calculator/settings/pages

2. Under "Build and deployment":
   - **Source:** Deploy from a branch → Change to "GitHub Actions"
   - Leave other settings as default

3. The deployment workflow will automatically run

### 4. Monitor Deployment

1. Go to Actions tab: https://github.com/wealthyparrot/compound-interest-calculator/actions

2. Watch the "Deploy to GitHub Pages" workflow:
   - Should complete in 2-3 minutes
   - Green checkmark = successful deployment

3. Note the deployment URL (will be displayed in the workflow)

### 5. Verify Live Calculator

1. Visit: https://wealthyparrot.github.io/compound-interest-calculator/

2. Test core functionality:
   - Enter values: Principal $10,000, Rate 7%, Monthly compound, 10 years, $500/month contribution
   - Click "Calculate"
   - Verify results display correctly
   - Check chart renders

3. Test currencies:
   - Switch between EUR, USD, GBP, SEK, NOK, DKK
   - Verify currency symbols update

4. Test compounding frequencies:
   - Switch between Annually, Semi-Annually, Quarterly, Monthly, Daily
   - Verify results change appropriately

5. Test embed mode:
   - Visit: https://wealthyparrot.github.io/compound-interest-calculator/?embed=true
   - Verify header/footer hidden
   - Verify calculator functions normally

6. Test mobile:
   - Open on mobile device or use DevTools responsive mode
   - Verify layout adapts (two-column → single column)
   - Test all functionality

### 6. Update Blog

Add to `wealthyparrot.com/resources/` page:

```markdown
**Compound Interest Calculator** - See how your investments grow with compound interest. Supports multiple compounding frequencies (annually, monthly, daily) and optional recurring contributions. Available in 6 currencies. [Try the calculator](https://wealthyparrot.github.io/compound-interest-calculator/) or [view source on GitHub](https://github.com/wealthyparrot/compound-interest-calculator).
```

Optional: Create dedicated blog post with iframe embed:

```html
<iframe
  src="https://wealthyparrot.github.io/compound-interest-calculator/?embed=true"
  width="100%"
  height="800"
  frameborder="0"
  title="Compound Interest Calculator">
</iframe>
```

## Troubleshooting

### Deployment workflow fails

**Check:**
- Node version in workflow (should be 20)
- npm ci vs npm install (ci is stricter)
- Build command in package.json
- Base path in vite.config.ts (`/compound-interest-calculator/`)

**Fix:**
- Check Actions tab for error details
- Fix locally, commit, and push again

### Calculator doesn't load (404 error)

**Check:**
- GitHub Pages is enabled in Settings
- Workflow completed successfully (green checkmark)
- Correct URL format: `/compound-interest-calculator/` (with trailing slash)
- Base path in vite.config.ts matches repository name

**Fix:**
- Verify `vite.config.ts` has `base: '/compound-interest-calculator/'`
- Rebuild and push if needed

### Styles not loading

**Check:**
- Tailwind CSS build successful
- CSS file referenced in index.html
- PostCSS configuration correct (`@tailwindcss/postcss`)

**Fix:**
- Run `npm run build` locally to verify
- Check browser console for CSS errors

### Chart not rendering

**Check:**
- Chart.js imported correctly
- Data being passed to Chart component
- No JavaScript errors in console

**Fix:**
- Verify Chart.js dependencies installed
- Check data format matches expected structure

## Post-Deployment Tasks

### Immediate

1. **Star your own repository** (boosts visibility)
2. **Add topics** to repository:
   - `compound-interest`
   - `calculator`
   - `finance`
   - `react`
   - `typescript`
   - `vite`
   - `personal-finance`

3. **Update repository description:**
   - "Multi-currency compound interest calculator with configurable compounding frequencies and recurring contributions. Built with React + TypeScript + Vite."

### Week 1

4. **Launch promotion:**
   - Post to r/personalfinance (include link, explain features)
   - Post to r/investing
   - Post to r/Bogleheads
   - Submit to Hacker News (Show HN: Open-source compound interest calculator)

5. **Email subscribers:**
   - Announce new calculator in newsletter
   - Highlight multi-currency and embed features
   - Link to GitHub for developers

### Month 1

6. **Monitor metrics:**
   - GitHub stars and forks
   - Blog traffic from calculator page
   - Email signups attributed to calculator
   - User feedback and feature requests

7. **Iterate based on feedback:**
   - Prioritize GitHub issues
   - Add most-requested features
   - Fix bugs promptly
   - Update documentation

## Future Enhancements

Based on user feedback, consider:

- [ ] Inflation adjustment
- [ ] Tax considerations
- [ ] Comparison mode (multiple scenarios)
- [ ] Export to PDF/CSV
- [ ] URL parameter state saving
- [ ] Additional currencies (CHF, AUD, JPY)
- [ ] Retirement planning presets

## Success Metrics

Track these post-deployment:

**GitHub:**
- Stars: Target 50+ in Month 1
- Forks: Target 10+ in Month 1
- Issues: Respond within 48 hours

**Blog:**
- Traffic from calculator: 100+ visits/month by Month 3
- Email signups: 10+ attributed in Q1
- Bounce rate: <60%

**Community:**
- Reddit upvotes: 20+ per post
- HN points: 50+ (if posted)
- Social shares: 10+ organic shares

## Support

- **Documentation:** README.md in repository
- **Issues:** https://github.com/wealthyparrot/compound-interest-calculator/issues
- **Blog:** https://www.wealthyparrot.com/
- **Email:** Contact form on blog

---

**Deployment checklist:**
- [ ] GitHub repository created
- [ ] Code pushed to main branch
- [ ] GitHub Pages enabled (GitHub Actions)
- [ ] Deployment workflow successful
- [ ] Live calculator verified
- [ ] All features tested
- [ ] Embed mode tested
- [ ] Mobile responsiveness verified
- [ ] Blog updated with calculator link
- [ ] Repository topics added
- [ ] Launch posts scheduled

**Estimated deployment time:** 15-20 minutes
