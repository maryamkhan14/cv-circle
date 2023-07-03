# CV Circle: Documentation

## Backend

Here are some notes on the architecture of CV circle's backend. It's a work in progress! Diagrams are generated with mermaid.js. Swagger documentation to be added soon as well!

- Posts component
  - [GET /api/posts](#get-apiposts)
  - [GET /api/posts/:id](#get-apipostsid)
  - [POST /api/posts](#post-apiposts)
- Users component
- [GET /api/auth/github]()

---

### GET /api/posts/:id

When a GET request is made to 'api/posts/:id', a single post is returned if all goes well.

#### Participant Abbreviations

| Full                | Abbreviation | Additional Notes                                                                                               |
| ------------------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| User                | U            | ----                                                                                                           |
| Frontend            | F            | ----                                                                                                           |
| makeExpressCallback | MKE          | An adapter that provides an extra layer of indirection for req, res variables between frontend and controllers |
| getSinglePost       | GSP          | The controller for the GET endpoint at /api/posts/:id                                                          |
| retrieveSinglePost  | RSP          | The use case for retrieving a single post                                                                      |
| postsDb             | PDB          | Interface for queries against the Supabase table that stores the posts                                         |

```mermaid
sequenceDiagram
    U->>+F: clicks on a post
    F->>+MKE: GET request
    MKE->>+GSP: filtered request object
    GSP->>+RSP: calls
    RSP->>+PDB: query for the corresponding post

    rect rgba(255, 0, 0, 0.2)
        break When database query fails
            PDB->>RSP: error object
            RSP->>RSP: throw exception
            GSP->>MKE: response w/error details
            MKE->>F: HTTP error response
            F->>U: error component
        end
    end

    PDB->>-RSP: complete JSON post record
    RSP->>-GSP: JSON DTO of the post
    GSP->>-MKE: JSON object with headers, body
    MKE->>-F: HTTP success response
    F->>-U: Single Post component
```

---

### GET /api/posts

When a GET request is made to '/api/posts', a list of posts is returned if all goes well.

#### Participant Abbreviations

| Full                | Abbreviation | Additional Notes                                                                                               |
| ------------------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| User                | U            | ----                                                                                                           |
| Frontend            | F            | ----                                                                                                           |
| makeExpressCallback | MKE          | An adapter that provides an extra layer of indirection for req, res variables between frontend and controllers |
| getAllPosts         | GAP          | The controller for the GET endpoint at /api/posts/                                                             |
| retrievePosts       | RP           | The use case for retrieving all posts                                                                          |
| postsDb             | PDB          | Interface for queries against the Supabase table that stores the posts                                         |

```mermaid
sequenceDiagram
    U->>+F: views All Posts component
    F->>+MKE: GET request
    MKE->>+GAP: filtered request object
    GAP->>+RP: calls
    RP->>+PDB: query for all posts stored in table

    rect rgba(255, 0, 0, 0.2)
        break When database query fails
            PDB->>RP: error object
            RP->>RP: throw exception
            GAP->>MKE: response w/error details
            MKE->>F: HTTP error response
            F->>U: error component
        end
    end

    PDB->>-RP: array of complete JSON post records
    RP->>-GAP: array of JSON DTO's of each post
    GAP->>-MKE: JSON object with headers, body
    MKE->>-F: HTTP success response
    F->>-U: updated All Posts component
```

---

### POST /api/posts

When a POST request is made to '/api/posts', a new post is created if all goes well.

#### Participant Abbreviations

| Full                    | Abbreviation | Additional Notes                                                                                               |
| ----------------------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| User                    | U            | ----                                                                                                           |
| Frontend                | F            | ----                                                                                                           |
| makeExpressCallback     | MKE          | An adapter that provides an extra layer of indirection for req, res variables between frontend and controllers |
| PostPost                | PP           | The controller for the POST endpoint at /api/posts/                                                            |
| handleAttachmentPreview | HAP          | Use case for handling process of generating preview from post attachment                                       |
| createPost              | CP           | Use case for creating post                                                                                     |
| imagesDb                | IDB          | Interface for queries against the Supabase bucket that stores the posts' attachments' images                   |
| postsDb                 | PDB          | Interface for queries against the Supabase table that stores the posts                                         |
| makePdfPreview          | MPP          | A custom service used by HAP to transform the first page of a PDF file into an image                           |

```mermaid
sequenceDiagram
    activate U
    U->>+F: get post creation form
    alt User session authenticated
        F->>U: post creation form
        U->>F: post details
        F->>+MKE: request object
        MKE->>+PP: filtered request object
        PP->>+HAP: post attachment details

        rect rgba(255, 0, 0, 0.2)
        break When post does not contain valid attachment
            HAP->>HAP: throw exception
            PP->>MKE: response w/error details
            MKE->>F: HTTP error response
            F->>U: error component
        end
        end

        rect rgba(191, 223, 255, 0.5)
        opt Attachment is a PDF
            HAP->>+MPP: attachment file
            MPP->>-HAP: image of first page of PDF
        end
        end

        HAP->>+IDB: image entity

        rect rgba(255, 0, 0, 0.2)
        break When saving attachment preview image unsuccessful
            IDB->>HAP: error object
            HAP->>HAP: throw exception
            PP->>MKE: response w/error details
            MKE->>F: HTTP error response
            F->>U: error component
        end
        end

        IDB->>HAP: image CDN
        deactivate IDB
        HAP->>PP: image entity
        deactivate HAP
        PP->>+CP: post details with image CDN

        rect rgba(255, 0, 0, 0.2)
        break When post is missing a necessary detail (e.g. userId of author)
            CP->>CP: throw exception
            PP->>MKE: response w/error details
            MKE->>F: HTTP error response
            F->>U: error component
        end
        end

        CP->>+PDB: post entity

        rect rgba(255, 0, 0, 0.2)
        break When saving post unsuccessful
            PDB->>CP: error object
            CP->>CP: throw exception
            PP->>MKE: response w/error details
            MKE->>F: HTTP error response
            F->>U: error component
        end
        end

        PDB->>CP: database success response
        deactivate PDB
        CP->>PP: JSON object containing new post's DTO
        deactivate CP
        PP->>-MKE: JSON object with headers, body
        MKE->>F: HTTP success response
        deactivate MKE
    else User session not authenticated
        F->>-U: 404 error component

    end
```

---

### GET /api/auth/github

When a GET request is made to '/api/auth/github', the login / signup process with Github begins.

#### Participant Abbreviations

| Full     | Abbreviation | Additional Notes |
| -------- | ------------ | ---------------- |
| User     | U            | ----             |
| Frontend | F            | ----             |

```
mermaid
sequenceDiagram
    activate U
    U->>+F: Clicks Login/Signup button
```
