# n8n-nodes-socialapis

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

This is an n8n community node. It lets you access public social media data with [SocialAPIs](https://socialapis.io/)

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

To use this node, you will need to authenticate with the SocialAPIs API.

1. Sign up for a [SocialAPIs account](https://socialapis.io/)
2. Copy API Token
3. Create new credential in n8n
   - Use the SocialAPIs node
   - Under Credential to connect with, click Create New Credential
   - Paste API Token

## Supported resources and operations

| Resource | Operations |
| --- | --- |
| **Facebook Page** | Get Page ID, Get Page Details, Get Page Posts, Get Page Reels |
| **Facebook Post** | Get Post Details, Get Post Comments, Get Post Reactions |
| **Facebook Group** | Get Group Details, Get Group Posts |
| **Facebook Media** | Get Media Details |
| **Facebook Search** | Search Pages, Search People, Search Posts, Search Videos, Search Locations |
| **Meta Ads Library** | Search Ads, Search by Keyword, Get Ad Details, Get Page Ad Details, Get Supported Countries |
| **Facebook Marketplace** | Browse listings, item details, categories, locations |

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
