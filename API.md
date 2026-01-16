# MyStory API Documentation

## Base URL

```
http://localhost:8080
```

## Stories

### List Stories

```
GET /stories
```

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `offset` | number | 0 | Number of items to skip |
| `limit` | number | 10 | Number of items to return |
| `category` | string | - | Filter by category: `FINANCIAL`, `TECHNOLOGY`, `HEALTH` |
| `status` | string | - | Filter by status: `DRAFT`, `PUBLISHED` |
| `search` | string | - | Search in title and authorName (case-insensitive) |

**Response:**

```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "category": "TECHNOLOGY",
      "keywords": ["string"],
      "status": "DRAFT",
      "coverUrl": "string | null",
      "synopsis": "string",
      "authorName": "string",
      "createdAt": "2026-01-16T00:00:00.000Z",
      "updatedAt": "2026-01-16T00:00:00.000Z",
      "chapters": []
    }
  ],
  "pagination": {
    "offset": 0,
    "limit": 10,
    "total": 100
  }
}
```

### Get Story by ID

```
GET /stories/:id
```

**Response:** Single story object with chapters included.

### Create Story

```
POST /stories
```

**Request Body:**

```json
{
  "title": "string (required)",
  "category": "FINANCIAL | TECHNOLOGY | HEALTH (required)",
  "synopsis": "string (required)",
  "authorName": "string (required)",
  "keywords": ["string"],
  "coverUrl": "string",
  "chapters": [
    {
      "title": "string",
      "content": "string"
    }
  ]
}
```

**Response:** `201 Created` with created story object.

### Update Story

```
PUT /stories/:id
```

**Request Body (all fields optional):**

```json
{
  "title": "string",
  "category": "FINANCIAL | TECHNOLOGY | HEALTH",
  "synopsis": "string",
  "keywords": ["string"],
  "status": "DRAFT | PUBLISHED",
  "coverUrl": "string"
}
```

**Response:** Updated story object.

### Delete Story

```
DELETE /stories/:id
```

**Response:** `204 No Content`

---

## Chapters

### List Chapters

```
GET /chapters
```

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `offset` | number | 0 | Number of items to skip |
| `limit` | number | 10 | Number of items to return |

**Response:** Paginated list of chapters with parent story included.

### Get Chapters by Story

```
GET /stories/:storyId/chapters
```

**Query Parameters:** Same as List Chapters.

**Response:** Paginated list of chapters belonging to the story.

### Get Chapter by ID

```
GET /chapters/:id
```

**Response:** Single chapter object with parent story included.

### Create Chapter

```
POST /stories/:storyId/chapters
```

**Request Body:**

```json
{
  "title": "string (required)",
  "content": "string (required)",
  "storyId": "string (required)"
}
```

**Response:** `201 Created` with created chapter object.

### Update Chapter

```
PUT /chapters/:id
```

**Request Body (all fields optional):**

```json
{
  "title": "string",
  "content": "string"
}
```

**Response:** Updated chapter object.

### Delete Chapter

```
DELETE /chapters/:id
```

**Response:** `204 No Content`

---

## Covers (Image Upload)

### Upload Cover Image

```
POST /covers
```

**Content-Type:** `multipart/form-data`

**Form Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `cover` | file | Image file (jpg, jpeg, png, webp, gif). Max 5MB. |

**Response:** `201 Created`

```json
{
  "coverUrl": "https://your-r2-url.com/covers/uuid.jpg",
  "key": "covers/uuid.jpg"
}
```

### Get Cover (Signed URL)

```
GET /covers/:key
```

**Response:**

```json
{
  "url": "https://signed-url-valid-for-1-hour..."
}
```

### Delete Cover

```
DELETE /covers/:key
```

**Response:** `204 No Content`

---

## Enums

### Category

- `FINANCIAL`
- `TECHNOLOGY`
- `HEALTH`

### Status

- `DRAFT`
- `PUBLISHED`

---

## Error Responses

```json
{
  "error": "Error message"
}
```

| Status Code | Description |
|-------------|-------------|
| `400` | Bad Request - Invalid input |
| `404` | Not Found - Resource doesn't exist |
| `409` | Conflict - Duplicate entry |
| `500` | Internal Server Error |
