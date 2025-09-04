import { test, expect } from '@playwright/test'

test('graph tab loads and shows interactive graph', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Adaptive Learning/i })).toBeVisible()
  await page.getByRole('button', { name: /Try Interactive Demo/i }).click()
  await expect(page.getByText(/Interactive Knowledge Graph/i)).toBeVisible()
  await expect(page.getByPlaceholder(/Search nodes/i)).toBeVisible()
})



