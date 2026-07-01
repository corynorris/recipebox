# RecipeBox - Codebase Analysis

## 1. What the App Does

A single-page CRUD recipe manager that stores data in the browser's `localStorage`. Users can:

- **View** recipes in a responsive 3-column card grid (with images, star ratings, ingredient lists)
- **Search** recipes by ingredient name
- **Create** new recipes (name, image URL, ingredients as tags, description)
- **Edit** existing recipes
- **Delete** recipes
- **Rate** recipes via a star-rating widget (0–5, half-star increments)

The app prepopulates with 3 default recipes (Cheesecake, Scotch Egg, Pork Dumpling) and a set of shared ingredients. All data persists in `localStorage` under the key `"recipebox"`.

---

## 2. Tech Stack and Key Dependencies

| Dependency                 | Version        | Purpose                                                       |
| -------------------------- | -------------- | ------------------------------------------------------------- |
| `react` / `react-dom`      | 18.2.0         | UI framework                                                  |
| `react-router-dom`         | 6.16.0         | Client-side routing (BrowserRouter)                           |
| `vite`                     | 4.4.9          | Build tool and dev server                                     |
| `@vitejs/plugin-react-swc` | 3.3.2          | Vite React plugin (SWC-based fast refresh)                    |
| `react-rating`             | 2.0.5          | Star rating widget                                            |
| `react-tagsinput`          | 3.20.3         | Tag/ingredient input component                                |
| `normalize.css`            | 8.0.1          | CSS reset (also loaded via CDN in index.html — **redundant**) |
| `prop-types`               | 15.8.1         | Runtime prop type checking                                    |
| `vite-plugin-svgr`         | 3.2.0          | SVG as React components (**declared but unused**)             |
| `gh-pages`                 | 6.0.0 (devDep) | Deploy to GitHub Pages                                        |

**Notable:** No TypeScript, no state management library (uses bare localStorage), no testing framework.

---

## 3. File Structure

```
recipebox/
├── index.html                    # Entry HTML (loads normalize.css + font-awesome from CDN)
├── package.json                  # Dependencies and scripts
├── vite.config.js                # Vite config; base = '/recipebox/' for GH Pages
├── Procfile                      # Heroku (references bin/boot — DOES NOT EXIST)
├── .buildpacks                   # Heroku CRA buildpack (stale; app now uses Vite)
├── .gitignore
├── .eslintcache                  # SHOULD BE GITIGNORED
├── README.md                     # Stale (says "bootstrapped with CRA", app is Vite)
├── .github/workflows/
│   └── gh-pages.yml              # GH Actions deploy to Pages on push to main
├── public/
│   ├── favicon.ico
│   ├── img/                      # Recipe images (cheesecake.jpg, dumpling.jpg, etc.)
│   └── bk/                       # DUPLICATE images (leftover backup)
└── src/
    ├── index.jsx                 # React root mount point
    ├── router.jsx                # Route definitions
    ├── App.css                   # App-specific styles
    ├── SimpleGrid.css            # Responsive grid system (Zach Cole's SimpleGrid, 2016)
    ├── data/
    │   ├── Store.js              # Generic localStorage wrapper
    │   ├── RecipeStore.js        # Recipe-specific CRUD + ingredient management
    │   └── recipes.json          # Default seed data (3 recipes, 6 ingredients)
    └── components/
        ├── Card.jsx              # Reusable card with image + title
        ├── RecipeCard.jsx        # Card wrapper with rating + ingredients
        ├── RecipeIngredients.jsx # Ingredient list renderer
        ├── RecipeForm.jsx        # Create/Edit form (name, image, ingredients tags, description)
        ├── RecipeList.jsx        # Main listing page (search + card grid)
        ├── GridLayout.jsx        # Generic grid layout component
        ├── ListLayout.jsx        # Layout wrapper for list page
        ├── RecipeLayout.jsx      # Layout wrapper for recipe detail pages
        ├── CreateRecipe.jsx      # Create recipe page
        ├── EditRecipe.jsx        # Edit recipe page
        ├── ViewRecipe.jsx        # Single recipe detail page
        └── ErrorPage.jsx         # Router error boundary
```

---

## 4. How It's Built/Deployed

### Dev

```bash
npm start          # Runs `vite` dev server
```

### Build

```bash
npm run build      # Runs `vite build` → outputs to `dist/`
npm run serve      # Runs `vite preview` (preview production build)
```

### Deploy (GitHub Pages)

GitHub Actions workflow (`.github/workflows/gh-pages.yml`) triggers on push to `main`:

1. Checkout → Node 18 setup → `npm install` → `npm run build`
2. Upload `./dist` as Pages artifact → Deploy to GH Pages
3. Live at: `https://corynorris.github.io/recipebox/`

Vite base path is `/recipebox/` to match the GH Pages subdirectory deployment.

---

## 5. Obvious Issues and Outdated Patterns

### BUGS (Runtime Errors / Broken Behavior)

1. **`CreateRecipe.jsx` (line 17): `BrowserRouter` is undefined**
   - References `BrowserRouter.push(...)` but `BrowserRouter` is never imported.
   - This will throw `ReferenceError: BrowserRouter is not defined` at runtime when submitting a new recipe.
   - Fix: import `useNavigate` and use `navigate(BASE_URL)` (same pattern as `EditRecipe.jsx`).

2. **`RecipeStore.delete()` (line 62): uses `recipe.id` as array index**
   - `this.data.recipes.splice(recipe.id, 1)` — this treats the recipe's `id` as the array position. If recipe IDs don't match array indices (which they won't after any deletion), this deletes the wrong recipe.
   - Fix: use `getIndexById(id)` instead.

3. **`RecipeStore.generateSafeId()` (line 57): returns `-Infinity` when empty**
   - `Math.max(...ids)` on an empty array returns `-Infinity`. Then `-Infinity + 1` = `-Infinity`.
   - Fix: guard against empty array, e.g., return 0 when recipes are empty.

4. **`RecipeList.updateRating()` (line 21): `this.id` is undefined**
   - The method references `this.id` but `id` is never set. The caller passes via `.bind(recipe)` but the bound context doesn't have `id` accessible this way.
   - Fix: pass `recipe.id` as a parameter explicitly.

5. **`RecipeLayout.jsx` (line 9): `<Link>` has no `to` prop, only `onClick`**
   - `<Link>` without `to` will navigate to an empty path. The `onClick` calls `navigate(-1)` but `Link`'s native navigation fires first.
   - Fix: replace with a plain `<span>`/`<button>` or use `<Link to="..">`.

### ARCHITECTURAL ISSUES

6. **`RecipeStore` instantiated once per component file**
   - `new RecipeStore()` is called at module scope in `RecipeList.jsx`, `RecipeIngredients.jsx`, `CreateRecipe.jsx`, `EditRecipe.jsx`, `ViewRecipe.jsx` (5 instances).
   - Each instance reads from the same localStorage key, but after mutation, other instances' in-memory `this.data` is stale until they call `getRecipes()` / `getIngredientList()` again.
   - This works "accidentally" because each re-read goes to localStorage, but it's fragile and wasteful.
   - Fix: use a singleton module export or React Context.

7. **Class components mixed with functional components**
   - `RecipeList`, `RecipeForm`, `GridLayout`, `Card`, `RecipeCard` are class components.
   - `EditRecipe`, `CreateRecipe`, `ViewRecipe`, `ListLayout`, `RecipeLayout`, `ErrorPage`, `RecipeIngredients` are functional components.
   - No consistent pattern. Some are converted to hooks (`useNavigate`, `useParams`), others are still class-based.

### DEPRECATED / OUTDATED

8. **`componentWillMount` (RecipeList.jsx, line 12)**
   - Renamed to `UNSAFE_componentWillMount` in React 16.3+. Should be moved to `componentDidMount` or constructor.

9. **README says "bootstrapped with Create React App"**
   - The project was migrated from CRA to Vite but the README was never updated.

### CONFIG / BUILD ISSUES

10. **`vite-plugin-svgr` listed as dependency but not used**
    - It's in `package.json` `dependencies` but not in `vite.config.js` `plugins` array. Dead weight.

11. **`normalize.css` loaded twice**
    - Once via `npm` dependency + once via CDN `<link>` in `index.html`. Redundant.

12. **`public/bk/` directory**
    - Duplicate images (cheesecake.jpg, dumpling.jpg, pork-dumpling.jpg, scotch-egg.jpg). Appears to be a backup. Should be removed.

13. **`.eslintcache` committed to repo**
    - Should be in `.gitignore`.

14. **`Procfile` and `.buildpacks` are stale (Heroku-era)**
    - Procfile references `bin/boot` which doesn't exist. `.buildpacks` references `create-react-app-buildpack`. App now deploys via GitHub Pages, not Heroku.

15. **No lockfile for deployment environment**
    - `package-lock.json` is present but CI runs `npm install` which will respect it. No issue per se, but worth noting.

### CODE QUALITY

16. **`RecipeForm` propTypes typo, line 141**
    - `handleSumbit: PropTypes.func` — should be `handleSubmit`.

17. **`GridLayout` has a stale/duplicate last row bug**
    - The `forEach` loop pushes groups when `idx % columns === 0`, but also pushes a final row after the loop. If `items.length` is a multiple of `columns`, the last row is empty. If not, the last group was never pushed as a row before the final `rows.push`.

18. **`RecipeForm.validateImage` has an unused `timeout` parameter**
    - The function signature takes `(url, timeout)` but the parameter is shadowed by a local `let timeout = 5000`. The parameter is never used.

19. **`Card.jsx` `propTypes` `title` is marked as optional**
    - `PropTypes.string` instead of `PropTypes.string.isRequired` — a card with no title renders an empty `<h3>`.

20. **No error handling for missing recipe**
    - `EditRecipe.jsx` and `ViewRecipe.jsx` call `store.getRecipe(recipeId)` but don't handle the `null` return case. If a user navigates to a nonexistent recipe ID, it will crash on `recipe.name`.

---

## Start Here

Open **`src/components/CreateRecipe.jsx`** first — it has the most critical bug (`BrowserRouter` undefined, crash on submit). Then read `src/data/RecipeStore.js` for the data layer issues (delete-by-id, safe-id generation).

## Key Data Flow

```
localStorage (key: "recipebox")
    ↓
Store.js (generic get/set JSON wrapper)
    ↓
RecipeStore.js (recipe CRUD + ingredient dedup via integer IDs)
    ↓
Components instantiate `new RecipeStore()` at module scope
    ↓
React Router routes: /recipebox → ListLayout → RecipeList (grid)
                      /recipebox/recipe/view/:id → ViewRecipe
                      /recipebox/recipe/create → CreateRecipe
                      /recipebox/recipe/edit/:id → EditRecipe
```

Ingredients are stored as a flat array of strings. Recipes reference ingredients by integer index into that array. When creating/editing, ingredient strings are converted to indices via `addIngredients()`. When displaying, indices are converted back to strings via `getIngredientNames()`.
