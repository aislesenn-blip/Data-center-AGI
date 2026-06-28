from playwright.sync_api import sync_playwright
import glob

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # 1. Start Onboarding
    page.get_by_role("button", name="Get Started").click()
    page.wait_for_timeout(500)

    # 2. Fill Name & Email
    page.get_by_placeholder("e.g., John Doe").fill("Test User")
    page.get_by_placeholder("e.g., john@example.com").fill("test@test.com")
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Continue").click()
    page.wait_for_timeout(500)

    # 3. Enter PIN (1234)
    page.get_by_role("button", name="1").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="2").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="3").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="4").click()
    page.wait_for_timeout(500)

    # 4. Fill Member ID
    page.get_by_role("textbox").fill("testuser")
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Finish Setup").click()
    page.wait_for_timeout(1000)

    # 5. Home Screen - Take Screenshot
    page.screenshot(path="/home/jules/verification/screenshots/home_final.png")
    page.wait_for_timeout(500)

    # 6. Click Add to Card (Subscribe)
    page.get_by_text("Add to Card").click()
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/explore_final.png")

    # 7. Search Mama Rose
    page.get_by_placeholder("Search @MamaRose...").fill("Mama Rose")
    page.wait_for_timeout(500)
    page.get_by_text("Mama Rose Cafe").click()
    page.wait_for_timeout(1000)

    # 8. Service Quantity Selection
    # Keypad
    page.get_by_role("button", name="2").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="0", exact=True).click()
    page.wait_for_timeout(500)
    page.screenshot(path="/home/jules/verification/screenshots/quantity_final.png")
    page.get_by_role("button", name="Continue").click()
    page.wait_for_timeout(1000)

    # 9. Confirmation
    page.screenshot(path="/home/jules/verification/screenshots/confirmation_final.png")
    page.get_by_role("button", name="Confirm Addition").click()
    page.wait_for_timeout(1000)

    # 10. Auth PIN
    page.get_by_role("button", name="1").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="2").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="3").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="4").click()
    page.wait_for_timeout(1500) # Wait for verification spinner

    # 11. Success Screen
    page.screenshot(path="/home/jules/verification/screenshots/success_final.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={'width': 414, 'height': 896} # Mobile viewport
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()

        # Get video file path
        video_files = glob.glob("/home/jules/verification/videos/*.webm")
        if video_files:
            print(f"Video saved to {video_files[-1]}")
