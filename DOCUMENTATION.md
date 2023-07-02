# CV Circle: Documentation

## Backend

Here are some notes on the architecture of CV circle's backend. It's a work in progress! Diagrams are generated with mermaid.js.

- [POST /api/posts](#post-creation-sequence-diagram)

---

### POST /api/posts

When a POST request is made to 'api/posts', a new post is created if all goes well. (Swagger documentation to be added here.)

#### Participant Abbreviations

| Full                    | Abbreviation | Additional Notes                                                                                                                                                                                      |
| ----------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| User                    | U            | ----                                                                                                                                                                                                  |
| Frontend                | F            | ----                                                                                                                                                                                                  |
| makeExpressCallback     | MKE          | An adapter that provides an extra layer of indirection for dealing with req, res variables - passes on filtered req objects to controllers and constructs res objects from the controllers' responses |
| PostPost                | PP           | The controller for the POST endpoint at /api/posts/                                                                                                                                                   |
| handleAttachmentPreview | HAP          | Use case for handling process of generating preview from post attachment                                                                                                                              |
| createPost              | CP           | Use case for creating post                                                                                                                                                                            |
| imagesDb                | IDB          | Interface for queries against the Supabase bucket that stores the posts' attachments' images                                                                                                          |
| postsDb                 | PDB          | Interface for queries against the Supabase table that stores the posts                                                                                                                                |
| makePdfPreview          | MPP          | A custom service used by HAP to transform the first page of a PDF file into an image                                                                                                                  |

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
        break when Post does not contain valid attachment
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
        break when Saving attachment preview image unsuccessful
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
        break when Post is missing a necessary detail (e.g. userId of author)
            CP->>CP: throw exception
            PP->>MKE: response w/error details
            MKE->>F: HTTP error response
            F->>U: error component
        end
        end

        CP->>+PDB: post entity

        rect rgba(255, 0, 0, 0.2)
        break when Saving post unsuccessful
            PDB->>CP: error object
            CP->>CP: throw exception
            PP->>MKE: response w/error details
            MKE->>F: HTTP error response
            F->>U: error component
        end
        end

        PDB->>CP: database success response
        deactivate PDB
        CP->>PP: DTO with new post details
        deactivate CP
        PP->>-MKE: JSON object with headers, body
        MKE->>F: HTTP success response
        deactivate MKE
    else User session not authenticated
        F->>-U: 404 error component

    end
```
