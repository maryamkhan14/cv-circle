const { faker } = require("@faker-js/faker");
const { createId } = require("@paralleldrive/cuid2");
const uniqueId = Object.freeze({
  makeId: createId, // TODO: Add isValidId()
});
//TODO: Add constants for table names & rows
const FAKE_USER_ID = 1;
const FAKE_POST_ID = 1;
const FAKE_POST_CREATED_AT = faker.date.anytime();
const FAKE_POST_TITLE = faker.lorem.sentence();
const FAKE_POST_CONTENT = faker.lorem.paragraph(3);
const FAKE_IMAGE_EXTENSION = FAKE_USER_ID + "/" + uniqueId.makeId() + ".png";
const FAKE_UPVOTE_COUNT = 10;
const FAKE_IMAGE_CDN = process.env.DB_TEST_BASE_CDN_URL + FAKE_IMAGE_EXTENSION;
const FAKE_IMAGE_DATA =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAACWCAYAAADwkd5lAAAAAXNSR0IArs4c6QAADvpJREFUeF7tnb1rVE8XxycgkUAKjQFZO238BywEtVHB3kbBl8JCEUUQRAvxHQtBEUREQW3Uv0QtFSSNWqhN1sJoIULQJg9zn99db9ZN7svOyzkzn8Cim52XM59z7nznnHtXJ+bm5pb+/Pljpqamitfk5KThBwIQgAAEIDBMwGrF4uJi8bJaMTE/P780Oztrfvz4Ubzsz8zMTPFCTAggCEAAAnkTsKIxSh8WFhb+LyCbNm0aEPr169eg8fT09EBM8kbI6iEAAQjkRaAUDasJZVJhNaH86ff7/wpIFVHdAHnhZLUQgAAE0ibQJoGoFZAS1UopDCWutIOJ1UEAAukT6Lq/NxaQKsI2CpU+elYIAQhAQCeBcStMnQSEEpfOYMFqCEAAAi4TgK9fv65+D6Qp7q4pUNPxaQcBCEAAAt0I+NqfnQkIJa5ujqUXBCAAAV8Exi1R1dk1dgmrbgLfC6ibn88hAAEI5ETAZYmqjlshIP1+f6nX69W1HetzXynUWEbRGQIQgEACBGLtr94zkFG+CamQCcQGS4AABCAwkkDsCk8UAamSiA2AuIQABCCgiYCkA3h0ASkdFysF0xQ42AoBCORJQOr+KEZAqmEhSWHzDFdWDQEISCAgvUIjUkAocUkIXWyAAARiENB0gBYvIJS4YoQwc0IAAiEJSC1R1THw8kXCuknH/VyTQo+7VvpDAALpEpBeoqojr1JAKHHVuZXPIQABqQRSOgCrKWHVBYPWFLBuXXwOAQjoJ5Dq/pSMgFRDLCWF13/psAII5EtAe4mqznNJCgglrjq38zkEIOCLQE4H2OQFpAySVFNIXxcB40IAAs0J5Lq/ZCMglLiaXwy0hAAEmhFIvURVRyHYv8ZbZ0isz3MPgFjcmRcCWgnkVKKq81GWGcgoKLmmoHUBwucQgIAx7A+jowABGcGFEwZbBgQgYAlQoVg9DtR/kdB3mBNAvgkzPgRkEeAA2dwfCEhDVqSwDUHRDAIKCXB9d3MaJawO3DihdIBGFwgIJECFYTynICDj8aNGOiY/ukMgNAEOgO6IIyCOWJICOwLJMBDwQIDr0wNUYwwC4oErJxwPUBkSAh0IUKLqAK1FFwSkBawuTQngLtToA4HuBDjAdWfXticC0pZYx/ak0B3B0Q0CDQhwfTWA5KEJj/F6gFo3JCekOkJ8DoFmBMjwm3Hy1QoB8UW24bhcAA1B0QwC/xHgACYnFBAQIb4gBRfiCMwQSYDrQ6RbTCEg/X5/qdfrybQwQ6s4YWXodJY8kgAZuuzAIAOR7R++qCjcP5jnngAHKPdMfY2IgPgi63hcUnjHQBlOFAHiW5Q7GhvDY7yNUclpyAlNji+wZDwClKjG4xe7d/b/I2FsB4w7PxfguATpH5oAB6DQxP3NRwbij23QkSkBBMXNZC0JEJ8tgSlpjoAocVQbMznhtaFFW58EyJB90o0/NjfR4/vAqwVcwF7xMvgIAhxg8gkLBCQTX1NCyMTRkZZJfEUCH3laBCSyA2JMzwkxBvU05yTDTdOvTVeFgDQllWg7NoBEHetxWRxAPMJVNjQCosxhvsylBOGLbBrjEh9p+NH1KhAQ10QTGI8TZgJOdLQEMlRHIBMdhsd4E3Wsq2WxgbgiqWccDhB6fBXbUr6JHtsDSuanhKHEUR3NxL8dwWXejQwk8wDosnxOqF2oyexDhinTL1qsQkC0eEqonWxAQh2zilkcAPT5TKrF3ESX6hlldlECke0w/CPbP1qt438k1Oo5wXZzwpXjHDJEOb5I0RIykBS9KmhNbGDhnYGAh2ee64wISK6eD7xuSih+gcPXL19GH00AASEyghPghOwOORmeO5aM1J4AAtKeGT0cEmADbA8TAW7PjB5+CPAYrx+ujNqSACWY1YHBp2VA0TwIAQQkCGYmaUOAE/ZfWmRobSKHtqEJICChiTNfKwI5bqAIaKsQoXFEAghIRPhM3ZxA6iWc1NfX3NO01ESAm+iavIWtBYGUTug5ZliEcToEEJB0fJnlSjRuwCkJYJZBx6IHBBAQgiEJAtJLQNLtSyIIWERwAghIcORM6JuApBO+xgzJt38YPx0CCEg6vmQlIwjE2MAlCRhBAQGfBPjXeH3SZWwxBHyXkHyPLwYkhkCgQoDHeAmH7Ai4zBBiZDjZOYwFiyWAgIh1DYaFINBFAFwKUIg1MgcEfBFAQHyRZVxVBOpKUHWfq1osxkLAEYFCQPr9/lKv13M0JMNAQDeBaoaxdu3aYjG/f/82MzMzxWt6elr3ArEeAo4I8BSWI5AMkw4BBCQdX7ISvwQQEL98GV0JgboSVd3nSpaJmRBwSoB7IE5xMpg2AtxE1+Yx7JVEAAGR5A1sCULA5VNUXQQoyCKZBAIBCCAgASAzRXwCvktQvsePTxALIPAvAQSEqEiaQIwMwWWGk7RzWJx6AgiIeheygGECkjbwGAJGREAgFAEEJBRp5vFKQHoJSbp9Xp3D4MkSQECSdW0eC9N4wpeUIeURJazSFwEExBdZxvVGIKUNWKMAenMsA6sjgICoc1meBqdeAkp9fXlGbfqrRkDS97HqFeZ4Qk8pw1IdfBhfSwABqUVEg9AE2ED/Es9RQEPHG/N1J4CAdGdHT4cEKOGsDhM+DoONoZwRQECcoWSgLgQ4YbenRobWnhk9/BBAQPxwZdRVCLABugsPBNgdS0ZqTwABac+MHh0IUILpAK1FF/i2gEVTZwQQEGcoGWgUAU7I4eOCDC8881xnREBy9bzHdbOBeYTbcmgEvCUwmrcigIC0wkXjlQhQQpEdG/hHtn+0WoeAaPWcELs54QpxRAszyBBbwKLpqgQQEAKkNQE2oNbIxHbgACDWNSoMQ0BUuCm+kZRA4vvApwX41yfddMdGQNL1rZOVcUJ1glHVIGSYqtwV1VgEJCp+mZOzgcj0SwyrOEDEoK5nTgREj6+8WkoJwyte9YMTH+pd6GUBCIgXrHoG5YSpx1dSLCVDleKJ+HYgIPF9ENwCNoDgyJOdkANIsq5ttDAEpBEm/Y0oQej3oeQVEF+SvePPNgTEH1sRI3NCFOGGrIwgw83H3QhIgr7mAk7QqUqXxAFGqeMamo2ANAQlvRklBOkeyts+4jNN/yMgyv3KCU+5AzM0nww5HacjIAp9yQWo0GmYPJIAByDdgYGAKPEfJQAljsLMTgSI707YondCQKK7YHUDOKEJdxDmOSdAhu0cqbcBERBvaLsPzAXUnR090yLAAUq2PxEQIf4hhRfiCMwQSYDrQ6RbDAIS2S+csCI7gOnVESBDl+MyBCSCL7gAIkBnyiQJcACL61YEJBB/UvBAoJkmSwJcX3HcjoB45s4JyTNghofAEAEy/HAhgYB4YE0Ae4DKkBDoQIADXAdoLbogIC1grdaUFNoRSIaBgAcCXJ8eoBrDU1jjYuWEMy5B+kMgLAEqBO54k4F0YEkAdoBGFwgIJMABcDynICAN+ZECNwRFMwgoJMD13c1pCEgNN04o3QKLXhDQSoAKQ3PPISAjWBFAzQOIlhBImQAHyNW9i4D8x4cUNuVtgLVBYDwC7A+j+WUvIJwwxruw6A2B3AhQofjr8SwFhADI7ZJnvRDwQyD3A2g2AkIK6ucCYlQIQMCYXPeX5AUk9xMCFzcEIBCWQE4VjiQFJCcHhr00mA0CEGhDIPUDbDICkmsK2SaYaQsBCMQhkOr+pF5AUlf4OOHOrBCAgC8CKVVIVApISg7wFaSMCwEIyCeg/QCsRkBSTQHlhzgWQgACvglo3d/EC4h2hfYdeIwPAQikRUBThUWkgGgCmFboshoIQEASAekHaDECojWFkxRs2AIBCKRJQOr+GF1ApCtsmuHIqiAAAa0EJFVoogiIJABagwi7IQCBNAjcuHGjWMilS5cGC7K/u3z5cvH+1atXZseOHYPPXrx4YQ4fPly8f/jwodmzZ4+xe+rMzEzxmp6eXhHM4uKiOXv2rDly5MhgzPJ3jx49GvS7fv36wJ4PHz6YAwcOmHfv3pkTJ06Yu3fvmqmpqaJtMAGRmoKlEYKsAgIQ0Ejg9evXZufOnaa6YdvfWQGxQvH+/fvB3zds2GDsZn7mzBlz7969Yrnl3zdv3mzKao79fSkmk5OTAyxVoaiK0vfv383p06fN1atXzdatW5dhLPvs2rXL7N+/vxAf+/dDhw6FERBKVBrDGpshAAHfBOzmfOXKleJkb0WkzECqGclwxmBF5eXLl4MswLbdsmXLYEO3No+q8Hz79q3IIrZv326+fPlSzFVmNVaUrHjcv3/fWJGq/lQFy4qLFbdnz54N5veSgVCi8h16jA8BCGgnYMXA/nz69Kn4027q1RO/PeUPvx8ud5Xvz507V2QH9qcsMdnxnz59am7dumVslrFu3TrT6/XM8ePHlwnIsChUuVazISsuw++dCQglKu3hjP0QgEAoAnZDv3jxorl586Z58ODBPwJSvUdRzTKGMw4rElaAhsVn27Ztg/KWzRzK/dm2PX/+vLlw4YLZt2+fsSWu6j0Va4j9vf1dKRjVjGM4WxlbQChRhQo55oEABFIhYIVg9+7dRRlptZKVXW9TAbFtqze8nz9/vqy0ZT+3wnXw4EFz8uTJovRlb7jbLMXu42XmYuebn58v3r99+3ZZycqJgFCiSiWMWQcEIBCagN2Enzx5Yq5du1Y8zTRKQMob1U1LWMNPcJUCUD4tVa7RCogtjZX3QEYlALZveXN+YWFh2U38ziUsSlShw4z5IACBFAkMl4zKNZaPyN6+fXtwY3zUTfSyZDWcndj3doM/deqU2bhxozl69OjIDKQqIOXc1f398+fP5vHjx0Vp7efPn8tusLe+iU6JKsUQZk0QgIAUAsM3xrs8xmvvc1Szi9nZ2WX3QFbKQEbdtLeP9K5fv774rsmaNWvMnTt3zN69e5s/xkuJSkpoYQcEIJA6gXG+SFje5yjFw95TKctZNtOxN8DLG+LlPZDhDGT4i4TVLwvaBOLNmzfF90Q+fvxojh07Vjzu+88XCa1i1X0RJXVHsj4IQAACEPiXwEq3MOw9kom5ubkl28Cqin1Vv704MTFhlpaWBiMOvy8/aPr7pu1WcuJK/Yfbl+262t/Uzqbt6tbTdF0ENwQgAIGYBKxW2KzFvqxW/A+J2XhvsCMkDQAAAABJRU5ErkJggg==";

export {
  FAKE_USER_ID,
  FAKE_POST_ID,
  FAKE_POST_CREATED_AT,
  FAKE_POST_CONTENT,
  FAKE_POST_TITLE,
  FAKE_IMAGE_CDN,
  FAKE_IMAGE_DATA,
  FAKE_IMAGE_EXTENSION,
  FAKE_UPVOTE_COUNT,
};
