import argparse
import json
import re
import time
from pathlib import Path
from random import uniform
from urllib.parse import quote_plus

from selenium import webdriver
from selenium.common.exceptions import TimeoutException, WebDriverException
from selenium.webdriver.support.ui import WebDriverWait
from urllib3.exceptions import ReadTimeoutError


ROOT = Path(__file__).resolve().parents[1]
PROFILE_DIR = ROOT / "linkedin-scraper" / ".chrome-profile"
OUTPUT = ROOT / "data" / "discovered_founders.json"

DEFAULT_QUERIES = [
    "AI founder Australia",
    "artificial intelligence founder Australia",
    "machine learning founder Australia",
    "generative AI founder Australia",
    "deep tech founder Australia",
    "robotics founder Australia",
    "technical founder Australia",
    "SaaS founder Australia",
    "healthtech AI founder Australia",
    "fintech AI founder Australia",
    "climate tech founder Australia",
    "cybersecurity founder Australia",
    "AI startup founder Sydney",
    "AI startup founder Melbourne",
    "AI founder Brisbane",
    "AI founder Perth",
    "AI founder Adelaide",
    "AI founder Canberra",
]

FOUNDER_PATTERN = re.compile(
    r"\b(?:co-?founder|founder|founding\s+(?:engineer|member|team))\b",
    re.IGNORECASE,
)
AUSTRALIA_PATTERN = re.compile(
    r"\b(?:Australia|Sydney|Melbourne|Brisbane|Perth|Adelaide|Canberra|"
    r"Hobart|Darwin|Newcastle|Gold Coast|Wollongong|Geelong|Victoria|"
    r"Queensland|Tasmania|New South Wales|Western Australia|"
    r"South Australia|Australian Capital Territory)\b",
    re.IGNORECASE,
)
AI_PATTERN = re.compile(
    r"\b(?:AI|artificial intelligence|machine learning|ML|generative|"
    r"robotics|deep tech|data|SaaS|cyber|fintech|healthtech|climate tech)\b",
    re.IGNORECASE,
)


def parse_args():
    parser = argparse.ArgumentParser(
        description="Collect public Australian founder discovery candidates."
    )
    parser.add_argument("--pages", type=int, default=3)
    parser.add_argument("--target", type=int, default=250)
    parser.add_argument("--output", type=Path, default=OUTPUT)
    parser.add_argument("--visible", action="store_true")
    return parser.parse_args()


def create_driver(visible):
    options = webdriver.ChromeOptions()
    if not visible:
        options.add_argument("--headless=new")
    options.add_argument("--window-size=1440,1200")
    options.add_argument(f"--user-data-dir={PROFILE_DIR.resolve()}")
    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(60)
    return driver


def parse_card(card):
    blocks = [
        block.strip()
        for block in re.split(r"\n\s*\n", card["text"])
        if block.strip()
    ]
    if len(blocks) < 2:
        return None

    name = blocks[0].splitlines()[0].strip()
    headline = blocks[1].replace("\n", " ").strip()
    location = blocks[2].replace("\n", " ").strip() if len(blocks) > 2 else ""
    combined = f"{headline} {location}"
    if not FOUNDER_PATTERN.search(headline) or not AUSTRALIA_PATTERN.search(combined):
        return None

    return {
        "name": name,
        "linkedin_url": card["url"],
        "current_title": headline,
        "city": location or None,
        "is_current_founder": 1,
        "ai_or_tech_signal": bool(AI_PATTERN.search(combined)),
        "discovery_tier": "Discovery Candidate",
        "source_type": "LinkedIn people search",
    }


def collect_page(driver, query, page):
    url = (
        "https://www.linkedin.com/search/results/people/?keywords="
        f"{quote_plus(query)}&page={page}"
    )
    driver.get(url)
    WebDriverWait(driver, 30).until(
        lambda browser: browser.execute_script("return document.readyState")
        == "complete"
    )
    time.sleep(2)
    return driver.execute_script(
        """
        return [...document.querySelectorAll('main [role="listitem"]')]
          .map(card => {
            const anchor = card.querySelector('a[href*="/in/"]');
            return anchor ? {
              url: anchor.href.split('?')[0].replace(/\\/$/, '') + '/',
              text: (card.innerText || '').trim()
            } : null;
          })
          .filter(Boolean);
        """
    )


def save_candidates(path, candidates):
    records = sorted(candidates.values(), key=lambda item: item["name"].casefold())
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    return records


def main():
    args = parse_args()
    if args.pages < 1 or args.pages > 10:
        raise SystemExit("--pages must be between 1 and 10")
    if args.target < 1:
        raise SystemExit("--target must be positive")

    candidates = {}
    if args.output.is_file():
        for candidate in json.loads(args.output.read_text(encoding="utf-8")):
            candidates[candidate["linkedin_url"]] = candidate
        print(f"Resuming with {len(candidates)} existing candidates")

    driver = create_driver(args.visible)
    try:
        if driver.get_cookie("li_at") is None:
            driver.get("https://www.linkedin.com/feed/")
        WebDriverWait(driver, 30).until(
            lambda browser: browser.get_cookie("li_at") is not None
        )

        for query in DEFAULT_QUERIES:
            for page in range(1, args.pages + 1):
                try:
                    cards = collect_page(driver, query, page)
                except (
                    TimeoutError,
                    TimeoutException,
                    ReadTimeoutError,
                    WebDriverException,
                ) as error:
                    print(f"Skipped {query!r} page {page}: {error}")
                    try:
                        driver.execute_script("window.stop();")
                    except WebDriverException:
                        pass
                    continue

                for card in cards:
                    candidate = parse_card(card)
                    if candidate is None:
                        continue
                    existing = candidates.get(candidate["linkedin_url"])
                    if existing is None:
                        candidate["source_queries"] = [query]
                        candidates[candidate["linkedin_url"]] = candidate
                    elif query not in existing["source_queries"]:
                        existing["source_queries"].append(query)

                print(
                    f"{query!r} page {page}: "
                    f"{len(candidates)} unique Australian founder candidates"
                )
                save_candidates(args.output, candidates)
                if len(candidates) >= args.target:
                    break
                time.sleep(uniform(1.5, 3))
            if len(candidates) >= args.target:
                break
    finally:
        driver.quit()

    records = save_candidates(args.output, candidates)
    print(f"Saved {len(records)} candidates to {args.output}")
    return 0 if len(records) >= args.target else 1


if __name__ == "__main__":
    raise SystemExit(main())
