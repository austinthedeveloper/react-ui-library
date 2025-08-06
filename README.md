# React UI Component Library

This is a React + TypeScript component library built for practicing reusable UI components with Storybook.  
Bootstrap is used for styling to keep the focus on component architecture and behavior.

## Hosted Site

https://reactstorybookui.z13.web.core.windows.net/

## ✨ Features

- 📦 Built with [Vite](https://vitejs.dev/) for lightning-fast development
- 📘 Integrated with [Storybook](https://storybook.js.org/) for isolated component previews
- 🎨 Bootstrap-powered UI with support for variants and sizing
- 🧪 Supports testing with [Storybook Test Runner](https://storybook.js.org/docs/testing/test-runner) and [Playwright](https://playwright.dev/)

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.stories.tsx
.storybook/
├── main.ts
├── preview.ts
```

---

## 📦 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

### 3. Start Storybook

```bash
npm run storybook
```

### 4. Build the library

```bash
npm run build
```

### 5. Build Storybook

```bash
npm run build-storybook
```

---

## 🧪 Testing

### Run Storybook interaction tests (play function)

```bash
npm run build-storybook
npm run test-storybook
```

> Make sure Storybook is built before running the test runner.

### Optional: Playwright E2E tests against Storybook

```bash
npm run storybook -- --port 6006
npx playwright test
```

---

## 🚀 Future Ideas

- Add CI for Storybook + Test Runner
- Visual regression testing with Chromatic or Playwright screenshots
- Create more components (Input, Card, Modal, etc.)
- Publish the library as an npm package

---

## 🛠️ Tech Stack

- React + TypeScript
- Vite
- Storybook
- Bootstrap 5
- Playwright (optional)
