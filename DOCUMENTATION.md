# CV Circle: Documentation

## Backend

Here are some notes on the architecture of CV circle's backend. It's a work in progress! Diagrams are generated with mermaid.js.

### Post Creation Sequence Diagram

This is what occurs when a POST request is made to 'api/posts'. (Swagger documentation to be added here.)

#### Participant Abbreviations

| Full                    | Abbreviation | Additional Notes                                                                                                                                                                                      |
| ----------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| User                    | U            | ----                                                                                                                                                                                                  |
| Frontend                | F            | ----                                                                                                                                                                                                  |
| Posts                   | P            | The entry point to the posts component                                                                                                                                                                |
| makeExpressCallback     | MKE          | An adapter that provides an extra layer of indirection for dealing with req, res variables - passes on filtered req objects to controllers and constructs res objects from the controllers' responses |
| PostPost                | PP           | The controller for the POST endpoint at /api/posts/                                                                                                                                                   |
| handleAttachmentPreview | HAP          | Use case for handling process of generating preview from post attachment                                                                                                                              |
| createPost              | CP           | Use case for creating post                                                                                                                                                                            |
| imagesDb                | IDB          | Interface for queries against the Supabase bucket that stores the posts' attachments' images                                                                                                          |
| postsDb                 | PDB          | Interface for queries against the Supabase table that stores the posts                                                                                                                                |
| makePdfPreview          | MPP          | A custom service used by HAP to transform the first page of a PDF file into an image                                                                                                                  |

```mermaid
sequenceDiagram
    participant U
    participant F
    participant P
    participant MKE
    participant PP
    participant HAP
    participant CP
    participant IDB
    participant PDB
    participant MPP
    U->>+F: get post creation form
    alt User session authenticated
        F->>+U: post creation form
        U->>F: post details
        F->>+P: POST request w/post details
        P->>+MKE: request object
        MKE->>+PP: filtered request object
        PP->>+HAP: post attachment details

        break when Post does not contain valid attachment
            HAP->>HAP: throw exception
            MKE->>F: HTTP error response
            F->>U: error component
        end
        opt Attachment is a PDF
            HAP->>+MPP: attachment file
            MPP->>HAP: image of first page of PDF
        end
        HAP->>+IDB: image entity
        break when Saving attachment preview image unsuccessful
            IDB->>IDB: throw exception
            MKE->>F: HTTP error response
            F->>U: error component
        end
        IDB->>HAP: image CDN
        HAP->>PP: image entity
        PP->>+CP: post details with image CDN
        break when Post is missing a necessary detail (e.g. userId of author)
            CP->>CP: throw exception
            MKE->>F: HTTP error response
            F->>U: error component
        end
        CP->>+PDB: post entity
        break when Saving post unsuccessful
            PDB->>PDB: throw exception
            MKE->>F: HTTP error response
            F->>U: error component
        end
        PDB->>CP: database success response
        CP->>PP: DTO with new post details
        PP->>MKE: JSON object with headers, body
        MKE->>F: HTTP success response

    else User session not authenticated
        F->>+U: 404 error component
    end
```
