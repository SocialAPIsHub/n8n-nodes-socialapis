# n8n-nodes-socialapis

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

This is an n8n community node. It gets public **Facebook and Instagram** data from [SocialAPIs](https://socialapis.io/): pages, posts, comments, groups, the Meta Ads Library, Marketplace, Instagram profiles, posts, reels and locations. No Meta developer app or OAuth needed. It covers all 50 SocialAPIs endpoints.

The node can also be used as a tool by n8n AI Agents.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## How to install

### Community Nodes

For n8n version 0.187 and later, you can install this node through the Community Nodes panel:

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-socialapis` in **Enter npm package name**
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes
5. Select **Install**

## Credentials

You need a SocialAPIs API token. The free plan includes 200 credits a month, no card needed.

1. Sign up at [socialapis.io](https://socialapis.io/) and copy your token from the [dashboard](https://socialapis.io/dashboard).
2. In n8n, add a **SocialAPIs** node, then under **Credential to connect with** select **Create New Credential**.
3. Paste the token into **API Token** and save. n8n tests it against the `/usage` endpoint, which costs no credits.

The token is sent in the `x-api-token` header.

## Supported resources and operations

| Resource | Operations |
| --- | --- |
| **Facebook Page** | Get Page Details, Get Page ID, Get Page Posts, Get Page Reels, Get Page Videos |
| **Facebook Group** | Get Group Details, Get Group ID, Get Group Posts, Get Group Videos |
| **Facebook Post** | Get Comment Replies, Get Post Attachments, Get Post Comments, Get Post Details, Get Post Details (Extended), Get Post ID, Get Video Details |
| **Facebook Search** | Search Locations, Search Pages, Search People, Search Posts, Search Videos |
| **Meta Ads Library** | Get Ad Details, Get Page Ad Details, Get Supported Countries, Search Ads, Search by Keyword |
| **Facebook Marketplace** | Find City Coordinates, Get Categories, Get Listing Details, Get Seller Details, Search Listings, Search Rentals, Search Vehicles |
| **Facebook Media** | Download Media |
| **Instagram Profile** | Get Highlight Details, Get Profile Details, Get Profile Highlights, Get Profile Posts, Get Profile Reels, Get User ID |
| **Instagram Post** | Get Post Details, Get Post Shortcode |
| **Instagram Reel** | Get Reels by Audio, Get Reels Feed |
| **Instagram Search** | Search |
| **Instagram Location** | Get Location Posts, Get Nearby Locations |
| **Account** | Get Usage, Get Limits, Get Top-Ups (free, no credits) |

Most operations cost 1 credit per call. See [socialapis.io/pricing](https://socialapis.io/pricing).

## Compatibility

Tested with n8n 1.x. Requires an n8n version that supports community nodes (0.187 or later).

## Usage examples

The examples below show how to wire the node into a workflow. Each example assumes you have already created a **SocialAPIs API** credential as described above.

### Example 1 — Fetch the latest posts from a Facebook Page

Get the three most recent posts from the Nike Facebook Page, including reactions, media, and comment counts.

1. Add a **Manual Trigger** node.
2. Add a **SocialAPIs** node and connect it after the trigger.
3. Configure the SocialAPIs node:
   - **Credential**: select your SocialAPIs credential
   - **Resource**: `Facebook Page`
   - **Operation**: `Get Page Posts`
   - **Page URL**: `https://www.facebook.com/nike`
4. (Optional) Open **Additional Fields** and set:
   - **Timezone**: `America/New_York`
   - **After Time**: `2026-01-01T00:00:00Z`
5. Execute the workflow. The node returns an array of posts. To page through more posts, copy `end_cursor` from the response into **Additional Fields → End Cursor** and run again, or feed it back in a loop using an **IF** + **Set** node.

Equivalent node JSON (paste into n8n via *Import from clipboard*):

```json
{
  "parameters": {
    "resource": "facebookPage",
    "operation": "getPagePosts",
    "link": "https://www.facebook.com/nike",
    "additionalFields": {
      "timezone": "America/New_York"
    }
  },
  "name": "SocialAPIs",
  "type": "n8n-nodes-socialapis.socialApis",
  "typeVersion": 1,
  "credentials": {
    "socialApisApi": {
      "name": "SocialAPIs account"
    }
  }
}
```

### Example 2 — Search the Meta Ads Library by keyword

Find active ads in the US that mention "running shoes", sorted by most recent.

1. Add a **SocialAPIs** node to your workflow.
2. Configure it:
   - **Resource**: `Meta Ads Library`
   - **Operation**: `Search Ads`
3. Open **Additional Fields** and set:
   - **Query**: `running shoes`
   - **Country**: `US`
   - **Active Status**: `Active`
   - **Sort Data**: `Most Recent`
4. Execute the workflow. The node returns up to 10 ads per call along with an `end_cursor` you can use for pagination.

Equivalent node JSON:

```json
{
  "parameters": {
    "resource": "metaAds",
    "operation": "searchAds",
    "additionalFields": {
      "query": "running shoes",
      "country": "US",
      "activeStatus": "Active",
      "sort_data": "recent"
    }
  },
  "name": "SocialAPIs",
  "type": "n8n-nodes-socialapis.socialApis",
  "typeVersion": 1,
  "credentials": {
    "socialApisApi": {
      "name": "SocialAPIs account"
    }
  }
}
```

### Example 3 — Resolve a Page URL to a Page ID, then drill into its ads

Two-step workflow: take a Facebook page link, resolve it to a numeric Page ID, then pull the page's ad-library record.

1. **Manual Trigger** → **SocialAPIs (Get Page ID)**
   - **Resource**: `Facebook Page`
   - **Operation**: `Get Page ID`
   - **Page URL**: `https://www.facebook.com/nike`
2. **SocialAPIs (Get Page Ad Details)** connected after step 1
   - **Resource**: `Meta Ads Library`
   - **Operation**: `Get Page Ad Details`
   - **Page ID**: `={{ $json.page_id }}` (an n8n expression that reads the ID from the previous node's output)
3. Execute. The first node returns the Page ID, and the second uses that ID to fetch the page's Meta Ads Library profile.

### Tips

- All "list" operations (page posts, reels, ads search, search pages, etc.) are cursor-paginated. Use the returned `end_cursor` value in **Additional Fields → End Cursor** to fetch the next page.
- Use the **Search Locations** operation under *Facebook Search* to find a `location_uid` you can then pass into **Search Pages**, **Search People** or **Search Posts** to scope results geographically.
- See the full list of endpoints, parameters and response shapes in the [SocialAPIs documentation](https://docs.socialapis.io/).

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [SocialAPIs Documentation](https://docs.socialapis.io/)
* [Sign up for a SocialAPIs account](https://socialapis.io/)
