# CV Circle: Documentation

## Backend

Here are some notes on the architecture of CV circle's backend. It's a work in progress! Diagrams are generated with mermaid.js.

### Post Creation Sequence Diagram

This is what occurs when a POST request is made to 'api/posts'. (Swagger documentation to be added here.)

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant Backend
    participant Posts (Component)
    participant makeExpressCallback (Adapter)
    participant postPost (Controller)
    participant makePdfPreview (Service)
    participant createPost (Use Case)
    participant handleAttachmentPreview (Use Case)
    participant imagesDb (Bucket Interface)
    participant postsDb (Database Interface)
    User->>+Frontend: get post creation form
    alt User session authenticated
        Frontend->>+User: post creation form
        User->>Frontend: post details
        Frontend->>+Backend: GET request w/post details
        Backend->>+makeExpressCallback (Adapter): request object
        makeExpressCallback (Adapter)->>+postPost (Controller): filtered request object
        postPost (Controller)->>+handleAttachmentPreview (Use Case): post attachment details

        break when Post does not contain valid attachment
            handleAttachmentPreview (Use Case)->>handleAttachmentPreview (Use Case): throw exception
            makeExpressCallback (Adapter)->>Frontend: HTTP error response
            Frontend->>User: error component
        end
        opt Attachment is a PDF
            handleAttachmentPreview (Use Case)->>+makePdfPreview (Service): attachment file
            makePdfPreview (Service)->>handleAttachmentPreview (Use Case): image of first page of PDF
        end
        handleAttachmentPreview (Use Case)->>+imagesDb (Bucket Interface): image entity
        break when Saving attachment preview image unsuccessful
            imagesDb (Bucket Interface)->>imagesDb (Bucket Interface): throw exception
            makeExpressCallback (Adapter)->>Frontend: HTTP error response
            Frontend->>User: error component
        end
        imagesDb (Bucket Interface)->>handleAttachmentPreview (Use Case): image CDN
        handleAttachmentPreview (Use Case)->>postPost (Controller): image entity
        postPost (Controller)->>+createPost (Use Case): post details with image CDN
        break when Post is missing a necessary detail (e.g. userId of author)
            createPost (Use Case)->>createPost (Use Case): throw exception
            makeExpressCallback (Adapter)->>Frontend: HTTP error response
            Frontend->>User: error component
        end
        createPost (Use Case)->>+postsDb (Database Interface): post entity
        break when Saving post unsuccessful
            postsDb (Database Interface)->>postsDb (Database Interface): throw exception
            makeExpressCallback (Adapter)->>Frontend: HTTP error response
            Frontend->>User: error component
        end
        postsDb (Database Interface)->>createPost (Use Case): database success response
        createPost (Use Case)->>postPost (Controller): DTO with new post details
        postPost (Controller)->>makeExpressCallback (Adapter): JSON response object with headers, status code, body
        makeExpressCallback (Adapter)->>Frontend: HTTP success response

    else User session not authenticated
        Frontend->>+User: 404 error component
    end
```
