# CV Circle: Documentation
**NOTE: This documentation is outdated. Up-to-date information will be posted soon.**
## Backend

Here are some notes on the architecture of CV circle's backend. It's a work in progress! Diagrams are generated with mermaid.js. Swagger documentation to be added soon as well!

- [Posts component](#posts-component)
- [Users component](#users-component)
- [Supporting diagrams](#supporting-diagrams)

---

## Posts Component
  
Here you'll find all the documentation concerning the endpoints for the Posts component. Navigate between them here:
- [POST /api/posts](#post-apiposts)
- [GET /api/posts](#get-apiposts)
- [GET /api/posts/:id](#get-apipostsid)
- [PATCH /api/posts/:id](#patch-apipostsid)
- [Supporting diagrams](#supporting-diagrams-for-posts-component)

## Users Component

Here you'll find all the documentation concerning the endpoints for the Users component. Navigate between them here:
- [GET /api/auth/[provider]](#get-apiauthprovider)
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
        Note over PP, HAP: Handle Attachment Preview
        rect rgba(255,0,0,0.1)
        break Handle Attachment Preview threw exception
            PP->>+MKE: response w/error details
            MKE->>+F: HTTP error response
            F->>U: error component
        end
        end
        PP->>+CP: post details with image CDN

        rect rgba(255, 0, 0, 0.1)
        break When post is missing a necessary detail (e.g. userId of author)
            CP->>CP: throw exception
            PP->>MKE: response w/error details
            MKE->>F: HTTP error response
            F->>U: error component
        end
        end

        CP->>+PDB: post entity

        rect rgba(255, 0, 0, 0.1)
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
        MKE->>-F: HTTP success response
    else User session not authenticated
        F->>-U: 404 error component
        deactivate U
    end
```

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
    activate U
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
    deactivate U
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
    activate U
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
    deactivate U
```

---

### PATCH /api/posts/:id

When a PATCH request is made to '/api/posts/:id', the post with that ID is updated if all goes well.

#### Participant Abbreviations

| Full                | Abbreviation | Additional Notes                                                                                               |
| ------------------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| User                | U            | ----                                                                                                           |
| Frontend            | F            | ----                                                                                                           |
| makeExpressCallback | MKE          | An adapter that provides an extra layer of indirection for req, res variables between frontend and controllers |
| patchPost           | PP           | The controller for the PATCH endpoint at /api/posts/                                                           |
| updatePost          | UP           | The use case for updating a posts                                                                              |
| postsDb             | PDB          | Interface for queries against the Supabase table that stores the posts                                         |

```mermaid
sequenceDiagram
    activate U
    U->>+F: Clicks Update Post button
    alt User session is active:
        F->>U: post update form
        U->>F: post update details
        F->>+MKE: PATCH request
        MKE->>+PP: filtered request object

        rect rgba(0,0,255,0.1)
        opt Post update details contain new attachment
            Note over PP, HAP: Handle Attachment Preview
            rect rgba(255,0,0,0.1)
            break Handle Attachment Preview threw exception
                PP->>+MKE: response w/error details
                MKE->>+F: HTTP error response
                F->>U: error component
            end
            end
        end
        end

        PP->+UP: post details

        rect rgba(255,0,0,0.1)
        break Post update details missing critical detail
            UP->>UP: throw exception
            UP->>MKE: response w/error details
            MKE->>F: HTTP error response
            F->>U: error component
        end
        end

        UP->>+PDB: post entity

        rect rgba(255, 0, 0, 0.1)
        break When saving post unsuccessful
            PDB->>UP: error object
            UP->>UP: throw exception
            PP->>MKE: response w/error details
            MKE->>F: HTTP error response
            F->>U: error component
        end
        end

        PDB->>-UP: database success response
        UP->>-PP: JSON object containing new post's DTO
        PP->>-MKE: JSON object with headers, body
        MKE->>-F: HTTP success response
        F->>U: success component
    else User session is expired/invalid:
        F->>-U: error component
        deactivate U
    end
```

---

### GET /api/auth/[provider]

When a GET request is made to '/api/auth/[provider]', the login / signup process with that provider begins. Current providers are Github and Google.

#### Participant Abbreviations

| Full                        | Abbreviation | Additional Notes                                                               |
| --------------------------- | ------------ | ------------------------------------------------------------------------------ |
| User                        | U            | ----                                                                           |
| Browser                     | B            | ----                                                                           |
| Auth Controller             | AC           | Controller for the first GET endpoint reached in login/signup requests         |
| Auth Callback Controller    | ACB          | Controller for the GET endpoint at the redirect URI in OAuth apps              |
| Authenticator               | AUTH         | The authenticator middleware used - currently, Passport.js                     |
| OAuth Authorization Server  | O_AS         | The OAuth authorization server for the OAuth provider being used (e.g. Google) |
| OAuth API Provider endpoint | O_APE        | The OAuth provider's API endpoint, which serves profile data                   |
| Database                    | DB           | The application database, where users are stored                               |

##### Other notes

URI's are referenced in diagram as follows:
| URI | Abbreviation | Notes |
| :--- | :----------: | -------------: |
| /api/auth/[provider] | AC | Leads to the Auth Controller |
| /api/auth/[provider]/redirect | AR | The authorization redirect URL used in authentication strategies |
| /logged-in | SR | The success redirect URL |
| /login-failed | FR | The failure redirect URL |

```mermaid
sequenceDiagram
    activate U
    U->>+B: clicks login / signup
    B->>+AC: HTTP GET request to AC
    AC->>+AUTH: authorization request
    deactivate AC
    AUTH->>+O_AS: authorization request
    O_AS->>B: permission form

    alt Permission granted
    U->>B: permission & identifying credentials
    B->>O_AS: permission & identifying credentials
    O_AS->>B: HTTP redirect to AR
    B->>+ACB: authorization response
    ACB->>AUTH: authorization response
    AUTH->>O_AS: HTTP POST request w/authorization code
    O_AS->>AUTH: access token
    AUTH->>+O_APE: HTTP GET request w/access token
    O_APE->>-AUTH: user profile
    AUTH->>+DB: normalized user profile
    DB->>DB: upsert user profile

    alt Upserting user profile succeeds
        DB->>AUTH: success response
        AUTH->>AUTH: serialize user
        AUTH->>B: HTTP redirect to SR
        B->>U: success component
    else Upserting user profile fails
        DB->>-AUTH: error response
        AUTH->>AUTH: throw error
        AUTH->>B: HTTP redirect to FR
        B->>U: failure component
    end

    else Permission not granted
    U->>B: permission denial
    B->>O_AS: permission denial
    O_AS->>-B: HTTP redirect to AR
    B->>ACB: authorization response
    ACB->>-AUTH: authorization response
    AUTH->>-B: HTTP redirect to FR
    B->>-U: failure component
    deactivate U
    end
```

---

## Supporting Diagrams for Posts Component

These are diagrams that are referenced in two or more diagrams.

---
### Handle Attachment Preview
#### Participant Abbreviations

| Full                    | Abbreviation | Additional Notes                                                                                               |
| ----------------------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| Controller              | CTRL         | The controller at the endpoint                                                                                 |
| handleAttachmentPreview | HAP          | Use case for handling process of generating preview from post attachment                                       |
| imagesDb                | IDB          | Interface for queries against the Supabase bucket that stores the posts' attachments' images                   |
| makePdfPreview          | MPP          | A custom service used by HAP to transform the first page of a PDF file into an image                           |

```mermaid
sequenceDiagram
    activate CTRL
    CTRL->>+HAP: post attachment details
    alt Post contains valid attachment
        rect rgba(0, 0, 255, 0.1)
        opt Attachment is a PDF
            HAP->>+MPP: attachment file
            MPP->>-HAP: image of first page of PDF
        end
        end

        HAP->>+IDB: image entity

        rect rgba(255, 0, 0, 0.1)
        break When saving attachment preview image unsuccessful
            IDB->>HAP: error object
            HAP->>HAP: throw exception
        end
        end

    IDB->>-HAP: image CDN
    HAP->>CTRL: image entity
    else Post does not contain valid attachment
        HAP->>-HAP: throw exception
    end
```
