import ast
import json
import re
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "linkedin_processed.xlsx"
DISCOVERED = ROOT / "data" / "discovered_founders.json"
OUTPUT = ROOT / "client" / "public" / "founders.json"

COLUMN_MAP = {
    "current_city": "city",
    "current_job_start_date": "current_job_start",
    "is_founder": "is_current_founder",
    "startup_funding_stage": "curr_startup_funding_stage",
    "startup_url": "curr_startup_url",
    "startup_info": "curr_startup_info",
    "startup_industry": "curr_startup_industry",
    "ai_in_product_identity": "ai_in_curr_startup",
    "was_founder_before": "was_prev_founder",
    "founder_companies": "all_founded_companies",
    "accelerator_companies_in": "accelerators_worked_in",
    "was_in_big_tech": "was_in_bigtech",
    "big_tech_companies_in": "bigtechs_worked_in",
    "scaleup_companies_in": "scaleups_worked_in",
    "is_migrant": "migrant",
    "is_stealth_mode": "is_stealth",
}

FIELDS = {
    "name",
    "linkedin_url",
    "city",
    "current_company",
    "current_title",
    "current_job_start",
    "time_in_current_role",
    "is_current_founder",
    "curr_startup_funding_stage",
    "curr_startup_url",
    "curr_startup_info",
    "curr_startup_industry",
    "ai_in_curr_startup",
    "was_prev_founder",
    "all_founded_companies",
    "top_degree",
    "top_degree_label",
    "top_degree_end_date",
    "top_institution",
    "was_in_accelerator",
    "accelerators_worked_in",
    "was_in_scaleup",
    "scaleups_worked_in",
    "was_in_bigtech",
    "bigtechs_worked_in",
    "gender",
    "migrant",
    "is_stealth",
    "linkedin_follower_count",
    "founder_persona",
}

BOOL_FIELDS = {
    "is_current_founder",
    "ai_in_curr_startup",
    "was_prev_founder",
    "was_in_accelerator",
    "was_in_scaleup",
    "was_in_bigtech",
    "migrant",
    "is_stealth",
}

LIST_FIELDS = {
    "all_founded_companies",
    "accelerators_worked_in",
    "scaleups_worked_in",
    "bigtechs_worked_in",
}


def is_blank(value):
    return (
        value is None
        or pd.isna(value)
        or (
            isinstance(value, str)
            and value.strip().casefold() in {"", "nan", "none", "null", "n/a"}
        )
    )


def parse_bool(value):
    if isinstance(value, (int, float)):
        return int(value != 0)
    return int(str(value).strip().casefold() in {"true", "1", "1.0", "yes", "y"})


def parse_list(value):
    if is_blank(value):
        return []
    if isinstance(value, list):
        return value
    try:
        parsed = ast.literal_eval(str(value))
        return parsed if isinstance(parsed, list) else [parsed]
    except (SyntaxError, ValueError):
        return [item.strip() for item in str(value).split(",") if item.strip()]


def tags_for(profile):
    tags = []
    rules = (
        ("is_current_founder", "Current Founder"),
        ("was_prev_founder", "Previous Founder"),
        ("ai_in_curr_startup", "AI Product"),
        ("was_in_accelerator", "Accelerator Alumni"),
        ("was_in_scaleup", "Scaleup Alumni"),
        ("was_in_bigtech", "Worked in Big Tech"),
        ("migrant", "Migrant"),
        ("is_stealth", "Building in Stealth"),
    )
    for field, label in rules:
        if profile.get(field):
            tags.append(label)
    if profile.get("gender") == "Female" and profile.get("is_current_founder"):
        tags.append("Female Founder")
    if str(profile.get("current_title", "")).strip().casefold() == "unemployed":
        tags.append("Currently Unemployed")
    if profile.get("top_degree_label"):
        tags.append(profile["top_degree_label"])
    if profile.get("is_current_founder") and profile.get("ai_in_curr_startup"):
        tags.append("AI Founder")
    if (
        profile.get("is_current_founder")
        and profile.get("founder_persona") == "Technical"
    ):
        tags.append("Technical Founder")
    if profile.get("strict_hidden"):
        tags.extend(["Hidden Founder", "Strict Hidden"])
    if profile.get("emerging_founder"):
        tags.append("Emerging Founder")
    if profile.get("stealth_early_founder"):
        tags.append("Verified Stealth / Early")
    if profile.get("discovery_tier") == "Discovery Candidate":
        tags.append("Discovery Candidate")
    if profile.get("discovery_tier") == "Stealth Candidate":
        tags.extend(["Discovery Candidate", "Stealth Candidate"])
    if profile.get("ai_or_tech_signal"):
        tags.append("AI/Tech Candidate")
    return tags


def duration_months(value):
    if not value:
        return None
    years = re.search(r"(\d+)\s*years?", str(value), re.IGNORECASE)
    months = re.search(r"(\d+)\s*months?", str(value), re.IGNORECASE)
    if not years and not months:
        return None
    return (int(years.group(1)) * 12 if years else 0) + (
        int(months.group(1)) if months else 0
    )


def add_cohort_signals(profile):
    followers = profile.get("linkedin_follower_count")
    tenure = duration_months(profile.get("time_in_current_role"))
    ai_founder = bool(
        profile.get("is_current_founder") and profile.get("ai_in_curr_startup")
    )
    tech_founder = bool(
        profile.get("is_current_founder")
        and profile.get("founder_persona") == "Technical"
    )
    strict_hidden = (
        (ai_founder or tech_founder)
        and followers is not None
        and followers < 1000
        and tenure is not None
        and tenure <= 24
    )
    emerging_founder = (
        (ai_founder or tech_founder)
        and followers is not None
        and followers < 5000
        and tenure is not None
        and tenure <= 48
    )
    funding = str(profile.get("curr_startup_funding_stage", "")).casefold()
    stealth_early = bool(
        (ai_founder or tech_founder)
        and (
            profile.get("is_stealth")
            or "bootstrap" in funding
            or (tenure is not None and tenure <= 24)
        )
    )

    profile["hidden_founder"] = strict_hidden
    profile["strict_hidden"] = strict_hidden
    profile["emerging_founder"] = emerging_founder
    profile["stealth_early_founder"] = stealth_early
    if strict_hidden:
        profile["hidden_signals"] = [
            f"{followers:,} LinkedIn followers",
            f"{profile['time_in_current_role']} in current role",
            "AI founder" if ai_founder else "Technical founder",
        ]
    profile["cohorts"] = [
        label
        for condition, label in (
            (strict_hidden, "Strict Hidden"),
            (emerging_founder, "Emerging"),
            (stealth_early, "Stealth/Early"),
        )
        if condition
    ]


def normalize(field, value):
    if is_blank(value):
        return None
    if field in BOOL_FIELDS:
        return parse_bool(value)
    if field in LIST_FIELDS:
        return parse_list(value)
    if field == "linkedin_follower_count":
        try:
            return int(float(value))
        except (TypeError, ValueError):
            return None
    return str(value).strip()


def main():
    frame = pd.read_excel(SOURCE).rename(columns=COLUMN_MAP)
    profiles = []
    for _, row in frame.iterrows():
        profile = {
            field: normalize(field, row[field])
            for field in FIELDS
            if field in frame.columns and not is_blank(row[field])
        }
        if not profile.get("name") or not profile.get("linkedin_url"):
            continue
        profile["source_type"] = "Processed multi-source dataset"
        profile["id"] = len(profiles) + 1
        add_cohort_signals(profile)
        profile["tags"] = tags_for(profile)
        profiles.append(profile)

    existing_urls = {profile["linkedin_url"].rstrip("/") for profile in profiles}
    if DISCOVERED.is_file():
        discovered = json.loads(DISCOVERED.read_text(encoding="utf-8"))
        for candidate in discovered:
            url = str(candidate.get("linkedin_url", "")).rstrip("/")
            if not candidate.get("name") or not url or url in existing_urls:
                continue
            profile = dict(candidate)
            profile["linkedin_url"] = f"{url}/"
            profile["id"] = len(profiles) + 1
            profile["tags"] = tags_for(profile)
            profile["cohorts"] = [profile["discovery_tier"]]
            profiles.append(profile)
            existing_urls.add(url)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps(profiles, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    print(f"Exported {len(profiles)} founders to {OUTPUT}")


if __name__ == "__main__":
    main()
